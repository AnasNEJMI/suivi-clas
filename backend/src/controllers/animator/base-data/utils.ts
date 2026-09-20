import { Gender } from "../../../generated/prisma/enums.js";
import { fetchLessonsByLevelAndSpec, LessonsByLevelEntry } from "../controller.utils.js";
import { SeanceDurationEntry } from "../seances/utils.js";

export type StudentEntry = {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  gender: Gender,
  level: { id: number; label: string; order: number }
}

export type ClassEntry = {
  id: number,
  label: string,
  contractId: number,
  association: { id: number; label: string }
  students: StudentEntry[]
}

export type ScolarYearEntry = {
  id: number
  label: string
  classes: ClassEntry[]
}

export type AnimatorBaseDataResponse = {
  scolarYears:     ScolarYearEntry[]
  lessonsByLevel:  LessonsByLevelEntry[]
  seanceDurations : SeanceDurationEntry[]
}

type Contract = {
    id: number;
    class: {
        label: string;
        id: number;
        association: {
            label: string;
            id: number;
        } | null;
        students: {
            level: {
                label: string;
                id: number;
                order: number;
            } | null;
            id: number;
            firstName: string;
            lastName: string;
            username: string;
            gender: Gender;
        }[];
    } | null;
    scolarYear: {
        label: string;
        id: number;
    } | null;
    contractSpecializations: {
        subjectId: number;
    }[];
}
export async function buildAnimatorBaseData(contracts : Contract[]) : Promise<{scolarYears: ScolarYearEntry[], lessonsByLevel:  LessonsByLevelEntry[]}>{
    const scolarYearMap = new Map<number, ScolarYearEntry>();
    const levelIdSet = new Set<number>();
    const specializationSubjectIds = new Set<number>();

    for (const contract of contracts) {
      if (!contract.class || !contract.scolarYear || !contract.class.association) continue

      for (const spec of contract.contractSpecializations) {
        specializationSubjectIds.add(spec.subjectId)
      }

      for (const student of contract.class.students) {
        if (student.level) levelIdSet.add(student.level.id)
      }

      if (!scolarYearMap.has(contract.scolarYear.id)) {
        scolarYearMap.set(contract.scolarYear.id, {
          id:      contract.scolarYear.id,
          label:   contract.scolarYear.label,
          classes: []
        })
      }

      const validStudents = contract.class.students.filter(s => s.level !== null);
      scolarYearMap.get(contract.scolarYear.id)!.classes.push({
        id:          contract.class.id,
        label:       contract.class.label,
        contractId:  contract.id,
        association: contract.class.association,
        students:    validStudents.map(s => ({
          id:        s.id,
          username:  s.username,
          firstName: s.firstName,
          lastName:  s.lastName,
          gender:    s.gender,
          level:     s.level!
        }))
      })
    }

    console.log('spec', specializationSubjectIds)
    const lessonsByLevel = await fetchLessonsByLevelAndSpec(levelIdSet, specializationSubjectIds)

    return {scolarYears : [...scolarYearMap.values()], lessonsByLevel}
}