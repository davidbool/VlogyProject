const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const upload = require('./Modules/Video')
const Grid = require('gridfs-stream');
const User = require('./Modules/UserSchema')
const createFeed = require('./CreateFeed')

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
    let video = {name: req.file.filename, date: req.file.uploadDate}
    User.find({name: "david"}, function(err, docs){
        docs[0].uploads.push(video)
        docs[0].save()
    })
    // res.json({ file: req.file });
    res.end()
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
router.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.end();
    });
  });


module.exports = router
