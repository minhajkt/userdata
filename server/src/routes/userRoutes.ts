import { Router } from "express";
import { createDependencies } from "../container/container";

export function setupRoutes() {
    const router = Router()

    const {userController} = createDependencies()

    router.get('/', userController.getUsers.bind(userController))

    return router;
}