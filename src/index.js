import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './App';
import * as tipos from './constantes';
import registerServiceWorker from './registerServiceWorker';

//Para añadir el combinador de reducers se ha hecho
//(Paso1 :) Añadimos un nombre de propiedad que teniamos en el estado ("tareas" en este caso), como 
//nombre del objeto pasado al combineReducers y le asignamos el reducer encargado de esa propiedad quedando: 
//const reducers = combineReducers({ tareas: tareasReductor,});

//(Paso2 :) Debido al paso anterior, tenemos que inicializar en el reducer la variable pasada como primer parámetro, 
// que ahora no es el estado completo sino el nombre puesto en el combineReducer ("tareas", en este caso).
// Motivo por el cual tenemos que refactorizar en el reducer (, ya que ahora lo pasado no es todo el store).

//(Paso3 :) Eliminamos el paso del store principal en el createStore, quedando solo el resultado de combineReducers

//Reductores 
const tareasReductor = function(tareas=[], accion){
    let nuevasTareas = tareas.slice();
    switch (accion.type) {
        case tipos.ADD:            
            return nuevasTareas.concat({
                id:accion.id,
                texto:accion.texto,
                hecho: accion.hecho
            });    
        case tipos.DEL:
            return  nuevasTareas.filter(function(item){ 
                return (item.id+"" !== accion.id);
            });
        case tipos.CHANGE:
            nuevasTareas.forEach(function(item){ 
                if (item.id+"" === accion.id){
                    item.hecho = !item.hecho;
                }
            });
            return nuevasTareas;
        default:
        return tareas;
    }
}

const reducers = combineReducers({
    tareas: tareasReductor,
});


//Store
var store = createStore(reducers);



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
