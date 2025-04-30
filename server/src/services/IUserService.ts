export interface IUserService {
    getUsers(page: number, limit: number):Promise<[]> 
}