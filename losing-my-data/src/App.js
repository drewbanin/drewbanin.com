import React from "react";
import Sheet from './Sheet'
import ModalComponent from './Modal';


import Toolbar from './Toolbar.js';
import './Toolbar.scss';


const App = () => {
    return <div style={{width: '100%', height: '100%'}}>
        <ModalComponent>
            <Sheet width="100%" />
        </ModalComponent>
    </div>
}


export default App;
