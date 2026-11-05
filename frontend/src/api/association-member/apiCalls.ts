import { fetchPayloadlessData } from "../helper-functions";
import type { Gender } from "../student/apiCalls";

const ASSOCIATION_API_STATS_ENDPOINT = '/api/association/stats/';

export const associationMemberEndpoints = {
    me : 'me',
    presenceStats : 'presence',
    visitStats : 'visits',
    animatorStats : 'animators',
    qcmStats : 'qcms',
    classes : 'classes'
}


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
    level : {id : number, label : string}| null
}

export type PresenceStatsResponse = {
    presenceStatsPerScolarYear : PresenceStatsPerScolarYear[]
}

export type PresenceStatsPerScolarYear = {
    scolarYear : {id : number, label : string},
    classes : ClassPresenceStats[],
}

export type ClassPresenceStats = {
    class : {id : number, label : string},
    students : StudentPresenceStats[]
}

export type StudentPresenceStats = {
    id : number,
    firstName : string,
    lastName : string,
    gender : 'm' | 'f',
    presence : number,
    absence : number,
}

export type ConsultedBilan = {
  id:            number
  date:          Date            // date of the séance
  lessonLabel:   string | null
  subjectLabel:  string | null
  firstViewedAt: Date | null     // null = never opened
  lastViewedAt:  Date | null
  viewCount:     number
  delayHours:    number | null   // time between the bilan being written and its first opening
}

export type StudentConsultationStats = {
  id: number; firstName: string; lastName: string; gender: Gender
  bilansReceived:   number            // bilans of séances the student attended
  bilansRead:       number
  totalReadings:    number            // sum of openings (one per 30-minute reading)
  firstVisit:       Date | null
  lastVisit:        Date | null       // last time any bilan was opened
  latestBilanDate:  Date | null
  latestBilanRead:  boolean | null    // null = no bilan
  medianDelayHours: number | null     // typical time before a bilan is opened
  bilans:           ConsultedBilan[]  // most recent first
}

export type ClassConsultationStats  = { class: { id: number; label: string }; students: StudentConsultationStats[] }
export type ConsultationStatsPerScolarYear = { scolarYear: { id: number; label: string }; classes: ClassConsultationStats[] }
export type ConsultationStatsResponse      = { visitStatsPerScolarYear: ConsultationStatsPerScolarYear[] }

export type AnimatorStatsResponse = { animatorStatsPerScolarYear: AnimatorStatsPerScolarYear[] }
export type AnimatorStatsPerScolarYear = { scolarYear: { id: number; label: string }; animators: AnimatorStats[]}
export type AnimatorStats = { animator : {id: number; firstName: string;  lastName: string; gender : 'm' | 'f', specializations : {id : number, label : string}[]},classes: AnimatorClassStats[], totalSeances : number, totalBilans : number, totalQcms : number};
export type AnimatorClassStats = { class : {id : number, label : string}, seances : SeanceStats[], seancesCount : number; bilansSubmitted : number}
export type SeanceStats = {
  id: number; duration: string; date: Date
  students: {
    firstName: string; lastName: string; gender: 'm' | 'f'; presence: boolean
    firstViewedAt: Date | null; lastViewedAt: Date | null; viewCount: number
  }[]
}

export type QcmStatsResponse = { qcmStatsPerScolarYear: QcmStatsPerScolarYear[] }
export type QcmStatsPerScolarYear = { scolarYear: { id: number; label: string }; classes: ClassQcmStats[]}
export type ClassQcmStats = { class : {id: number; label: string}, students: StudentQcmStats[]};
export type StudentQcmStats = {id: number; firstName: string;  lastName: string; gender : 'm' | 'f', qcmCompletedCount : number, totalQcms : number, qcmCompletedTotalPoints : number};

export const associationMemberApiCalls = {
    fetchClasses : fetchPayloadlessData<ClassesResponse>(associationMemberEndpoints.classes, ASSOCIATION_API_STATS_ENDPOINT),
    fetchPresenceStats : fetchPayloadlessData<PresenceStatsResponse>(associationMemberEndpoints.presenceStats, ASSOCIATION_API_STATS_ENDPOINT),
    fetchVisitStats : fetchPayloadlessData<ConsultationStatsResponse>(associationMemberEndpoints.visitStats, ASSOCIATION_API_STATS_ENDPOINT),
    fetchAnimatorStats : fetchPayloadlessData<AnimatorStatsResponse>(associationMemberEndpoints.animatorStats, ASSOCIATION_API_STATS_ENDPOINT),
    fetchQcmStats : fetchPayloadlessData<QcmStatsResponse>(associationMemberEndpoints.qcmStats, ASSOCIATION_API_STATS_ENDPOINT),
}
