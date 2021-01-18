# YelpCamp
YelpCamp is created for people to explore, share, and review campgrounds from all around the world.
## Getting Started
Following instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See deployment for notes on how to deploy the project on a live system. Also you can visit the link in order to see the live demo.
## Prerequisites
* Account in Cloud9-IO (For online IDE) https://c9.io
* Account in MongoDB (For storing the user data) https://www.mongodb.com
* Account in Cloudinay (For uploading files and images) https://cloudinary.com
## Installing
* After downloading the project open it in Cloud9-IO.
* In order to run the code you must have the following dependencies first.
  * async, body-parse, body-parser, cloudinary, connect-flash, dotenv, ejs, express, express-session, image-size, imagemagick, 
 method-override, moment, mongoose, multer, node-geocoder, nodemailer, passport, passport-local, passport-local-mongoose, promise
 request, 
* If not the do the following in c9 terminal
```
    * npm init
    * npm install "whichever is not present" --save eg. npm install express body-parser dotenv --save
```
* To run any one of this
```
    * node app.js 
    * nodemon app.js (first use npm install nodemon -g)
    * nodemon (first use npm install nodemon -g)
```
## Technologies Used
* Front End: HTML, CSS, Bootstrap
* Back End: NodeJS, NPM, ExpressJS, REST, PassportJS, MongoDB
## Project Module
* Campground -  Create Campground, Read Campground, Update Campground, Delete Campground
* Comment -  Create Comment, Read Comment, Update Comment, Delete Comment
* Review -  Create Review, Read Review, Update Review, Delete Review
* User - SignUp, Login, Reset Password, Update Profile
  * User With Admin Code - can update or delete other user campgrounds, comments and reviews
  * User Without Admin Code - can only update or delete it's campgrounds, comments and reviews
## Constraint
* User can upload only upto 5 image per campground.
* Total size combined of all image must be less than 20 MB.
* User must upload image from [unsplash.com](http://unsplash.com).
* No create, update and delete option without login in to website.
* Only one review per user per campground.
## Live Demo
* Please visit this [heroku link](http://powerful-wildwood-83904.herokuapp.com)
## ScreenShot

<img width="1673" alt="Landing Page" src="https://user-images.githubusercontent.com/38335606/57000991-1c2e9b80-6b6b-11e9-9222-f4d5ee390843.png">

<img width="1670" alt="Home Page" src="https://user-images.githubusercontent.com/38335606/57000992-1c2e9b80-6b6b-11e9-8419-5385f6481d86.png">

<img width="1674" alt="Campground Page" src="https://user-images.githubusercontent.com/38335606/57000993-1c2e9b80-6b6b-11e9-833e-2e0b2f611215.png">

## Author
* Shubham Patel
## Future Scope
* Get notification if some user add new campground or get notification when someone add comment or review on your created campground (currently working on it)
