import React, {Component} from 'react'
import {connect} from 'react-redux'
import './PlayerStatus.css'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3020")

class PlayerStatus extends Component {
    constructor(){
        super()
        this.state = {
            showStatus: false
        }

        socket.on('going-to-player-passive', ()=>{
           setTimeout(()=>{
            this.setState({
                showStatus: true
            })
            console.log('I happened!')
           },5000)
        })
    }

    componentDidMount(){
        socket.emit('join-room', {roomId:this.props.roomId})
    }


    render(){
        return(
            <div className="playerstatus-main">
                <h1>Players</h1>
                {this.props.players.map(player => {
                    return (
                        <div>
                            <p className={player.initialQuestionRight && this.state.showStatus ? "green" : "red"}>{player.username}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {players,roomId} = state
    return {players,roomId}
}
export default connect(mapStateToProps)(PlayerStatus)