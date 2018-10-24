import React, {Component} from 'react'
import CanvasDraw from 'react-canvas-draw'

class DrawingComponent extends Component {

    render(){
        return(
            <div>
                <CanvasDraw brushSize={6} brushColor={"#444"} canvasWidth={400} canvasHeight={400}
                disabled={false}/>
            </div>
        )
    }
}
export default DrawingComponent