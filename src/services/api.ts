import axios, { AxiosResponse } from "axios";
import { getTokenPayload } from "../helpers/auth";
import { IEmployee, IResponseFromToken, ITokenData, ITokenResponse } from "../models/types";

export const signin = (email:string, password: string): Promise<IResponseFromToken> => {
    return axios.post('http://localhost:3001/signin', {email, password})
        .then((res: AxiosResponse<ITokenResponse>) => {
            return handleTokenResponse(res.data.test_token);
        })
}

export const register = (name:string, email:string, password: string, role:string): Promise<IResponseFromToken> => {
    return axios.post('http://localhost:3001/register', {name, email, password, role})
        .then((res: AxiosResponse<ITokenResponse>) => {
            return handleTokenResponse(res.data.test_token);
        })
}

const handleTokenResponse = (token: string): IResponseFromToken => {
    localStorage.setItem('test_token', token);
    const {name, email, role} = getTokenPayload() as ITokenData;
    return { name, email, role }
}

export const getEmployees = (): Promise<IEmployee[]> => {
    return axios.get('http://localhost:3001/employees', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('test_token')
        },
    })
    .then((res: AxiosResponse<IEmployee[]>) => {
        return res.data;
    })
}

