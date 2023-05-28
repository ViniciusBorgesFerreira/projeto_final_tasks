import { Express, Request, Response } from "express";
import userRoutes from "../../app/features/users/presentation/routes/userRoutes";
import authRoutes from "../../app/features/authentication/presentation/routes/auth.routes";
import taskRoutes from "../../app/features/tasks/presentation/routes/task.routes";

export default (app: Express) => {
    app.get("/", (req: Request, res: Response) =>
        res.status(200).json("API is running")
    );

    app.use(userRoutes());
    app.use(authRoutes());
    app.use(taskRoutes());
};
