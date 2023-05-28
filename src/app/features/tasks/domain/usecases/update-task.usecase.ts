import { TaskDetailDTO } from "../../../../shared/domain/dtos/task.dto";
import { TaskRepository } from "../../infra";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos";

export class UpdateTaskUseCase {
    async execute(
        idTask: string,
        newTask: UpdateTaskDTO
    ): Promise<TaskDetailDTO | undefined> {
        const repository = new TaskRepository();
        const updateTask = await repository.updateTask(idTask, newTask);
        return updateTask;
    }
}
