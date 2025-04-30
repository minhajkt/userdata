import { IUser } from "../interface/user";

export interface IUserService {
    getUsers(page: number, limit: number, searchQuery: string):Promise<{users:IUser[]; totalPages: number; totalCount: number}> 
}