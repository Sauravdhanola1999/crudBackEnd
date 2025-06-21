import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().min(6).max(30).required(),
  isActive: Joi.boolean().required(),
});

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  // console.log(req, req);
  const { error, value } = userSchema.validate(req.body);

  try {
    if (error) {
      // console.log(error, "reeuruheurhu")
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    req.body = value;
    next();

  } catch (error) {
    console.log(error, "getting err0r");
  }
};
