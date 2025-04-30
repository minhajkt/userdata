import {Request, Response} from 'express'
import { IUserService } from '../services/IUserService'



export class UserController {
    private userService: IUserService
    constructor(userService : IUserService) {
        this.userService = userService
    }

    async getUsers(req: Request, res: Response):Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 5

            const users = await this.userService.getUsers(page, limit)

            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({message:"An unexpected error occured while fetching", error: (error as Error).message})   
        }
    }

    
}