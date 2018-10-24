import React, {Component} from 'react'
import './Timer.css'
import io from 'socket.io-client'
import {connect} from 'react-redux'

const socket = io.connect("http://localhost:3020")

class Timer extends Component {
    constructor(){
        super()
        this.state = {
            timer: 10,
            killInterval: false
        }
    }


componentDidMount(){
    setTimeout(()=>{
        this.interval = setInterval(()=>{
            if(this.state.timer >= 0){
                this.setState({
                    timer: this.state.timer - 1
                })
            } else {
                console.log('emitting')
                socket.emit('to-player-passive', {roomId: this.props.roomId})
                this.setState({
                    killInterval: true
                })
            }
        },1000)
    },5000)
}

componentDidUpdate(){
    if(this.state.killInterval){
        clearInterval(this.interval)
    }
}



    render(){
        return (
            <div className="timer-main">
                {this.state.timer !== -1 ? this.state.timer : ''}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {roomId} = state
    return {roomId}
}
export default connect(mapStateToProps)(Timer)
