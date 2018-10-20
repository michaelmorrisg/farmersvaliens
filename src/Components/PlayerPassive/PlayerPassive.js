import React, {Component} from 'react'
import io from 'socket.io-client'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const socket = io.connect("http://localhost:3020")

class PlayerPassive extends Component {
    constructor(){
        super()
        this.state = {
            toQuestion: false
        }

        socket.on('display-options', ()=>{
            this.setState({
                toQuestion: true
            })
        })
    }
    componentDidMount(){
        socket.emit('join-room', {roomId: this.props.roomId})
        console.log(this.props)
    }

    render(){
        return(
            <div>
                <h1>Abducted</h1>
                {this.state.toQuestion ? <Redirect to="playeranswer" /> : ''}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {roomId} = state
    return {roomId}
}
export default connect(mapStateToProps)(PlayerPassive)