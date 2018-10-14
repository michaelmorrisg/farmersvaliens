import React, {Component} from 'react'
import {connect} from 'react-redux'

class HostingMain extends Component {


    render(props){
        return(
            <div>
                <h1>Hosting Main</h1>
                <h2>Room: {this.props.roomId}</h2>
            </div>
        )
    }
}
function mapStateToProps(state){
    const {roomId} = state
    return {roomId}
}
export default connect(mapStateToProps)(HostingMain)