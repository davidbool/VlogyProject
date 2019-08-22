const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const upload = require('./Modules/Video')
const Grid = require('gridfs-stream');
const User = require('./Modules/UserSchema')
const createFeed = require('./CreateFeed')


//get user by username
router.get('/user/:username', (req,res) =>{
  User.findOne({username: req.params.username}, (err, doc) =>{
    res.send(doc)
  })
})

//updates base user data
router.put('/updateUser', (req, res) => {
  User.findOne({username: req.body.username}, function(err,doc){
    doc[req.body.prop] = req.body.data
    doc.save(function(err){res.send(err)})
  })
})

//input: username, videoId, comment 
//save the comment in the user DB in the uploads array
router.put('/addComment', (req, res) =>{ 
  User.findOne({name: req.body.name}, function(err, doc){
    let newArr = [...doc.uploads]
    let index = newArr.findIndex(x => x.videoId == req.body.filename)
    newArr[index].comments.push(req.body.comment)
    doc.uploads = []
    newArr.forEach(v => doc.uploads.push(v))
    doc.save(function(err){res.send(err)})
  })
})

router.put('/uploadVideo', (req, res) =>{
  User.findOne({username: req.body.username}, function(err, doc){
    let date = new Date()
    doc.uploads.push({
      videoId: req.body.filename,
      date: date,
      likes: 0,
      comments: []
    })
    doc.save(function(err){res.end()})
  })
})

router.get('/users', (req, res) =>{ //gets all the users
  User.find({}, function(err, docs){
    res.send(docs)
  })
})
router.get('/feed', (req, res) =>{
  User.find({}, function(err, docs){
    let videos = []
    for(let d of docs){
      for(let v of d.uploads){
        videos.push({
          id: v.videoId,
          user: d.name,
          likes: v.likes,
          comments: v.comments
        })
      }
    }
    res.send(videos)
  })
})

//cheks if the exists
router.get('/username/:username/password/:password', (req, res) =>{
  User.find({username: req.params.username, password: req.params.password}, function(err, docs){
    res.send(docs)
  })
})


router.post('/newUser', (req, res) => { //adds a new user
    let data = req.body
    let user = new User({
      username: data.username,
      password: data.password,
      name: data.name,
      DOB: data.DOB
    })
    user.save(function(err){res.end()})
  });


// Mongo URI
const mongoURI = 'mongodb://localhost:27017/uploads';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// @route POST /upload
// @desc  Uploads file to DB
router.post('/upload', upload.single('file'), (req, res) => {
    res.send(req.file.filename)
  });

// @route GET /files
// @desc  Display all files in JSON
router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    // Files exist
    return res.json(files);
  });
});


// @route GET /Video/:filename
// @desc Display Video
router.get('/video/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // Check if video
    if (file.contentType === 'video/mp4') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an video'
      });
    }
  });
});


// @route DELETE /files/:id
// @desc  Delete file
router.delete('/files/:id/:username', (req, res) => {
  User.findOne({username: req.params.username}, (err, doc) =>{
    let i = doc.uploads.findIndex(v => v.videoId == req.params.id )
    doc.uploads.splice(i,1)
    doc.save()
  })
  gfs.remove({ filename: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    res.end();
  });
});

//delete comments from the User BD
router.delete('/comments', (req, res) =>{
  User.findOne({name: req.body.name}, function(err, doc){
    let newArr = [...doc.uploads]
    let index = newArr.findIndex(x => x.videoId == req.body.videoId)
    let i = newArr[index].comments.findIndex(c => c == req.body.comment)
    newArr[index].comments.splice(i,1)
    doc.uploads = []
    newArr.forEach(v => doc.uploads.push(v))
    doc.save(function(err){res.send(err)})
  })
})

module.exports = router
