import { Request, Response } from "express";
import User from "../models/userModel";

export const getPaginationCards = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;
    try {

        const { count, rows } = await User.findAndCountAll({
            limit, offset,
            attributes: ['id', 'name', 'email', 'isActive'],
            order: [['id', 'ASC']]
        });

        console.log('Count:', count);
        console.log('Rows:', rows);

        const totalPages = Math.ceil(count / limit);
        res.status(200).json(
            {
                currentPage: page,
                totalPages,
                totalUser: count,
                perPage: limit,
                data: rows
            }
        )
    } catch (error) {
        console.error("Pagination Error", error);
        res.status(500).json({ error: "Internal Server Error" })
    }
} 