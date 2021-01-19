// STATES

export interface IState {
    user: IUserState;
    employees: IEmployeesState;
}

export interface IUserState {
    name: string;
    email: string;
    role: string;
    request: IAsyncRequest;
}

export interface IEmployeesState {
    employeesList: IEmployee[];
    request: IAsyncRequest;
}

// SIGNIN

export interface ISigninRequest {
    email: string;
    password: string;
}

export interface ISigninResponse extends IResponseFromToken {}

// REGISTER

export interface IRegisterRequest extends ISigninRequest {
    name: string;
    role: string;
} 

export interface IRegisterResponse extends IResponseFromToken {}

// EMPLOYEE

export interface IEmployee {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
}

export interface IAddress {
    street: string;
    suite: string;
    city: string;
}

// HELPERS

export interface IAsyncRequest {
    error: string;
    loading: boolean;
}

export interface IResponseError {
    errorMessage: string;
}

// TOKEN

export interface ITokenResponse {
    test_token: string;
}

export interface IResponseFromToken {
    name: string;
    email: string;
    role: string;
}

export interface ITokenData {
    name: string;
    email: string;
    role: string;
    exp: number;
    iat: number;
}
