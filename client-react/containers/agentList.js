import React, {Component} from 'react'
import Agent from './agent'
import {serverHost} from '../../config'
import request from 'request-promise-native'
import AgentListLayout from '../components/agentList-layout'

class AgentList extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        const options={
            'method':'GET',
            'url':`${serverHost}/agents`,
            'json':true
        }
       
        request(options)
        .then((result)=>{
            if(result){
                this.setState({
                    data:result
                })
            }
            
        })
        .catch((err)=>{
            console.log(err.error)
        })
        
        this.props.socket.on('agent/connected',(payload)=>{
            const {agent} = payload
            const result=this.state.data
            result.push(agent)
            this.setState({
                data:result
            })
        })
        
    }
    
    componentDidUpdate(){
        const elems = document.querySelectorAll('.modal')
        M.Modal.init(elems, {})
    }
    render(){
        
        return (
            <AgentListLayout>
                {
                    this.state.data.map((agent,index)=>{
                        return <Agent {...agent} socket={this.props.socket} key={index}/>
                    })
                }            
            </AgentListLayout>
        )
    }
}

export default AgentList