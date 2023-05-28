import { TaskDetailDTO } from "../../../../shared/domain/dtos/task.dto";
import { TaskRepository } from "../../infra";

export class ListTasksUseCase {
    async execute(
        idUser: string,
        isCompleted?: boolean
    ): Promise<TaskDetailDTO[]> {
        const repository = new TaskRepository();
        const list = await repository.getAllUserTasks(idUser, isCompleted);
        return list;
    }
}
