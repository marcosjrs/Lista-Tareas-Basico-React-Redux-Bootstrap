import * as tipos from './constantes';
export const crear = (id, texto, hecho) => { return { type:tipos.ADD, id , texto, hecho } };
export const cambiar = (id) => { return { type:tipos.CHANGE, id }; };
export const borrar = (id) => { return { type:tipos.DEL, id }; };