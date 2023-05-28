import { Request, Response } from "express";
import { CreateUserUseCase } from "../../domain/usecases";
import { badRequest, ok } from "../../../../shared/presentation/http.helper";
import { CustomError } from "../../../../shared/errors";

export class UserController {
    async createUser(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            const useCase = new CreateUserUseCase();
            const user = await useCase.execute({
                name,
                email,
                password,
            });

            return ok(res, { success: true, data: user });
        } catch (error: any) {
            if (error instanceof CustomError) {
                return badRequest(res, {
                    success: false,
                    error: error.message,
                });
            }
            throw error;
        }
    }
}
