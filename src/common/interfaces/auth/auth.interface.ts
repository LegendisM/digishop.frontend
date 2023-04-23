import { IUser } from "../user/user.interface";

export interface IAuthUser {
    auth: boolean;
    user?: IUser;
    onEvent(type: 'SIGNIN' | 'SIGNOUT'): void;
}