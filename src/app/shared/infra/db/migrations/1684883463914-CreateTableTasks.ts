import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateTableTasks1684883463914 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "80",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "150",
                    },
                    {
                        name: "id_user",
                        type: "uuid",
                    },
                    {
                        name: "completed",
                        type: "boolean",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ["id_user"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        name: "fk_tasks_users",
                    }),
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks", true, true, true);
    }
}
