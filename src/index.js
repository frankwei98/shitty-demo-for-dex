import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './store'
import registerServiceWorker from './registerServiceWorker';
import { ScatterProvider } from "./components/scatter";



ReactDOM.render(
    (<Store.Container>
        <ScatterProvider>
            {providerState => <App {...providerState} />}
        </ScatterProvider>
    </Store.Container>
    )
    , document.getElementById('root'));
registerServiceWorker();
