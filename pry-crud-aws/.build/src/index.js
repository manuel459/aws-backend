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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = { succest: false, message: '', body: {} };
        try {
            yield db_1.AppDataSource.initialize();
            console.log('Conexion exitosa');
            response.succest = true;
            response.message = 'conexion exitosa';
        }
        catch (error) {
            response.message = 'Error en la conexion', error;
        }
        return response;
    });
}
const getUsers = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
    const response = { succest: false, message: '', body: {} };
    try {
        const userList = yield Users_1.User.find();
        response.succest = true;
        response.message = 'Consulta exitosa';
        response.body = userList;
    }
    catch (err) {
        if (err instanceof Error) {
            response.message = 'Ocurrio un Error', err.message;
        }
    }
    return response;
});
exports.getUsers = getUsers;
const getByUsers = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
    const response = { succest: false, message: '', body: {} };
    try {
        const id = request.pathParameters.id;
        const userList = yield Users_1.User.findOneBy({ id: parseInt(id) });
        if (!userList)
            return response.message = 'Usuario no existente';
        response.succest = true;
        response.message = 'Consulta exitosa';
        response.body = userList;
    }
    catch (err) {
        response.body = err;
        if (err instanceof Error) {
            response.message = 'Ocurrio un Error: ', err.message;
        }
    }
    return response;
});
exports.getByUsers = getByUsers;
const postUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
    const response = { succest: false, message: '', body: {} };
    try {
        const reqBody = JSON.parse(request.body);
        console.log(reqBody);
        const user = new Users_1.User();
        user.name = reqBody.name;
        user.lastname = reqBody.lastname;
        user.email = reqBody.email;
        console.log('objeto', user);
        yield user.save();
        response.succest = true;
        response.message = 'Usuario insertado con exito';
        response.body = user;
    }
    catch (err) {
        if (err instanceof Error) {
            response.message = 'Ocurrio un Error: ', err.message;
        }
    }
    return response;
});
exports.postUser = postUser;
const putUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
    const response = { succest: false, message: '', body: {} };
    try {
        const id = request.pathParameters.id;
        const user = yield Users_1.User.findOneBy({ id: parseInt(id) });
        if (!user) {
            response.message = 'Usuario no existente';
            return response;
        }
        yield Users_1.User.update({ id: parseInt(id) }, JSON.parse(request.body));
        response.succest = true;
        response.message = 'Usuario actualizado con exito';
        response.body = user;
    }
    catch (err) {
        if (err instanceof Error) {
            response.message = 'Ocurrio un Error: ', err.message;
        }
    }
    return response;
});
exports.putUser = putUser;
const deleteUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
    const response = { succest: false, message: '', body: {} };
    try {
        const id = request.pathParameters.id;
        console.log(id);
        const user = yield Users_1.User.findOneBy({ id: parseInt(id) });
        console.log(user);
        if (!user) {
            response.message = 'Usuario no existente';
            return response;
        }
        yield Users_1.User.delete({ id: parseInt(id) });
        response.succest = true;
        response.message = 'Usuario eliminado con exito';
    }
    catch (err) {
        if (err instanceof Error) {
            response.message = 'Ocurrio un Error';
            response.body = { error: { message: err.message, nombre: err.name } };
        }
    }
    return response;
});
exports.deleteUser = deleteUser;
