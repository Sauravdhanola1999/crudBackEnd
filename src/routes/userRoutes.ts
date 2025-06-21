import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controller/userController";
import { getPaginationCards } from "../controller/pagination";
import { logout, signin, signUp } from "../controller/authController";
import { validate } from "../helpers/validator";
import { userSchema, signinSchema } from "../helpers/validator"


const router: Router = Router();

router.post('/', validate(userSchema), createUser);
router.post('/signup', validate(signinSchema), signUp);
router.get('/sign', signin);
router.get('/', getUsers);
router.get('/cards', getPaginationCards);
router.get('/:id', getUser);
router.put('/:id', validate(userSchema), updateUser);
router.post('/logout', logout)
router.delete('/:id', deleteUser);


export default router;
