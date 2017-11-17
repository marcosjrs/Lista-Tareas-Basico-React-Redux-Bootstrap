import * as tipos from './constantes';

export const tareasReductor = function(tareas=[], accion){
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
};