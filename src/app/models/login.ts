export interface Login {
    username: string;
    password: string;
}

export interface LoginResponse {
    displayName: string;
    token: string;
    userId: string;
}