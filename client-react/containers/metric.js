import React,{Component}  from 'react'
import {serverHost} from '../../config'
import moment from 'moment'
import {Line} from 'react-chartjs-2'
import color from 'randomcolor'
import request from 'request-promise-native'
class Metric extends Component{
    constructor(props){
        super(props)
        this.state={
            data:{
                labels:[],
                datasets:[]
            },
            backgroundcolor:color()
        }
    }
    componentDidMount(){
        let labels=[]
        let values=[]
        const options={
            'method':'GET',
            'url':`${serverHost}/metrics/${this.props.uuid}/${this.props.type}`,
            'json':true
        }
        request(options)
        .then((result)=>{
            if(result){
                if(Array.isArray(result)){
                    result.forEach(m=>{
                        labels.push(moment(m.createdAt).format('HH:mm:ss'))
                        values.push(m.value)
                    })
                }
                const data={
                    labels,
                    datasets:[{
                        label:this.props.type,
                        data:values,
                        backgroundColor:this.state.backgroundcolor
                    }]
    
                }
                this.setState({
                    data
                })
                
            }
        })
        .catch((err)=>{
            console.log(err.error)
        })

        this.props.socket.on('agent/message',(payload)=>{
            const {metrics, timestamp, agent} = payload
            if(agent.uuid === this.props.uuid){
                for (let metric of metrics){
                    if(metric.type.value===this.props.type){
                    
                        let newLabels= this.state.data.labels
                        let newValues= this.state.data.datasets[0].data

                        if(newLabels.length>=10 || newValues.length >= 10 ){
                            newLabels.shift()
                            newValues.shift()
                        }

                        newLabels.push(moment(timestamp).format('HH:mm:ss'))
                        newValues.push(metric.value)

                        
                    
                        this.refs.chart.chartInstance.data.labels=newLabels
                        this.refs.chart.chartInstance.data.datasets[0].data=newValues

                        //console.log(this.refs.chart.chartInstance.data.labels)
                        this.refs.chart.chartInstance.update()
                    }
                }

           }
        })
        
    }

    render(){
        return (
                
           <Line data={this.state.data} ref='chart'/>
                  
        )
    }
}

export default Metric