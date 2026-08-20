import { fetchPayloadlessData } from "../helper-functions";

const ASSOCIATION_MEMBER_API_ENDPOINT = '/api/association-member/';

export const associationMemberEndpoints = {
    me : 'me',
    presenceStats : 'presence-stats',
    visitStats : 'visit-stats',
    animatorStats : 'animator-stats',
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

export const associationMemberApiCalls = {
    fetchPresenceStats : fetchPayloadlessData<PresenceStatsResponse>(associationMemberEndpoints.presenceStats, ASSOCIATION_MEMBER_API_ENDPOINT),
    fetchVisitStats : fetchPayloadlessData<VisitStatsResponse>(associationMemberEndpoints.visitStats, ASSOCIATION_MEMBER_API_ENDPOINT),
    fetchAnimatorStats : fetchPayloadlessData<AnimatorStatsResponse>(associationMemberEndpoints.animatorStats, ASSOCIATION_MEMBER_API_ENDPOINT),
}
