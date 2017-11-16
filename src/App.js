import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ListGroup, ListGroupItem, FormGroup, FormControl, Label } from 'react-bootstrap';
import * as tipos from './constantes';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  cambioInputNuevaTarea(event){
    if(event.which === 13){
      this.props.crear( (new Date()).getTime(), event.target.value, false );
      event.target.value = "";
    }
  }
  render() {

    const aTareas =this.props.tareas;
                    
    const ListGroupItems = aTareas.map(
      (item,index) => 
      <ListGroupItem key={index} bsClass="list-group-item text-left">
          <FormGroup bsClass="text-left">
            <Label>{item.texto}</Label>
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

//Objeto que mapeará funciones que harán la funcionalidad de store.dispatch( el_objeto_que_devuelva_cada_funcion_mapeada )
const mapDispatchToProps = {
    crear: (id,texto, hecho) => { return { type:tipos.ADD, id , texto, hecho } },
    cambiar: (id)=>{ return { type:tipos.CHANGE, id };},
    borrar: (id)=>{ return { type:tipos.DEL, id }; }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

