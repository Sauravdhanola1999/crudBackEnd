import { Request, Response } from "express";
import Auth from "../models/authModel";
import { generateAccessToken, generateRefreshToken } from "../helpers/token";
import bcrypt from "bcryptjs";


export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const checkEmail = await Auth.findOne({ where: { email } });
        if (checkEmail) {
            res.status(400).json({ message: "Email ALready Exsist" });
            return;
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Auth.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Signup failed" });
    }
}


export const signin = async (req: Request, res: Response)=> {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
       res.status(401).json({ message: 'Invalid credentials' });
       return
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // set true in production with https
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
   res.json({ accessToken });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};