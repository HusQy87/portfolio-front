import Project from "@/models/Project";

export interface Response {
    code: number
}
export type ErrorResponse = Response & {
    error: string
}
export function instanceOfProject(object:any): object is Project{
    return 'description' in object
}

export enum Codes {
    VALID = 200,
    NOTFOUND = 404
}
