interface IResponse {
    status: number,
    succest : boolean,
    message?: string | string[],
    body?: any
}


export class ResponseHandler {
     success(data: any, message: string = 'Éxito', status: number = 200): IResponse {
        return {
            status: status,
            succest: true,
            message: message,
            body: data,
        };
    }

     error(status: number, message: string | string[]): IResponse {
        return {
            status: status,
            succest: false,
            message: Array.isArray(message) ? message : [message],
        };
    }
}