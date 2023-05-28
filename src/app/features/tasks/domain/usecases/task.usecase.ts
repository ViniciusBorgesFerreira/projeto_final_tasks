import { AuthUserDTO } from "../../../../shared/domain/dtos";
import { TaskDetailDTO } from "../../../../shared/domain/dtos/task.dto";
import { TaskRepository } from "../../infra/task.repository";
import { CreateTaskDTO } from "../dtos";

export class CreateTaskUseCase {
    async execute(
        createTask: CreateTaskDTO,
        authUser: AuthUserDTO
    ): Promise<TaskDetailDTO> {
        const repository = new TaskRepository();
        const task = await repository.createTask({
            ...createTask,
            idUser: authUser.id,
        });
        return task;
    }
}
