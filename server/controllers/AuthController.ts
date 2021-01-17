import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../data/entity/User";
import config from "../config/config";
import { logger } from "../config/winston";
import { response } from '../data/responseApi';

class AuthController {
    static login = async (req: Request, res: Response) => {

        // Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).json({ code: response[400].code, message: response[400].message });
        }

        // Get user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
        } catch (error) {
            return res.status(401).json({ code: response[401].code, message: response[401].message, error: error.mesage });
        }

        // Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).json({ code: response[401].code, message: response[401].message });
        }

        // Sing JWT, valid for 90 minute
        const token = jwt.sign(
            { userId: user.id, username: user.username, type: user.type },
            config.jwt.secret,
            { expiresIn: config.jwt.expire }
        );

        const auth = {
            "username": username,
            "token": token
        };
      
        // Send the jwt in the response
        res.json({ code: response[200].code, message: response[200].message, data: auth });
    };

    static changePassword = async (req: Request, res: Response) => {
        // Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        // Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            return res.status(400).send();
        }

        // Get user from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            logger.error(error.mesage);
            return res.status(401).send();
        } 

        // Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            return res.status(401).send();
        }

        // Validate de model (password length)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }

        // Hash the new passowrd and save
        user.hashPassword();
        userRepository.save(user);

        res.status(204).send();
    };
}

export default AuthController;