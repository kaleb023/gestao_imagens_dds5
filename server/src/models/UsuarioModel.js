import mysql from 'mysql2/promise';
import db from '../conexao.js';


export async function createUsuario(usuario) {
    console.log('UsuarioModel :: createUsuario');
    const conexao = mysql.createPool(db);

    const sql = 'INSERT INTO usuarios (login,senha,funcao) VALUES (?,?,?)';

    const params = [
        usuario.login,
        usuario.senha,
        usuario.funcao
    ];
    
    try {
        const [retorno] = await conexao.query(sql,params);
        return [201, {messagem:'Usuário Cadastrado'}]
    } catch (error) {
        console.log(error);
        return [500, {messagem:'Erro ao cadastrar usuário'}]
    }
}

export async function readUsuario() {
    console.log('UsuarioModel :: readUsuario');
    const conexao = mysql.createPool(db);

    const sql = 'SELECT * FROM usuarios'

    try {
        const [retorno] = await conexao.query(sql);
        return [200,retorno];
    } catch (error) {
        return [500, error];
    }  
}

export async function showOneUsuario(id_usuario) {
    console.log('UsuarioModel :: showOneUsuario');
    const conexao = mysql.createPool(db);

    const sql = 'SELECT * FROM usuarios where id_usuarios=?';
    const params = [id_usuario];

    try {
        const [retorno] = await conexao.query(sql,params);
        if(retorno.length < 1){
            return [404, {message:'Usuário não encontrado'}];
        }else{
            return [200,retorno[0]];
        }
    } catch (error) {
        console.log(error);
        return [500, {message:'Erro ao mostrar usuário'}];
    }
    
}

export async function findUserByLoginPassword(login,senha) {
    console.log('UsuarioModel :: findUserByLoginPassword');
    const conexao = mysql.createPool(db);

    const sql = 'SELECT id_usuarios FROM usuarios WHERE login = ? AND senha = ?';
    const params = [login,senha];

    try {
        const [retorno] = await conexao.query(sql,params);
        if(retorno.length < 1){
            return [404, {message:'Usuário ou senha inválidos'}];
        }else{
            return [200,retorno[0]];
        }
    } catch (error) {
        console.log(error);
        return [500, {message:'Erro ao mostrar usuário'}];
    }

}

export async function updateUsuario() {
    console.log('UsuarioModel :: updateUsuario');
    const conexao = mysql.createPool(db);
    
}