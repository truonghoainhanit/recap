var Tesseract = require('tesseract.js')
var express = require('express');
var app = express();
var cloudscraper = require('cloudscraper');
var request = require('request')
var fs = require('fs')


app.listen(process.env.PORT || 8080);
app.get('/recap', (req, res) => {
  
  cloudscraper.request({method: 'GET',
                      url:req.query.url,
                      encoding: null,
                      }, function(err, response, body) {
                      //body is now a buffer object instead of a string
                      //console.log(body);
                      // console.log(response);
                      
                      var filename = Date.now() + '.png';
                      
                      fs.writeFile(filename, body,  "binary",function(err) {
    if(err) {
        console.log(err);
    } else {
         Tesseract.recognize(filename)
  .then(function(result){
       res.send(result.text);
       console.log('Capcha is: ' +result.text);
  })
        
    }
});
});

});
