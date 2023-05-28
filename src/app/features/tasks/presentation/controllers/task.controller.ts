import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../domain/usecases";
import { badRequest, ok } from "../../../../shared/presentation/http.helper";
import { ListTasksUseCase } from "../../domain/usecases/list-tasks.usecase";
import { UpdateTaskUseCase } from "../../domain/usecases/update-task.usecase";
import {
    CreateFullTaskDTO,
    CreateTaskDTO,
    UpdateTaskDTO,
} from "../../domain/dtos";
import { DeleteTaskUseCase } from "../../domain/usecases/delete-task.usecase copy";

export class TasksController {
    async createTask(req: Request, res: Response) {
        const { title, description, completed } = req.body;
        const useCase = new CreateTaskUseCase();

        try {
            const authUser = req.user;
            const task = await useCase.execute(
                { title, description, completed },
                authUser
            );

            return ok(res, { success: true, data: task });
        } catch (error: any) {
            return badRequest(res, { success: false, error: error.message });
        }
    }

    async getTasks(req: Request, res: Response) {
        const useCase = new ListTasksUseCase();
        const { isCompleted } = req.body;
        try {
            const tasks = await useCase.execute(req.user.id, isCompleted);
            return ok(res, { success: true, data: tasks });
        } catch (error: any) {
            return badRequest(res, { success: false, error: error.message });
        }
    }

    async updateTask(req: Request, res: Response) {
        const { id, title, description, completed } = req.body;

        const useCase = new UpdateTaskUseCase();

        try {
            const newTask: UpdateTaskDTO = {
                id: id,
                title: title,
                description: description,
                completed: completed,
            };
            const updateTask = await useCase.execute(newTask.id, newTask);

            return ok(res, { success: true, data: updateTask });
        } catch (error: any) {
            return badRequest(res, { success: false, error: error.message });
        }
    }

    async deleteTask(req: Request, res: Response) {
        const { id } = req.body;

        const useCase = new DeleteTaskUseCase();

        try {
            const deleteTask = await useCase.execute(id);

            return ok(res, {
                success: true,
                data: "Task deleted successfully",
            });
        } catch (error: any) {
            return badRequest(res, { success: false, error: error.message });
        }
    }
}
