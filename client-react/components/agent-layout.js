import React from 'react'
import '../../node_modules/materialize-css/dist/css/materialize.min.css'

function AgentLayout(props){
    return (
        <div className="row">
            {props.children}
            <a className="waves-effect waves-light btn modal-trigger" href={`#modal${props.uuid}`}>Modal</a>
        </div>
    )
}

export default AgentLayout
