import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class StoryStart extends Component {
    constructor(){
        super()
        this.state = {
            toFirstQuestion: false
        }
    }

    skipStory(){
        this.setState({
            toFirstQuestion: true
        })
    }

    render(){
        return(
            <div>
                <h1>Lots of story or something happens here</h1>
                <button onClick={()=>{this.skipStory()}}>Skip</button>
                {this.state.toFirstQuestion ? <Redirect to="/multiplechoice"/> : ''}
            </div>
        )
    }
}
export default StoryStart