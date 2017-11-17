import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ListGroup, ListGroupItem, FormGroup, FormControl, Label, Checkbox,Button, Glyphicon } from 'react-bootstrap';
import {crear, cambiar, borrar} from './acciones';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  cambioInputNuevaTarea(event){
    if(event.which === 13){
      this.props.crear( (new Date()).getTime(), event.target.value, false );
      event.target.value = "";
    }
  }

  cambiarHecho(event){
    this.props.cambiar(event.currentTarget.id.split("cambiar_").join(""));
  }

  borrar(event){
    this.props.borrar(event.currentTarget.id.split("borrar_").join(""));
  }

  render() {

    const aTareas =this.props.tareas;
                    
    const ListGroupItems = aTareas.map(
      (item,index) => 
      <ListGroupItem key={index} bsClass="list-group-item text-left">
          <FormGroup bsClass="text-left">
          <Checkbox id={'cambiar_'+item.id} onChange={(event)=>this.cambiarHecho(event)} inline ><Label bsClass={item.hecho?'strike':''} >{item.texto}</Label></Checkbox>
          <Button id={"borrar_"+item.id} className="pull-right" bsStyle="danger" bsSize="xsmall" onClick={(event) => {this.borrar(event)}}><Glyphicon glyph="trash" /></Button>
          </FormGroup>
      </ListGroupItem>
    );

    const lista = (
      <ListGroup>
        {ListGroupItems}
      </ListGroup>
    );
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lista de tareas con React & Redux</h1>
        </header>
        <FormControl
          onKeyUp={(eventKey)=>this.cambioInputNuevaTarea(eventKey)}
          id="tarea"
          type="text"
          label="Text"
          placeholder="Introduce un texto y pulsa Enter"
        />
        {lista}
      </div>
    );
  }
}

//Función que inyectará el atributo tareas en props con el contenido de tareas del estado principal. 
//Establecido antes mediante Provider encapsulando el compo App en index.js.
const mapStateToProps = (estado) => {
  return {
    tareas: estado.tareas
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
      crear: (id, texto, hecho) => {
             // dispatch(crear(id, texto, hecho)) // <--Antes ( Envolvía una funcion, de acciones.js, que devuelve un objeto, de forma sincronica )
          dispatch(
            //Ahora: Envuelve una funcion (a la que llamará redux-thunk, que es un middleware entre accion y reductor)
            // y esta funcion devuelve a su vez lo que devolvía antes pero de forma asincrónica... como si por ej. se llamara a un servicio primero...
            (dispatch)=>{
              setTimeout( ()=>{ dispatch(crear(id, texto, hecho))  }, 1000 );
            }
          );
      },
      cambiar: (id) => {
        setTimeout(()=>{ dispatch(cambiar(id)) },1000); //Otra forma de hacer asincrona.. pero aqui no actua el redux-thunk de la misma forma porque se retarda el dispatch, no desde dentro del dispatch. 
      },
      borrar: (id) => {
        dispatch(borrar(id)); //sin ser asincrono
      }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

