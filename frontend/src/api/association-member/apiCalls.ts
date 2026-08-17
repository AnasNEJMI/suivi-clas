import { fetchPayloadlessData } from "../helper-functions";

const ASSOCIATION_MEMBER_API_ENDPOINT = '/api/association-member/';

export const associationMemberEndpoints = {
    me : 'me',
    presenceStats : 'presence-stats',
    visitStats : 'visit-stats',
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


export const associationMemberApiCalls = {
    fetchPresenceStats : fetchPayloadlessData<PresenceStatsResponse>(associationMemberEndpoints.presenceStats, ASSOCIATION_MEMBER_API_ENDPOINT),
    fetchVisitStats : fetchPayloadlessData<VisitStatsResponse>(associationMemberEndpoints.visitStats, ASSOCIATION_MEMBER_API_ENDPOINT),
}
