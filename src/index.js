import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import './index.css';
import App from './App';
import * as tipos from './constantes';
import registerServiceWorker from './registerServiceWorker';

//Estado
const estadoGlobal = {
    tareas:[]
};

//Reductores 
const tareasReductor = function(estado, accion){
    const nuevoEstado = Object.assign({},estado);
    let nuevasTareas;
    switch (accion.type) {
        case tipos.ADD:
            nuevasTareas = nuevoEstado.tareas.concat({
                id:accion.id,
                texto:accion.texto,
                hecho: accion.hecho
            });
            nuevoEstado.tareas = nuevasTareas;
            return nuevoEstado;
    
        case tipos.DEL:
            nuevasTareas = nuevoEstado.tareas.filter(function(item){ 
                return (item.id+"" !== accion.id);
            });
            nuevoEstado.tareas = nuevasTareas;
            return nuevoEstado;
        case tipos.CHANGE:
            nuevoEstado.tareas = estado.tareas.slice();
            nuevoEstado.tareas.forEach(function(item){ 
                if (item.id+"" === accion.id){
                    item.hecho = !item.hecho;
                }
            });
            return nuevoEstado;
        default:
         return estado;
    }
}


//Store
var store = createStore(tareasReductor, estadoGlobal);



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
