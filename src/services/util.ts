import Cookies from 'js-cookie';
import { IUser } from "../store/format/types/userType";
import moment from 'dayjs';

export function setUserInfoToCookies(data: { expiredTime: string; user: IUser }): string | undefined {
    return Cookies.set('userInfo', JSON.stringify(data), { expires: new Date(data.expiredTime), secure: true });
}

export function setTokenToCookies(token: string, expiredTime: Date): string | undefined {
  return Cookies.set('token', {accessToken: token}, {expires: expiredTime, secure: true });
}

export function getTokenFromCookies(): string{
  const data = JSON.parse(Cookies.get('token') || '');
  return Object.keys(data).length ? data : undefined;
}

export function getUserInfoFromCookies(): { expiredTime: string; user: IUser } | undefined {
    const data = JSON.parse(Cookies.get('userInfo') || '{}');
    return Object.keys(data).length ? data : undefined;
}

export function checkUserInfo(): boolean {
    const userInfo = getUserInfoFromCookies();
    if (!userInfo) {
      return false;
    }
  
    const { expiredTime } = userInfo;
    const isTokenValid = moment().isBefore(moment(expiredTime));
    if (!isTokenValid) {
      eraseCookies();
      return false;
    }
  
    return true;
}

export function eraseCookies(): void {
    Cookies.remove('token');
    return Cookies.remove('userInfo');
}
