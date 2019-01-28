import React from 'react'
import '../../node_modules/materialize-css/dist/css/materialize.min.css'


function AgentListLayout(props){
    return (
        <div className='container'>
           {props.children}             
        </div>
    )
}

export default AgentListLayout