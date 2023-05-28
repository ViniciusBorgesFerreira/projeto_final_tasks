import { CustomError } from "../../../../shared/errors";
import { UserDetailDTO } from "../../../../shared/domain/dtos";
import { UserSharedRepository } from "../../../../shared/infra/repositories";
import { UserRepository } from "../../infra/repositories/user.repository";
import { CreateUserDTO } from "../dto/user.dto";
import { BCryptPassword } from "../../../../shared/adapters/crypto";

export class CreateUserUseCase {
    async execute(createUserDTO: CreateUserDTO): Promise<UserDetailDTO> {
        const repository = new UserRepository();
        const sharedRepository = new UserSharedRepository();

        const exists = await sharedRepository.getUserByEmail(
            createUserDTO.email
        );

        if (exists) throw new CustomError("Email already exists");

        const bcrypt = new BCryptPassword();

        const hashPassword = await bcrypt.hashPassword(createUserDTO.password);

        const dto = Object.assign(createUserDTO, { password: hashPassword });

        const user = await repository.saveUser(dto);

        return user;
    }
}
