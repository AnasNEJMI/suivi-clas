// src/controllers/association/visitStats.controller.ts
import { Request, Response, NextFunction } from 'express'
import { prisma }                          from '../../db/prisma.js'
import { ApiError } from '../../classes/ApiError.class.js';
import { Gender } from '../../generated/prisma/enums.js';
import { sendSuccess } from '../../utils/response.utils.js';

export type AnimatorStatsResponse = { animatorStatsPerScolarYear: AnimatorStatsPerScolarYear[] }
export type AnimatorStatsPerScolarYear = { scolarYear: { id: number; label: string }; animators: AnimatorStats[]}
export type AnimatorStats = { animator : {id: number; firstName: string;  lastName: string; gender : Gender},classes: AnimatorClassStats[], totalSeances : number, totalBilans : number};
export type AnimatorClassStats = { class : {id : number, label : string}, seances : SeanceStats[], seancesCount : number; bilansSubmitted : number}
export type SeanceStats = {id : number, duration : string, date : Date}


export async function associationAnimatorStatsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const associationId = req.user!.association?.id
    if (!associationId) throw ApiError.unauthorized('Aucune association liée à ce compte.')
    
    const contracts = await prisma.animatorContract.findMany({
      where : {class : {associationId}},
      select : {
        scolarYear : {select : {id : true, label : true}},
        animator : {select : {id : true, firstName : true, lastName : true, gender : true}},
        class : {select : {id : true, label : true}},
      }
    });

    if(!contracts || contracts.length === 0){
      sendSuccess(res, {scolarYears : []})
    }
    const yearIds = new Set(contracts.map(c => c.scolarYear?.id).filter(id => id !== null && id !== undefined));
    const animatorIds = new Set(contracts.map(c => c.animator?.id).filter(id => id !== null && id !== undefined));

    //1-
    const seances = await prisma.seance.findMany({
      where : {
        scolarYearId : {in : [...yearIds]},
        animatorId : {in : [...animatorIds]},
      },
      select : {
        id : true,
        scolarYear : {select : {id : true, label : true}},
        animator : {select : {id : true, firstName : true, lastName : true, gender : true}},
        class : {select : {id : true, label : true}},
        date : true,
        _count : {select : {bilans : true}}
      },
      // orderBy : {
      //   scolarYear : {id : 'asc'} ,
      //   animator : {id : 'asc'},
      //   date : 'desc',
      // }
    })

    
    type ScolarYearBucket = {
      scolarYear: { id: number; label: string }
      animators: Map<number, {
        totalSeances : number, totalBilans : number,
        animator:    { id: number; firstName: string, lastName : string, gender : Gender}
        classes: Map<number, {class : {id : number, label : string}, seances : {id: number, duration : string, date : Date}[], seancesCount: number; bilansSubmitted: number }>
      }>
    }
    
    const scolarYearMap = new Map<number, ScolarYearBucket>();
    
    for(const seance of seances){
      const scolarYear = seance.scolarYear;
      if(!scolarYear) continue;
      
      if(!scolarYearMap.get(scolarYear.id)){
        scolarYearMap.set(scolarYear.id,{scolarYear,animators : new Map()})
      }
      const scolarYearBucket = scolarYearMap.get(scolarYear.id)!;
      
      const animator = seance.animator; 
      if(!animator) continue;
      
      if(!scolarYearBucket.animators.get(animator.id)){
        scolarYearBucket.animators.set(animator.id,
          {
            totalBilans : 0,
            totalSeances : 0,
            animator : {id: animator.id, firstName: animator.firstName, lastName : animator.lastName, gender : animator.gender}, 
            classes : new Map()
          }
        )
      }
      const animatorBucket = scolarYearBucket.animators.get(animator.id)!;

      const clas = seance.class;
      if(!clas) continue;
      if(!animatorBucket.classes.get(clas.id)){
        animatorBucket.classes.set(clas.id, {
          class : {id : clas.id, label : clas.label},
          seances : [],
          seancesCount : 0,
          bilansSubmitted : 0
        })
      }

      const classBucket = animatorBucket.classes.get(clas.id)!;
      classBucket.seances.push({id : seance.id, date : seance.date, duration : 'todo'});
      classBucket.bilansSubmitted+= seance._count.bilans;
      classBucket.seancesCount++;
      animatorBucket.totalBilans+= seance._count.bilans;
      animatorBucket.totalSeances++;
    }

    //2- we need to run through the contracts next and add entries for contracts for which no seances are registered
    for(const contract of contracts){
      const scolarYear = contract.scolarYear;
      if(!scolarYear) continue;
      if(!scolarYearMap.get(scolarYear.id)){
         scolarYearMap.set(scolarYear.id, {scolarYear, animators : new Map()})
      }
      const yearBucket = scolarYearMap.get(scolarYear.id)!;
      
      const animator = contract.animator;
      if(!animator) continue;

      if(!yearBucket.animators.get(animator.id)){
        yearBucket.animators.set(animator.id, {
          totalBilans : 0,
          totalSeances : 0,
          animator,
          classes : new Map()
        });
      }

      const animatorBucket = yearBucket.animators.get(animator.id)!;
      
      const clas = contract.class;
      if(!clas) continue;
      if(!animatorBucket.classes.get(clas.id)){
        animatorBucket.classes.set(clas.id, {
          class : clas,
          seances : [],
          seancesCount : 0,
          bilansSubmitted : 0
        });
      }
    }
    
    const animatorStatsPerScolarYear : AnimatorStatsPerScolarYear[] =[];
    for(const YearBucket of scolarYearMap.values()){
      const animators : AnimatorStats[] = [];
      for(const animatorBucket of YearBucket.animators.values()){
        const classes = Array.from(animatorBucket.classes.values());
        animators.push({
          totalBilans : animatorBucket.totalBilans,
          totalSeances : animatorBucket.totalSeances,
          animator : animatorBucket.animator,
          classes
        })
      }
      animatorStatsPerScolarYear.push({
        scolarYear : YearBucket.scolarYear,
        animators
      })
    }
    
    //maybe sort this data before submission
    return sendSuccess(res, { animatorStatsPerScolarYear } satisfies AnimatorStatsResponse)
  } catch (error) {
    next(error)
  }
}