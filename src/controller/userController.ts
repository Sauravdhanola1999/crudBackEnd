import { Request, Response } from "express";
import User from "../models/userModel";


export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, isActive } = req.body;
    try {
        const user = await User.create({ name, email, password, isActive });
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}


export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User Not Found" })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const user = await User.findByPk(req.params.id);
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleteUser = await User.destroy({ where: { id: req.params.id } });
        if (deleteUser) {
            res.status(200).json({ message: "User Deletd" });
        } else {
            res.status(400).json({ message: "User Not Found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}