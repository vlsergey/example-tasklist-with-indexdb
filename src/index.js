import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

require( 'bootstrap/dist/css/bootstrap.min.css' );

const appElement : ?Element = document.getElementById( 'app' );
if ( !appElement ) throw new Error( 'Element with ID "app" not found' );

ReactDOM.render( <App />, appElement );
