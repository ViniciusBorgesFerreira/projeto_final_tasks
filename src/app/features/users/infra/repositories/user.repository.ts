import { UserDetailDTO } from "../../../../shared/domain/dtos";
import { appDataSource } from "../../../../shared/infra/db/data-source";
import { UserEntity } from "../../../../shared/infra/db/entities";
import { CreateUserDTO } from "../../domain/dto/user.dto";

export class UserRepository {
    private _repository = appDataSource.getRepository(UserEntity);

    async saveUser(user: CreateUserDTO): Promise<UserDetailDTO> {
        const entity = this._repository.create({
            email: user.email,
            name: user.name,
            password: user.password,
        });
        await this._repository.save(entity);
        return this.mapperToUserDetail(entity);
    }

    private mapperToUserDetail(entity: UserEntity): UserDetailDTO {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
        };
    }
}
