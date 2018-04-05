
var express = require('express');
var request = require('request');
var fs = require('fs')
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const merge_video =  function(){
    //while((this.go_a == false) && (this.go_b == false))
      //  ;
    // wait for video downloads to finish
    // todo: qualify that video files are valid before starting to process them


    var proc = ffmpeg('file_a.mp4')
      .input('file_b.mp4')
    //.input(fourthFile)
    //.input(...)
    .on('end', function() {
      console.log('files have been merged succesfully');
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
    })
    .mergeToFile('out.mp4');


    
}

const process_video = function(path1, path2){
    //'use strict';
    //todo: make sure that path1 and path2 are not the same the string 
    //todo: handle invalid pathways 
    //since we use request.get we should be able to handle access token as required by the spec
    //todo adopt uuid in filenames to support concurrent processing of the script from multiple users
    // this.go_a = false;  // when stream a is finished downloading set to true
    // this.go_b = false;  // when stream b is finished downloading set to true
    // hopefully strict mode prevents this.go_a from being a global, but i need to test it more
    /* var stream_a = request(path1).pipe(fs.createWriteStream('file_a.mp4'))
    var stream_b = request(path2).pipe(fs.createWriteStream('file_b.mp4'))
    stream_a.on('finish', function(){
        this.go_a = true; 
     }.bind(this));
    stream_b.on('finish',function(){
        this.go_b = true; 
    }.bind(this))
    */

    request(path1).pipe(fs.createWriteStream('file_a.mp4'))
    request(path2).pipe(fs.createWriteStream('file_b.mp4'))



    // if stream_a event callback and stream_b event callback fineshes slower than downloads, that's a race condition.
    // some risk, but highly unlikely as downloads will almost always be slower than event callback decleration. 
    // should still be thought about in a production system... okayish for mvp
    // or take home code exam ;) o:)
    merge_video()


}


router.post('/',  function(req, res, next){
    
    console.log(req.body)
    process_video(req.body.video1,req.body.video2);

}); 

module.exports = router;
