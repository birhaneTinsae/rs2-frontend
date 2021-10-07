export interface Page {
    totalElements: number;
    number: number;
    size: number;
    totalPages: number;
}
export interface User {
    id?: number;
    email: string;
    username: string;
    password: string;
    fullName: string;
    enabled: boolean;
    active: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}

export interface UserResponse {
    "_embedded": {
        userResponseDtoes: User[];
    }

    page: Page;
}