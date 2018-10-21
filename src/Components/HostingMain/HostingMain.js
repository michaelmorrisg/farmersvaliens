import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
import {Redirect} from 'react-router-dom'

const socket = io.connect("http://localhost:3020")

class HostingMain extends Component {
    constructor(){
        super()
        this.state = {
            players: [],
            toStoryStart: false
        }

        socket.on('add-player', ()=>{
            axios.get(`/api/getplayers/${this.props.roomId}`).then(res => {
                this.setState({
                    players: res.data
                })
            })
        })

        socket.on('going-to-player-passive', ()=>{
            this.setState({
                toStoryStart: true
            })
        })
    }
    componentDidMount(){
        socket.emit('join-room', {roomId: this.props.roomId})
    }

    render(props){
        return(
            <div>
                <h1>Hosting Main</h1>
                <h2>Room: {this.props.roomId}</h2>
                {this.state.players.map((player,i) => {
                    return(
                        <div>
                            <h3 key={i}>{player.username}</h3>
                        </div>
                    )
                })}
                {this.state.toStoryStart ? <Redirect to="/storystart"/> : ''}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {roomId} = state
    return {roomId}
}
export default connect(mapStateToProps)(HostingMain)