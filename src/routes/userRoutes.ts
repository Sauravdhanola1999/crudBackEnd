import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controller/userController";
import { getPaginationCards } from "../controller/pagination";
import { validateUser } from "../helpers/validator";


const router: Router = Router();



router.post('/',
    validateUser,
    createUser);
router.get('/', getUsers);
router.get('/cards', getPaginationCards);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;
