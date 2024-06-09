import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { checkMethod } from "src/utils/checkMethodPath";
import { checkPath } from "src/utils/whitelistPaths";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    private readonly logger: Logger

    constructor(){
        this.logger = new Logger(HttpException.name)
    }

    catch(exception: HttpException, host: ArgumentsHost) {
        let message = exception.getResponse() as any
        const ctx = host.switchToHttp();
        const resp = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        let status = exception.getStatus();

        if(!checkPath(req.url)){
            status = HttpStatus.NOT_FOUND
            message.message = 'unknown url path'
        }
        else if(!checkMethod(req.method.toString(), req.url.toString())){
            status = HttpStatus.METHOD_NOT_ALLOWED
            message.message = 'invalid http method'
        }

        switch(status){
            case HttpStatus.BAD_REQUEST || HttpStatus.NOT_FOUND || HttpStatus.UNAUTHORIZED || HttpStatus.CONFLICT :
                this.logger.log(`${req.ip} ${req.method} | ${req.url}: ${Array.isArray(message?.message) ? message?.message[0] : message?.message}`);
                break;
            
            case HttpStatus.TOO_MANY_REQUESTS || HttpStatus.METHOD_NOT_ALLOWED || HttpStatus.FORBIDDEN || HttpStatus.UNPROCESSABLE_ENTITY:
                this.logger.warn(`${req.ip} ${req.method} | ${req.url}: ${Array.isArray(message?.message) ? message?.message[0] : message?.message}`)
                break;
            
            default :
                console.log(message)
                this.logger.error(`${req.ip} ${req.method} | ${req.url}: ${Array.isArray(message?.message) ? message?.message[0] : message?.message}`)
                break;
        }

        resp
            .status(status)
            .json({
                message: Array.isArray(message?.message) ? message?.message[0] : message?.message
            })
    }
}