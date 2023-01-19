import { Response } from '../models/response.model.js'

export const StatusResponse = (status, message, data) => {
    let res = new Response(status, message, data)
    if(!data) res = new Response(status, message)
    return res
}