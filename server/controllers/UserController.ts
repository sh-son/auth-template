import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator"; 

import { User } from "../data/entity/User";

class UserController {

    static listAll = async (req: Request, res: Response) => {
        // Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["id", "username", "type"] // We dont want to send the passowrd on response
        });

        // Send the users object
        res.send(users);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.userId;

        // Get the user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id, {
                select: ["id", "username", "type"] // We dont want to send the password on response
            });
        } catch (error) {
            return res.status(404).send("User not fount");
        }

        res.send(user);
    };

    static add = async (req: Request, res: Response) => {
        // Get parameters from the body
        let { username, password, type } = req.body;
        let user = new User();
        user.username = username;
        user.password = password;
        user.type = type;

        // Validate if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }

        // Hash the password, to securely store on DB
        user.hashPassword();

        // Try to save. If fails, the username is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            return res.status(409).send("username already in use");
        }

        // If all ok, send 201 response
        res.status(201).send("User created");
    };

    static edit = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id = req.params.userId;

        // Get values from the body
        const { username, type } = req.body;

        // Try to find user on database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            // If not found, send a 404 response
            return res.status(404).send("User not found");
        }

        // Validate the new values on model
        user.username = username;
        user.type = type;
        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }

        // Try to safe, if fails, that means username already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            return res.status(409).send("username already in use");
        }

        // After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id = req.params.userId;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).send("User not found");
        }
        userRepository.delete(id);
        res.send(user);
    }
    
}

export default UserController;