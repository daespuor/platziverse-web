import React,{Component} from 'react'
import MetricList from './metricList'
import {serverHost} from '../../config'
import request from 'request-promise-native'
import AgentLayout from '../components/agent-layout'

class Agent extends Component{

    constructor(props){
        super(props)
        this.state={
            metrics:[],
            connected: "True"
        }
    }

    componentDidMount(){
        const options={
            'method':'GET',
            'url':`${serverHost}/metrics/${this.props.uuid}`,
            'json':true
        }
        let result=null
        request(options)
        .then((result)=>{
            if(result){
                this.setState({
                    metrics:result
                })
            }
        })
        .catch((err)=>{
            console.log(err.error)
        })
        
        this.props.socket.on('agent/disconnected',(payload)=>{
            if(payload.agent.uuid===this.props.uuid){
                this.setState({
                    connected:"False"
                })
            }
        })

    }

    render(){
        return (
            <AgentLayout uuid={this.props.uuid}>
                <h3>{this.props.name} ({this.props.pid})</h3>
                <p><span>{this.props.hostname}</span></p>
                <p><span id={`connected${this.props.uuid}`}><b>Connected: {this.state.connected}</b></span></p>
                <MetricList data={this.state.metrics} socket={this.props.socket} uuid={this.props.uuid} />
            </AgentLayout>
        )
    }
}

export default Agent