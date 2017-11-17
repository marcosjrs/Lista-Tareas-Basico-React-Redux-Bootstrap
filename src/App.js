import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ListGroup, ListGroupItem, FormGroup, FormControl, Label, Checkbox,Button, Glyphicon } from 'react-bootstrap';
import {crear, cambiar, borrar} from './acciones';
import logo from './logo.svg';
import './App.css';
import * as tipos from './constantes';

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
          dispatch(crear(id, texto, hecho)) //crear es la importada de acciones.js...
      },
      cambiar: (id) => {
        dispatch(cambiar(id))
      },
      borrar: (id) => {
        dispatch(borrar(id))
      }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

