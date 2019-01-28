import React  from 'react'
import '../../node_modules/materialize-css/dist/css/materialize.min.css'
function Modal(props){
        return (
                <div id={`modal${props.uuid}`} className="modal">
                    <div className="modal-content">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
                    </div>
                </div>
        )
    
}

export default Modal