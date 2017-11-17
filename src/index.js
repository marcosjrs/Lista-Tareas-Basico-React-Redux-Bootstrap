import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './App';
import {tareasReductor} from './reductores';
import registerServiceWorker from './registerServiceWorker';

const reducers = combineReducers({
    tareas: tareasReductor,
});

//Un middleware, en este caso, captura despues de que se dispara la acción pero antes de que llegue al reductor. "Captura la acción".
var store = createStore(reducers, applyMiddleware(ReduxThunk)); //En este caso ponemos como "capturador" el ReduxThunk 

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
