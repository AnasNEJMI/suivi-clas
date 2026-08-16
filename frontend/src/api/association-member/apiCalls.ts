import { fetchPayloadlessData } from "../helper-functions";

const ASSOCIATION_MEMBER_API_ENDPOINT = '/api/association-member/';

export const associationMemberEndpoints = {
    me : 'me',
    presenceStats : 'presence-stats'
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


export const associationMemberApiCalls = {
    fetchPresenceStats : fetchPayloadlessData<PresenceStatsResponse>(associationMemberEndpoints.presenceStats, ASSOCIATION_MEMBER_API_ENDPOINT),
}
