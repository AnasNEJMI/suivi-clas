import { fetchPayloadlessData } from "../helper-functions";

const ASSOCIATION_API_STATS_ENDPOINT = '/api/association/stats/';

export const associationMemberEndpoints = {
    me : 'me',
    presenceStats : 'presence',
    visitStats : 'visits',
    animatorStats : 'animators',
    qcmStats : 'qcms',
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

export type VisitStatsResponse = { visitStatsPerScolarYear: VisitStatsPerScolarYear[] }
export type VisitStatsPerScolarYear = { scolarYear: { id: number; label: string }; classes: ClassVisitStats[]}
export type ClassVisitStats = { class : {id: number; label: string},students: StudentVisitStats[] }
export type StudentVisitStats = { id: number; firstName: string; lastName: string; gender: 'm' | 'f'; numVisits: number; lastVisit: Date | null }

export type AnimatorStatsResponse = { animatorStatsPerScolarYear: AnimatorStatsPerScolarYear[] }
export type AnimatorStatsPerScolarYear = { scolarYear: { id: number; label: string }; animators: AnimatorStats[]}
export type AnimatorStats = { animator : {id: number; firstName: string;  lastName: string; gender : 'm' | 'f'},classes: AnimatorClassStats[], totalSeances : number, totalBilans : number};
export type AnimatorClassStats = { class : {id : number, label : string}, seances : SeanceStats[], seancesCount : number; bilansSubmitted : number}
export type SeanceStats = {id : number, duration : string, date : Date}

export type QcmStatsResponse = { qcmStatsPerScolarYear: QcmStatsPerScolarYear[] }
export type QcmStatsPerScolarYear = { scolarYear: { id: number; label: string }; classes: ClassQcmStats[]}
export type ClassQcmStats = { class : {id: number; label: string}, students: StudentQcmStats[]};
export type StudentQcmStats = {id: number; firstName: string;  lastName: string; gender : 'm' | 'f', qcmCompletedCount : number, totalQcms : number, qcmCompletedTotalPoints : number};

export const associationMemberApiCalls = {
    fetchPresenceStats : fetchPayloadlessData<PresenceStatsResponse>(associationMemberEndpoints.presenceStats, ASSOCIATION_API_STATS_ENDPOINT),
    fetchVisitStats : fetchPayloadlessData<VisitStatsResponse>(associationMemberEndpoints.visitStats, ASSOCIATION_API_STATS_ENDPOINT),
    fetchAnimatorStats : fetchPayloadlessData<AnimatorStatsResponse>(associationMemberEndpoints.animatorStats, ASSOCIATION_API_STATS_ENDPOINT),
    fetchQcmStats : fetchPayloadlessData<QcmStatsResponse>(associationMemberEndpoints.qcmStats, ASSOCIATION_API_STATS_ENDPOINT),
}
