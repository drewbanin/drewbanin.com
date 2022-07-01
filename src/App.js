import React from "react";
import Sheet from './Sheet'
import ModalComponent from './Modal';


const App = () => {
    return <div style={{width: '100%', height: '100%'}}>
        <ModalComponent>
            <Sheet width="100%" />
        </ModalComponent>
    </div>
}


export default App;
