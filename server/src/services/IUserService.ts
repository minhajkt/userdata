export interface IUserService {
    getUsers(page: number, limit: number):Promise<{users:[]; totalPages: number; totalCount: number}> 
}