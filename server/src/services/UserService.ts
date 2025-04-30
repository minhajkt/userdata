import { IUser } from "../interface/user";
import { IUserService } from "./IUserService";
import axios from 'axios'

export class UserService implements IUserService {
    async getUsers(page: number, limit: number) {
        try {
            const response = await axios(
            //   "https://jsonplaceholder.typicode.com/users"
            'https://jsonplaceholder.org/users'
            );

            const totalCount = response.data.length

            const startIndex = (page - 1 ) * limit
            const endIndex = page * limit

            const users = response.data.map((user: IUser) => ({
              id: user.id,
              name: user.firstname + ' ' + user.lastname,
              // name: user.name,
              email: user.email,
              phone: user.phone,
            }));

            const paginatedUsers = users.slice(startIndex, endIndex)

            const totalPages = Math.ceil(totalCount / limit)

            return {
                users: paginatedUsers,
                totalPages,
                totalCount
            }
        } catch (error) {
            throw new Error(`Failed to fetch the users list ${(error as Error).message}`)
        }
    }
}