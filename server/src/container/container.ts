import { UserController } from "../controllers/userController";
import { UserService } from "../services/UserService";

export function createDependencies() {
    const userService = new UserService()
    const userController = new UserController(userService)

    return {userController}
}