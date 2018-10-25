import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './WelcomeUser.css'

class WelcomeUser extends Component {


    render(){
        return(
            <div className="WelcomeUser-main">
            <div>
                <h1>Abducted</h1>
                <div className="welcomeuser-content">
                    <div>
                        <Link to="/host"><button>Host Game</button></Link>
                    </div>
                    <div>
                        <Link to="/join"><button>Join Game</button></Link>
                    </div>
                </div>
                <div id="moon-div">
                    <img id="moon" src={require('../../Assets/Moon.png')}/>
                </div>
                <div className="house-wrapper">
                    <div className="chimney"></div>
                    <div className="roof"></div>
                    <div className="main-floor">
                        <div className="left-window" id="on"></div>
                        <div className="kitchen-left" id="kitchen-on"></div>
                        <div className="kitchen-right" id="kitchen2-on"></div>
                    </div>
                </div>
                <div className="corn-main">
                <img id="corn" src={require('../../Assets/corn.png')}/>
                <img id="corn" src={require('../../Assets/corn.png')}/>
                <img id="corn" src={require('../../Assets/corn.png')}/>
                <img id="corn" src={require('../../Assets/corn.png')}/>
                <img id="corn" src={require('../../Assets/corn.png')}/>
                </div>
                <div className="WelcomeUser-ground"></div>
                </div>
            </div>
        )
    }
}
export default WelcomeUser