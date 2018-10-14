import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class WelcomeUser extends Component {


    render(){
        return(
            <div>
                <h1>WelcomeUser</h1>
                <div className="welcomeuser-content">
                    <div>
                        <Link to="/host"><button>Host Game</button></Link>
                    </div>
                    <div>
                        <Link to="/join"><button>Join Game</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default WelcomeUser