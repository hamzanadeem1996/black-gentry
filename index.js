const express = require('express')
const app = express()


const Users = require('../TinderApp/models').Users
const Otp = require('../TinderApp/models').Otps

const Sequelize = require('sequelize')
const Op = Sequelize.Op

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)

console.log("Server running on 3000");

//socket.io instantiation
const io = require("socket.io")(server)



//checking user

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	// socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        Users.findOne({
            where: {
              email: data.username,
            //   otp: data.otp
            },
            include: {
                model: Otp,
                as: 'otpOfUser'
              }
          }).then(user => {
            if(user){

              socket.username = data.username
              console.log("Logged in")
                  //listen on new_message
              socket.on('new_message', (data) => {
                //broadcast the new message
                io.sockets.emit('new_message', {message : data.message, username : socket.username});
  })
            }
            else{
              console.log("Not Logged in")
            }            
          }).catch(err => {
               console.log("Not logged in") 
               consol.log("Error is........."+err)
          })
    })



    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})