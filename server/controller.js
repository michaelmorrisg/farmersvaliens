module.exports = {
    hostGame: (req,res) => {
        const db = req.app.get('db')
        db.find_game({roomId:req.body.roomId}).then(response => {
            if(response[0]){
                res.status(200).send('room exists')
            } else {
                db.host_game({roomId:req.body.roomId}).then(response => {
                    res.status(200).send('created')
                })
            }
        })
    }
}