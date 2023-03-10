import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import { Op } from "sequelize";
import { User } from "@/src/db";

type Data = {
    user?: {},
    error?: string | unknown
    message?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){

    // only post method is accepted
    if(req.method === 'POST'){

        if(!req.body){
            return res.status(404).json({
                error: "Don't have form data...!",
            });
        }
        const { username: name, email, password } = req.body;

        // check duplicate users
        const checkexisting = await User.findOne({ where: {
                [Op.or]: [
                    { email },
                    { name }
                ]
            }
        });
        if(checkexisting){
            return res.status(422).json({ message: "User Already Exists...!"});
        }
    
        try {
            const createdUser = await User.create({ name, email, password : bcrypt.hashSync(password, 10)});
            return res.status(200).json({ user: createdUser });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else {
        return res.status(500).json({ message: "HTTP method not valid only POST Accepted" })
    }

}