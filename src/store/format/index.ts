import { IUser } from "./types/userType";

export interface AppState {
    userState: UserState
}

export interface UserState {
    currentUser: IUser
}
