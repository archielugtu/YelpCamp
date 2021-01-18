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

## Author
* Rchi Lugtu
## Future Scope
* Allow user to edit account information
* Add pagination or infinite scrolling
