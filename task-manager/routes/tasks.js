import { Router } from "express";
import {
    createTask,
    deleteTask,
    getAllTasks,
    updateTask,
} from "../controllers/taskController.js";
import auth from "../middleware/auth.js";
const router = Router();

// @route GET api/tasks
// @desc Get All Tasks
// @access Public
router.get("/", getAllTasks);

// @route POST api/tasks
// @desc Create A Task
// @access Public
router.post("/", auth, createTask);

// @route DELETE api/tasks/:id
// @desc Delete A Task
// @access Public
router.delete("/:id", auth, deleteTask);

// @route PUT api/tasks/:id
// @desc Update A Task
// @access Public
router.put("/:id", auth, updateTask);

export default router;
