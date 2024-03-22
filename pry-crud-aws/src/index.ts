import "reflect-metadata"
import { AppDataSource } from "./db"
import { User } from "./Entities/Users";

 async function main() {
    const response: IResponse =  { succest: false, message: '', body:{}};
    try {
        await AppDataSource.initialize();
        console.log('Conexion exitosa');
        response.succest= true;
        response.message = 'conexion exitosa';
    } catch (error) {
        response.message = 'Error en la conexion', error;
    }
    return response;
}

export const getUsers =  async (request: any) => {
    await main();
    const response : IResponse = { succest: false, message: '', body: {}}
    
    try {
        const userList = await User.find();
        response.succest = true;
        response.message = 'Consulta exitosa';
        response.body = userList;
    } catch (err) {
        if(err instanceof Error){
            response.message = 'Ocurrio un Error', err.message;
        }
    }

    return response;

}

export const getByUsers =  async (request: any) => {
    await main();

    const response : IResponse = { succest: false, message: '', body: {}}
    
    try {
        const id = request.pathParameters.id;
        const userList = await User.findOneBy({ id: parseInt(id)});

        if(!userList) return response.message = 'Usuario no existente';

        response.succest = true;
        response.message = 'Consulta exitosa';
        response.body = userList;
    } catch (err) {
        response.body = err;
        if(err instanceof Error){
            response.message = 'Ocurrio un Error: ', err.message;
        }
    }

    return response;

}

export const postUser = async (request: any) => {
    await main();
    const response : IResponse = { succest: false, message: '', body: {}}

    try {
        const reqBody = JSON.parse(request.body);
        console.log(reqBody);
        const user = new User();
        user.name = reqBody.name;
        user.lastname = reqBody.lastname;
        user.email = reqBody.email;
        console.log('objeto', user);
        await user.save();
        response.succest = true;
        response.message = 'Usuario insertado con exito';
        response.body = user;
    } catch (err) {
        if(err instanceof Error){
            response.message = 'Ocurrio un Error: ', err.message;
        }
    }

    return response;
}


export const putUser = async (request: any) => {
    await main();
    const response : IResponse = { succest: false, message: '', body: {}}
    try {
        const id = request.pathParameters.id;
        const user = await User.findOneBy({ id: parseInt(id) });
        if(!user){
            response.message = 'Usuario no existente';
            return response;
        } 

        await User.update({ id: parseInt(id) }, JSON.parse(request.body));
        response.succest = true;
        response.message = 'Usuario actualizado con exito';
        response.body = user;
    } catch (err) {
        if(err instanceof Error){
            response.message = 'Ocurrio un Error: ', err.message;
        }
    }

    return response;
}


export const deleteUser = async (request: any) => {
    await main();
    const response: IResponse = { succest :false, message: '', body: {}}

    try {
        const id = request.pathParameters.id;
        console.log(id);
        const user = await User.findOneBy({ id: parseInt(id) });
        console.log(user);
        if(!user){
            response.message = 'Usuario no existente';
            return response;
        } 
        await User.delete({ id: parseInt(id) });
        response.succest = true;
        response.message = 'Usuario eliminado con exito';
    } catch (err) {
        if(err instanceof Error){
            response.message = 'Ocurrio un Error';
            response.body = { error : { message : err.message , nombre: err.name}  };
        }
    }

    return response;
}
