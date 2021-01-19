import jwt from 'jwt-decode';
import { ITokenData } from '../models/types';

export const isAuthenticated = (): boolean => {
    const token: string | null = localStorage.getItem('test_token'); 
    if (token) {
        const data: ITokenData = jwt(token as string);
        if(data.exp * 1000 <= Date.now() ) {
            localStorage.removeItem('test_token');
            return false;
        } else {
            return true;
        }
        
    } else {
        return false;
    }
}

export const getTokenPayload = () : ITokenData | null => {
    const token: string | null = localStorage.getItem('test_token'); 
    if (token) {
        return jwt(token as string);
    }
    return null;  
}