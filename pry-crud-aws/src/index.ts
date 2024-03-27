import "reflect-metadata"
import { AppDataSource } from "./db"
import { User } from "./Entities/Users";
import { ResponseHandler } from "./interfaces/IResponse";

 async function main() {
    const response = new ResponseHandler();
    try {
        const connection = await AppDataSource.initialize();
        console.log('Conexion exitosa');
        return response.success(connection,'conexion exitosa', 200);
    } catch (error) {
        return response.error(500,error.message);
    }
}

export const getUsers =  async (request: any) => {
    const response = new ResponseHandler();
    try {
        const connection = await main();

        if(!connection.succest) return connection;

        const userList = await User.find();
        await connection.body.close();
        return response.success(userList,'Consulta exitosa', 200)
    } catch (error){
        return response.error(500, error.message);
    } 
}

export const getByUsers =  async (request: any) => {
    const connection = await main();

    const response = new ResponseHandler();
    
    try {
        const id = request.pathParameters.id;
        const userList = await User.findOneBy({ id: parseInt(id)});

        if(!userList) return response.error(404,'Usuario no existente');
        await connection.body.close();
        return response.success(userList,'Consulta exitosa', 200);
    } catch (error) {
        return response.error(500, error.message);
    }

}

export const postUser = async (request: any) => {
    await main();
    const response = new ResponseHandler();

    try {
        const reqBody = JSON.parse(request.body);
        console.log(reqBody);
        const user = new User();
        user.name = reqBody.name;
        user.lastname = reqBody.lastname;
        user.email = reqBody.email;
        console.log('objeto', user);
        await user.save();
        return response.success(user,'Consulta exitosa', 200);
    } catch (err) {
        return response.error(500, err.message);
    }
}


export const putUser = async (request: any) => {
    await main();
    const response = new ResponseHandler();
    try {
        const id = request.pathParameters.id;
        const user = await User.findOneBy({ id: parseInt(id) });
        if(!user) return response.error(404,'Usuario no existe');

        await User.update({ id: parseInt(id) }, JSON.parse(request.body));
        return response.success(user,'Usuario Actualizado con exito', 200);
    } catch (err) {
        return response.error(500, err.message);
    }
}


export const deleteUser = async (request: any) => {
    await main();
    const response = new ResponseHandler();

    try {
        const id = request.pathParameters.id;
        console.log(id);
        const user = await User.findOneBy({ id: parseInt(id) });
        console.log(user);
        if(!user) return response.error(404,'Usuario no existe');
        await User.delete({ id: parseInt(id) });
        return response.success(user,'Usuario eliminado con exito', 200);
    } catch (err) {
        return response.error(500, err.message);
    }
}
