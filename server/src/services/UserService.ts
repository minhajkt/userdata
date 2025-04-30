import { IUser } from "../interface/user";
import { IUserService } from "./IUserService";
import axios from "axios";

export class UserService implements IUserService {
  async getUsers(page: number, limit: number, searchQuery: string) {
    try {
      const response = await axios("https://jsonplaceholder.org/users");
      const allUsers: IUser[] = response.data;

      const lowerSearch = searchQuery.toLowerCase();
      const filteredUsers = allUsers.filter(
        (user: IUser) =>
          user.firstname.toLowerCase().includes(lowerSearch) ||
          user.lastname.toLowerCase().includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch) ||
          user.phone.toLowerCase().includes(lowerSearch)
      );

      const totalCount = filteredUsers.length;
      const totalPages = Math.ceil(totalCount / limit);
      const startIndex = (page - 1) * limit;
      const paginatedUsers = filteredUsers.slice(
        startIndex,
        startIndex + limit
      );

      return {
        users: paginatedUsers,
        totalPages,
        totalCount,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch the users list: ${(error as Error).message}`
      );
    }
  }
}
