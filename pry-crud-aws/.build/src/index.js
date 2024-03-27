"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getByUsers = exports.getUsers = void 0;
require("reflect-metadata");
const db_1 = require("./db");
const Users_1 = require("./Entities/Users");
const IResponse_1 = require("./interfaces/IResponse");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = new IResponse_1.ResponseHandler();
        try {
            const connection = yield db_1.AppDataSource.initialize();
            console.log('Conexion exitosa');
            return response.success(connection, 'conexion exitosa', 200);
        }
        catch (error) {
            return response.error(500, error.message);
        }
    });
}
const getUsers = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new IResponse_1.ResponseHandler();
    try {
        const connection = yield main();
        if (!connection.succest)
            return connection;
        const userList = yield Users_1.User.find();
        yield connection.body.close();
        return response.success(userList, 'Consulta exitosa', 200);
    }
    catch (error) {
        return response.error(500, error.message);
    }
});
exports.getUsers = getUsers;
const getByUsers = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield main();
    const response = new IResponse_1.ResponseHandler();
    try {
        const id = request.pathParameters.id;
        const userList = yield Users_1.User.findOneBy({ id: parseInt(id) });
        if (!userList)
            return response.error(404, 'Usuario no existente');
        yield connection.body.close();
        return response.success(userList, 'Consulta exitosa', 200);
    }
    catch (error) {
        return response.error(500, error.message);
    }
});
exports.getByUsers = getByUsers;
const postUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
    const response = new IResponse_1.ResponseHandler();
    try {
        const reqBody = JSON.parse(request.body);
        console.log(reqBody);
        const user = new Users_1.User();
        user.name = reqBody.name;
        user.lastname = reqBody.lastname;
        user.email = reqBody.email;
        console.log('objeto', user);
        yield user.save();
        return response.success(user, 'Consulta exitosa', 200);
    }
    catch (err) {
        return response.error(500, err.message);
    }
});
exports.postUser = postUser;
const putUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
    const response = new IResponse_1.ResponseHandler();
    try {
        const id = request.pathParameters.id;
        const user = yield Users_1.User.findOneBy({ id: parseInt(id) });
        if (!user)
            return response.error(404, 'Usuario no existe');
        yield Users_1.User.update({ id: parseInt(id) }, JSON.parse(request.body));
        return response.success(user, 'Usuario Actualizado con exito', 200);
    }
    catch (err) {
        return response.error(500, err.message);
    }
});
exports.putUser = putUser;
const deleteUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
    const response = new IResponse_1.ResponseHandler();
    try {
        const id = request.pathParameters.id;
        console.log(id);
        const user = yield Users_1.User.findOneBy({ id: parseInt(id) });
        console.log(user);
        if (!user)
            return response.error(404, 'Usuario no existe');
        yield Users_1.User.delete({ id: parseInt(id) });
        return response.success(user, 'Usuario eliminado con exito', 200);
    }
    catch (err) {
        return response.error(500, err.message);
    }
});
exports.deleteUser = deleteUser;
