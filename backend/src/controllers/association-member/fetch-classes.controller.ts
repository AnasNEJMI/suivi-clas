import { Request, Response, NextFunction } from 'express'
import { prisma } from '../../db/prisma.js'
import { ApiError } from '../../classes/ApiError.class.js';
import { Gender } from '../../generated/prisma/enums.js';
import { sendSuccess } from '../../utils/response.utils.js';

export type ClassesResponse = {
    classesPerScolarYear : ClassesPerScolarYear[],
}

export type ClassesPerScolarYear = {
    scolarYear : {id : number, label : string},
    classes : ClassInfoEntry[],
}

export type ClassInfoEntry = {
    class : {id : number, label : string},
    students : StudentInfoEntry[]
}

export type StudentInfoEntry = {
    id : number,
    firstName : string,
    lastName : string,
    gender : 'm' | 'f',
    level : {id : number, label : string} | null
}

export async function associationMemberFetchClassessHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const associationId = req.user!.association?.id
    if (!associationId) throw ApiError.unauthorized('Aucune association liée à ce compte.')
    
    const contracts = await prisma.animatorContract.findMany({
      where : {class : {associationId}},
      select : {
        scolarYear : {select : {id : true, label : true}},
        class : {select : {
            id : true, label : true,
            students : {select : {id : true, firstName : true, lastName : true, gender : true, level : {select : {id : true, label : true}}}}
        }},
      }
    });

    if(!contracts || contracts.length === 0){
      sendSuccess(res, {classesPerScolarYear : []})
    }
    const yearIds = new Set(contracts.map(c => c.scolarYear?.id).filter(id => id !== null && id !== undefined));
    const classIds = new Set(contracts.map(c => c.class?.id).filter(id => id !== null && id !== undefined));

    
    type ScolarYearBucket = {
      scolarYear: { id: number; label: string }
      classes: ClassInfoEntry[]
    }
    
    const scolarYearMap = new Map<number, ScolarYearBucket>();
    
    for(const contract of contracts){
      const scolarYear = contract.scolarYear;
      if(!scolarYear) continue;
      
      if(!scolarYearMap.get(scolarYear.id)){
        scolarYearMap.set(scolarYear.id,{scolarYear,classes : []})
      }
      const scolarYearBucket = scolarYearMap.get(scolarYear.id)!;
      
      const clas = contract.class; 
      if(!clas) continue;
      if(!scolarYearBucket.classes.find(c => c.class.id === clas.id)){
          scolarYearBucket.classes.push({class : {id : clas.id, label : clas.label},students : clas.students})
      }
    }
    
    const classesPerScolarYear : ClassesPerScolarYear[] =[];
    for(const YearBucket of scolarYearMap.values()){
      classesPerScolarYear.push({
        scolarYear : YearBucket.scolarYear,
        classes : YearBucket.classes
      })
    }
    
    //maybe sort this data before submission
    return sendSuccess(res, { classesPerScolarYear } satisfies ClassesResponse)
  } catch (error) {
    next(error)
  }
}