import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../format';
import { IUser } from '../format/types/userType';
import userManagementService from "../../services/hopiha.service";
import { getUserInfoFromCookies, setTokenToCookies, setUserInfoToCookies } from '../../services/util';
import { GET_USER_SUCCESS } from '../constants/user';

export interface GetUserProfileSuccessAction extends Action<typeof GET_USER_SUCCESS> {
    user: IUser;
    username: string;
}

export type UserActionTypes =
  | GetUserProfileSuccessAction;

type ThunkResult<R> = ThunkAction<R, AppState, undefined, UserActionTypes>;

export function getUserProfileSuccess(user: IUser, username: string): GetUserProfileSuccessAction {
  return {
    type: GET_USER_SUCCESS,
    user,
    username
  };
}

export function doLogin(
    username: string,
    password: string,
    callback: (
      err?: boolean | null,
      data?: {
        message: string;
        token: string;
        expirationTime: string;
        user: IUser; // Store User Format
      },
    ) => void,
  ): ThunkResult<void> {
    return async function (dispatch: (arg0: any) => void) {
      try {
        const result = await userManagementService.login(username, password);
        dispatch(getUserProfileSuccess(result.user, result.token));
        setUserInfoToCookies({ expiredTime: result.expirationTime, user: result.user });
        setTokenToCookies(result.token, new Date(result.expirationTime));
        callback(null, result);
      } catch (err: any) {
        const error = err.response?.data || err;
        callback(error);
      }
    };
}

export function updateUserInfo(): ThunkResult<void>{
  return async function (dispatch: (arg0: any) => void) {
    const currentUser = await getUserInfoFromCookies();
    if (currentUser) dispatch(getUserProfileSuccess(currentUser.user, currentUser?.user.username));
  }
}
