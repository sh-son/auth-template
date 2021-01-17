import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../data/entity/User";

export const checkRole = (roles: Array<String>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        
        // Get the user ID from previous middleware
        const id: number = res.locals.jwtPayload.userId;

        // Get user role from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }

        // Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.type) > -1) next();
        else res.status(401).send();
    };
};