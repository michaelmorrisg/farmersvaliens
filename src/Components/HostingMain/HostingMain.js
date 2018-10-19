import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3020")

class HostingMain extends Component {
    constructor(){
        super()
        this.state = {
            players: []
        }

        socket.on('add-player', ()=>{
            console.log('im hit!')
            axios.get(`/api/getplayers/${this.props.roomId}`).then(res => {
                console.log(res.data)
                this.setState({
                    players: res.data
                })
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
                {this.state.players.map(player => {
                    return(
                        <div>
                            <h3>{player.username}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {roomId} = state
    return {roomId}
}
export default connect(mapStateToProps)(HostingMain)