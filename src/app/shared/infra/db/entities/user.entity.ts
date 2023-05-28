import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { TaskEntity } from "./task.entity";
@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => TaskEntity, (entity) => entity.user)
    tasks!: TaskEntity[];
}
