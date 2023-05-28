import { TaskDetailDTO } from "../../../../shared/domain/dtos/task.dto";
import { TaskRepository } from "../../infra";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos";

export class DeleteTaskUseCase {
    async execute(idTask: string): Promise<TaskDetailDTO | undefined> {
        const repository = new TaskRepository();
        const deletedTask = await repository.deleteTask(idTask);
        return deletedTask;
    }
}
