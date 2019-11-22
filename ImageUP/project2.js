/** 
 * CS7025 Programming for Digital Media 2018-19 
 * Elena Artz
 * Project No. 2: An Image Sharing Application 
 */

"use strict";

//port configuration
const port = 3000;

// required modules
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload= require("express-fileupload");
const session = require("express-session");
const mysql = require("mysql");

//express app
const app = express();

// == Database ==================================================================
// configure database connection
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Time1995Lord!",
  database: "imageshare",
  });

// connect to the Database
connection.connect(function (err) {
  if (err) {
    console.log("Error connecting to Database: " + err);
  } else {
    console.log("Successfully connected to Database");
  }
});
// ==============================================================================

// configure static dir  
app.use(express.static("files"));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());


//Express Session Middleware ----------------------------------------------------
app.use(session(
{
  secret: 'ssshhhhhttt',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 3600000}
})
);

//set global session var
app.use(function (request, response, next) {
  response.locals.username = request.session.username;
  response.locals.currentUserID = request.session.currentUserID;
  next();
});

//------------------------------------------------------------------------------
//Load View Engine
app.set('view engine', 'ejs');
app.set('views', 'templates');


//== Routes ================================================================================================================
//Home  (index)
app.get('/', function (request, response) {
  var images;
  
  //Query
  var sql =  "SELECT * FROM image"; 

  connection.query(sql, function(err, results) {
   if (err) {
    response.send("A database error occurred: "+err);
    console.log(err);
   }else{
      if(results.length> 0){
         images=results;
       }else{
         images="";
      }
      //console.log(images);
      response.render('index.ejs', {currentUser: request.session.username,  images:images});
    }
 }); 
});

//authentification 
//login ------------------------------------------------------------------------------------------------------------------
app.post('/login', function(request,response){
    var username = request.body.username;
    var password = request.body.password;  

    //Query  
    var sql = "SELECT * FROM user WHERE username = '" + username + "'AND password = '" + password + "'";
   
   connection.query(sql, function(err, results) {
   if (err) {
       response.send("A database error occurred: "+err);
   } else {         
          if (results.length > 0) {  
           var username = results[0].username;
           request.session.username = username;
           request.session.currentUserID = results[0].userID;
           response.render("profile.ejs", { "username": username, results:results});              
       } else {
           response.send("Wrong username or password. Please try again.");
       }
     }
  });
});


//register --------------------------------------------------------------------------------------------------------------
app.post('/register', function(request,response){
  
  //Query
   var input= "INSERT INTO user set ?";
  
  var newUser =   {
    "username": request.body.set_username,
    "firstname":request.body.firstname,      
    "surname":request.body.lastname,
    "email":request.body.email,
    "password":request.body.set_password  
  }
 
  connection.query(input, newUser, function(err, results) {
     if (err) {
        response.send("An account with this username or email address already exists. Please try again.");
        console.log(err);
     } else {
        response.send('You are successfully registered and can log in now');
    }
  });
});



//profile --------------------------------------------------------------------------------------------------------------
app.get('/profile', function(request,response){
  
  //Query
  var sql = "SELECT * FROM user WHERE username = '" + request.session.username + "'";

  if (request.session.username){
    connection.query(sql, function(err, results) {
      if (err) {
        response.send("A database error occurred: "+err);
      } else {        
          response.render('profile.ejs', {username:request.session.username, results:results});
        }
    });
  }
});


//upload Images --------------------------------------------------------------------------------------------------------
app.get('/uploads', function (request, response) {
   response.render("uploads.ejs",{username: request.session.username});
 });

app.post("/upload", function(request, response){
   var file = request.files.profileImage;

//store image in database
  var input="INSERT INTO image set ?";
  
//rename file
  var renamedFile= Date.now() + "_" + request.session.currentUserID + "_" + file.name;

  var newImage =   { 
      "imgTitle":request.body.imageTitle,
      "path":'uploads/',
      "filename": renamedFile,
      "userID": request.session.currentUserID
      };

    console.log(file);
     file.mv("files/uploads/"+renamedFile);
     connection.query(input, newImage, function(err, results) {
      if (err) {
         response.send("Upload failed. Please Try again.");
           console.log("A database error occurred: "+err);
      }else{
        response.send("Upload was successful");
      }
          
    });
});

//image Details --------------------------------------------------------------------------------------------------------
app.get("/images/:id", function(request,response){
  var currentUser =  request.session.username;
  var currentUserID = request.session.currentUserID;
  var currImg = request.params.id;
  var result_q1, result_q2;
  var imgliked = false;

  //Queries
  var sql =  "SELECT i.uploadDate, i.imgTitle, i.path, i.filename, u.username, i.numlikes, i.numComments FROM image i INNER JOIN user u ON  i.userID = u.userID  WHERE  i.imgID = '" + currImg +"'" ;
  var sql1 = "SELECT c.date, c.imgID, c.userID, c.text, u.username, c.commentID FROM comments c INNER JOIN user u ON c.userID = u.userID WHERE c.imgID = '" + currImg +"'";
  var sql2 = "SELECT * FROM likes WHERE imgID = '" + currImg +"'" + "AND userID='" + currentUserID + "'";

  //check if image is already liked by user
  connection.query(sql2, function(err,results){
    if(err){
      response.send("A database error occurred: " + err);
    }else{
      if(results.length == 1){
        imgliked = true;
      }else{
        imgliked = false;
      }
    }
  }); 

  //image infos
  connection.query(sql, function(err,results){ 
       if (err) {
            res.send("A database error occurred: "+err);
        } else {
            if (results.length == 1){
               result_q1 = results;
               displayOfComments();
            } 
        }
    });

  //display the comments for the image
 function displayOfComments(){
  connection.query(sql1, function(err, results){
     if (err){
       response.send("A database error occurred: "+err);
     } else{
       if (results.length > 0){  
        result_q2 = results; 
        commentsOfusers();
        } else{
          if (currentUser){
            response.render("details.ejs", {
              login: true,
              currentUser: currentUser, 
              currImg: currImg,
              path: result_q1[0].path + result_q1[0].filename, 
              datetime: result_q1[0].uploadDate.toISOString().slice(0, 19).replace('T', ' '),
              title: result_q1[0].imgTitle,
              likes: result_q1[0].numlikes,
              comments: result_q1[0].numComments,
              username: result_q1[0].username,
              liked: imgliked,
              commentsList: ""
            });
            
          }else{
            response.render("details.ejs", {
              login: false,
              currentUser: currentUser, 
              currImg: currImg,
              path: result_q1[0].path+result_q1[0].filename, 
              datetime: result_q1[0].uploadDate.toISOString().slice(0, 19).replace('T', ' '),
              title: result_q1[0].imgTitle,
              likes: result_q1[0].numlikes,
              comments: result_q1[0].numComments,
              username: result_q1[0].username,
              liked: imgliked,
              commentsList: ""
            });
          }
      }
    }
 });
}

  function commentsOfusers(){
    if(currentUser){
      response.render("details.ejs",{
        login: true,
        currentUser: currentUser, 
        currImg: currImg,
        path: result_q1[0].path + result_q1[0].filename, 
        datetime: result_q1[0].uploadDate.toISOString().slice(0, 19).replace('T', ' '),
        title: result_q1[0].imgTitle,
        likes: result_q1[0].numlikes,
        comments: result_q1[0].numComments,
        username: result_q1[0].username,
        liked: imgliked,
        commentsList: result_q2
      });
    }else{
      response.render("details.ejs",{
        login: false,
        currentUser: currentUser,  
        currImg: currImg,
        path: result_q1[0].path + result_q1[0].filename, 
        datetime: result_q1[0].uploadDate.toISOString().slice(0, 19).replace('T', ' '),
        title: result_q1[0].imgTitle,
        likes: result_q1[0].numlikes,
        comments: result_q1[0].numComments,
        username: result_q1[0].username,
        liked: imgliked,
        commentsList: result_q2
      });
    }
  }
});

//likes ----------------------------------------------------------------------------------------------------------------
app.post('/likes', function(request,response){
  var likes = request.body.likes;
  var currImg = request.body.id;
  var currentUserID =request.session.currentUserID;
  
  var newLike = {
    "userID":currentUserID,
    "imgID":currImg
     };

  //Queries
  var sql= "SELECT * FROM likes WHERE userID ='"+ currentUserID + "' AND imgID ='" + currImg +"'";
  var update = "UPDATE image set numlikes = numlikes + 1 WHERE imgID = '" + currImg + "'";
  var input = "INSERT INTO likes set ?"; 
 
  if (currentUserID != undefined){
    checkLikes();
    function checkLikes(){
      connection.query(sql, function(err, results){
        if(err){
        response.send("A database error occurred: " + err);
      }else{
        if (results.length < 1){
          updateLikes();
        }
      }
    });
  }

  //update number of Likes for image
  function updateLikes(){
    connection.query(update, function(err, results){
      if(err){
        response.send("A database error occurred: " + err);
      }else{
        addLike();
      }
    });
  }

  //add like to table 
    function addLike(){
      connection.query(input, newLike, function(err, results){
        if(err){
          response.send("A database error occurred: " + err);
        }else{
          var allLikes = parseInt(likes) + 1;
          //console.log(allLikes);
          response.json(allLikes.toString()); 
        } 
      });
    }
  }
});


//comment ----------------------------------------------------------------------------------------------------------------
app.post('/comment', function(request,response){
  var currImg = request.body.id;
  var currentUserID= request.session.currentUserID;

  //Queries
  var input = "INSERT INTO comments set ?";
  var update = "UPDATE image SET numComments = numComments + 1 WHERE imgID = '"+currImg+"'";
  var comment = request.body.comment;
 
    var newComment =   {
      "text": comment,
      "userID":currentUserID,    
      "imgID":currImg
    }

  if (currentUserID){
    if(comment !== ''){
      connection.query(input, newComment, function(err, results) {
      if(err){
        response.send("A database error occurred: " + err);
      }else{
        addComment();
      }
    });
   }

    function addComment(){
      connection.query(update, function(err, results) {
        if(err){
          response.send("A database error occurred: " + err);
        }else{
           response.json(comment); 
        }
      }) 
    }
  }
});


//logout ----------------------------------------------------------------------------------------------------------------
app.get('/logout', function(request,response){
    request.session.destroy();
    response.redirect('/');
});


// == listen on a port + message =======================================================================================
app.listen(port, function () {
    console.log('Magic is happening now on port 3000!');
});