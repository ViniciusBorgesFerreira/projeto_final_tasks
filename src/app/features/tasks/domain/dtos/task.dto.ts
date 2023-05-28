export interface CreateTaskDTO {
    title: string;
    description: string;
    completed: boolean;
}

export interface CreateFullTaskDTO extends CreateTaskDTO {
    idUser: string;
}

export interface UpdateTaskDTO {
    id: string;
    title?: string;
    description?: string;
    completed?: boolean;
}
