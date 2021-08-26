export interface Response {
    code: number
}
export type ErrorResponse = Response & {
    error: string
}

export enum Codes {
    VALID = 200,
    NOTFOUND = 404
}
