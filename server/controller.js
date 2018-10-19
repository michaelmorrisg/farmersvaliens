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
    },
    joinGame: (req,res) => {
        const db = req.app.get('db')
        db.find_game({roomId:req.body.roomId}).then(response => {
            if(!response[0]){
                res.status(200).send('room not found')
            } else {
                db.add_player({roomId:req.body.roomId, username:req.body.username}).then(response => {
                    res.status(200).send('user created')
                })
            }
        })
    }, 
    getPlayers: (req,res) => {
        const db = req.app.get('db')
        db.get_players({roomId: req.params.roomId})
            .then(response => {
                res.status(200).send(response)
            })
    }
}