import axios from "axios"
import { IUser } from "../interface/IUser"

export const getUsersList = async(): Promise<IUser[]> => {
    try {
        const response = await axios.get(`http://localhost:5000/user?page=1&limit=12`)
        console.log('res', response.data)
        return response.data
    } catch (error) {
        console.log('An error occured while fetching users', (error as Error).message)
        throw new Error('Failed to fetch userList')
    }
}