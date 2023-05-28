import { BCryptPassword } from "../../../../shared/adapters/crypto";
import { JwtToken } from "../../../../shared/adapters/jwt";
import { CustomError } from "../../../../shared/errors";
import { UserSharedRepository } from "../../../../shared/infra/repositories";
import { LoginDTO, LoginDetailDTO } from "../dtos";

export class LoginUseCase {
    async execute(loginDto: LoginDTO): Promise<LoginDetailDTO> {
        const repository = new UserSharedRepository();
        const bcrypt = new BCryptPassword();

        const user = await repository.getUserByEmail(loginDto.email, {
            withPassword: true,
        });
        if (!user) {
            throw new CustomError("Incorrect email or password!");
        }

        const correctPassword = await bcrypt.comparePassword(
            loginDto.password,
            user.password!
        );

        if (!correctPassword) {
            throw new CustomError("Incorrect email or password!");
        }

        const jwtToken = new JwtToken();

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        const token = jwtToken.sign(userData);

        return {
            ...userData,
            token,
        };
    }
}
