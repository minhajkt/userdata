import axios from "axios"
import { IUser } from "../interface/IUser"

export const getUsersList = async(page: number, searchQuery: string): Promise<{users: IUser[]; totalPages: number;totalCount: number}> => {
    try {
        const response = await axios.get(`http://localhost:5000/user?page=${page}&limit=12&searchQuery=${searchQuery}`)
        const {users, totalPages, totalCount} = response.data
        // console.log('res', totalCount)
        return { users, totalPages, totalCount };
    } catch (error) {
        console.log('An error occured while fetching users', (error as Error).message)
        throw new Error('Failed to fetch userList')
    }
}