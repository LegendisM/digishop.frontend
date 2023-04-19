export interface IProfileFetchResponseDto {
    state: boolean;
    username: string;
    email: string;
    nationalcode: string;
    avatar: string;
}

export interface IProfileUpdateResponseDto {
    state: boolean;
    message: string;
}