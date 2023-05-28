import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "tasks" })
export class TaskEntity extends BaseEntity {
    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column({ type: "bool" })
    completed!: boolean;

    @Column({ name: "id_user", type: "varchar" })
    idUser!: string;

    @ManyToOne(() => UserEntity, (entity) => entity.tasks)
    @JoinColumn({ name: "id_user", referencedColumnName: "id" })
    user!: UserEntity;
}
