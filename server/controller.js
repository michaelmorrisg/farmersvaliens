module.exports = {
    hostGame: (req,res) => {
        const db = req.app.get('db')
        db.host_game({roomId:req.body.roomId})
    }
}