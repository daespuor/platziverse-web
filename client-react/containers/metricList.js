import React  from 'react'
import Metric from './metric'
import Modal from '../components/modal'

function MetricList(props){
        return (
                <Modal uuid={props.uuid}>
                    {props.data.map((metric,index)=>{
                        return <Metric uuid={props.uuid} socket={props.socket} {...metric} key={index}/>
                    })}
                </Modal>
        )
    
}

export default MetricList