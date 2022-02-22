/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";
import https from 'https';
import { eraseCookies } from "./util";
import { IUser } from "../store/format/types/userType";
const UNAUTHORIZED_CODE = 401;

/**
 * Initialization needs to be done before calling any method,
 * @param target
 * @param propertyKey
 * @param descriptor
 */
function wrapInit(target: UserManagementApi, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;
    const newMethod = async (...args: any[]): Promise<any> => {
      await target.init();
      return originalMethod(...args);
    };
    descriptor.value = newMethod.bind(target);
}

class UserManagementApi {
    protected static endpoint: AxiosInstance;
    public async init(): Promise<void> {
        if (UserManagementApi.endpoint !== undefined) {
            return;
        }

        // At request level
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });

        const apiURL = "http://localhost:4000"

        UserManagementApi.endpoint = axios.create({
            baseURL: apiURL,
            httpsAgent,
        });

        UserManagementApi.endpoint.interceptors.response.use(
            (response) => response,
            (error) => {
            console.log(error);
            if (!error.response) return Promise.reject(error);
            const { status } = error.response;
            if (status === UNAUTHORIZED_CODE) {
                eraseCookies();
            }
          return Promise.reject(error);
        },
      );
    }

    @wrapInit
    public async login(
        username: string,
        password: string
    ):Promise<{ token: string, expirationTime: string, user: IUser, message: string }>{
        const body = { username, password };
        const { data } = await UserManagementApi.endpoint.post('/login', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return data;
    }
}

export default new UserManagementApi();
