import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controller/userController";
import { getPaginationCards } from "../controller/pagination";

const router: Router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/cards', getPaginationCards);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;
