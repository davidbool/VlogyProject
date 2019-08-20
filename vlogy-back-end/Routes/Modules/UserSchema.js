const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
mongoose.connect( 'mongodb://localhost:27017/Useres', { useNewUrlParser: true } )
 
const  UserSchema = new Schema({
name: String,
username: String,
password: String,
followers: [[{ type: Schema.Types.ObjectId, ref: 'User' }]],
following: [[{ type: Schema.Types.ObjectId, ref: 'User' }]],
uploads: []
})

const User = mongoose.model(`User`, UserSchema)
module.exports = User
