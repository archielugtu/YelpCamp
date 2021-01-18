# YelpCamp
YelpCamp is created for people to explore, share, and review campgrounds from all around the world.
## Live Demo
* Click on this link [here](https://yelpcampsites.herokuapp.com/)
## Prerequisites
* Account in MongoDB (For storing the user data) https://www.mongodb.com
* Account in Cloudinary (For uploading files and images) https://cloudinary.com
## Installation
* Install project dependencies
```
    npm install
```
* Run the app (this runs on localhost:3000)
```
    npm start
```
## Technologies Used
* **Front End**: HTML, CSS, Bootstrap, EJS
* **Back End**: NodeJS, ExpressJS, MongoDB, Mongoose, PassportJS, Joi, 
## Project Key Features
* **Cluster Map** - Campgrounds cluster displayed on map, clickable map marker, map controls (CTRL + Click on map and drag to tilt map)
* **Campground** -  Create, Read, Update, Delete campgrounds (CRUD)
* **Feedback** -  Create, Read, Update, Delete feedbacks (CRUD)
* **User** - Register, Login, Logout
  * Creator role - Can edit or delete created campground information
  * Viewer role - Can leave feedback on campgrounds
* **Authentication & Authorization** - user has to be logged in to create campgrounds and feedbacks. Only campground owner can edit campground details
## Screenshots

<img width="1673" alt="Landing Page" src="https://user-images.githubusercontent.com/38335606/57000991-1c2e9b80-6b6b-11e9-9222-f4d5ee390843.png">

<img width="1670" alt="Home Page" src="https://user-images.githubusercontent.com/38335606/57000992-1c2e9b80-6b6b-11e9-8419-5385f6481d86.png">

<img width="1674" alt="Campground Page" src="https://user-images.githubusercontent.com/38335606/57000993-1c2e9b80-6b6b-11e9-833e-2e0b2f611215.png">

## Author
* Rchi Lugtu
## Future Scope
* Allow user to edit account information
* Add pagination or infinite scrolling
