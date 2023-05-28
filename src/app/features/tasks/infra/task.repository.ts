import { StringDecoder } from "string_decoder";
import { TaskDetailDTO } from "../../../shared/domain/dtos/task.dto";
import { appDataSource } from "../../../shared/infra/db/data-source";
import { TaskEntity } from "../../../shared/infra/db/entities";
import {
    CreateFullTaskDTO,
    CreateTaskDTO,
    UpdateTaskDTO,
} from "../domain/dtos";
import { AuthUserDTO } from "../../../shared/domain/dtos";

export class TaskRepository {
    private _repository = appDataSource.getRepository(TaskEntity);

    async createTask(data: CreateFullTaskDTO): Promise<TaskDetailDTO> {
        const task = this._repository.create({
            title: data.title,
            description: data.description,
            completed: data.completed,
            idUser: data.idUser,
        });

        await this._repository.save(task);
        return this.mapperToTaskDetail(task);
    }

    async getTask(idTask: string): Promise<TaskDetailDTO | undefined> {
        const task = await this._repository.findOne({ where: { id: idTask } });
        if (!task) return undefined;
        return this.mapperToTaskDetail(task);
    }

    async getAllUserTasks(
        idUser: string,
        isCompleted?: boolean
    ): Promise<TaskDetailDTO[]> {
        const userTasks = await this._repository.find({
            where: { idUser, completed: isCompleted },
        });
        return userTasks.map((tasks) => this.mapperToTaskDetail(tasks));
    }

    async updateTask(
        id: string,
        newTask: UpdateTaskDTO
    ): Promise<TaskDetailDTO | undefined> {
        const task = await this._repository.findOneBy({ id });

        if (!task) return undefined;

        Object.assign(task, newTask);

        await this._repository.save(task);

        return task;
    }

    async deleteTask(id: string): Promise<TaskDetailDTO | undefined> {
        const task = await this._repository.findOneBy({ id });

        if (!task) return undefined;

        await this._repository.delete(task.id);

        return task;
    }

    private mapperToTaskDetail(task: TaskEntity): TaskDetailDTO {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            completed: task.completed,
            //idUser: task.idUser,
            //createdAt: task.createdAt,
            //updatedAt: task.updatedAt,
        };
    }
}
