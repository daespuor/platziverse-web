import React from 'react'
import {render} from 'react-dom'
import AgentList from './containers/agentList'
import io from 'socket.io-client'

const socket = io()
const app= document.getElementById('agents')
render(<AgentList socket={socket}/>,app)