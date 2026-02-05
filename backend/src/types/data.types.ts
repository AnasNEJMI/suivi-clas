export type User = {
    id  : number,
    username : string,
    firstName : string,
    lastName : string,
    gender : 'm' | 'f',
    class : {label : string} | null,
    createdAt : Date,
    role : 'admin' | 'org' | 'student',
}