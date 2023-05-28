import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { badRequest } from "../../../../shared/presentation/http.helper";

export const createUserValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let body = req.body;
   
    const scheme = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(8)
    });


    try {
        const data = scheme.parse(body);

        Object.assign(
            req.body,
            data
            
        );
        return next();
    } catch (error: any) {
        if (error instanceof ZodError) {
            return badRequest(res, {
                success: false,
                error: error.issues.map((issue) => ({
                    campo: issue.path[0],
                    mensagem: issue.message,
                    codigo: issue.code,
                })),
            });
        }
        throw error;
    }
};
