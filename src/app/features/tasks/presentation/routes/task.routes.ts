import express from "express";
import { TasksController } from "../controllers";
import { auth } from "../../../../shared/presentation/middlewares/auth.middleware";

export default () => {
    const router = express.Router();

    router.post("/tasks", auth, new TasksController().createTask);
    router.get("/tasks", auth, new TasksController().getTasks);
    router.put("/tasks", auth, new TasksController().updateTask);
    router.delete("/tasks", auth, new TasksController().deleteTask);

    return router;
};
