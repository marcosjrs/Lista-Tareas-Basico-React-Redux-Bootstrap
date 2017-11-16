import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as tipos from './constantes';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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

