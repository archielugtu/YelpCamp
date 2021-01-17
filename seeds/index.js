const mongoose = require('mongoose');
const cities = require('./cities'); // imports the cities.js file containing 1000 random cities
const { places, descriptors } = require('./seedHelpers');   // use destructuring to capture places & descriptors data in 'seedHelpers.js' file
const Campground = require('../models/campground'); // imports the campground model

// Connect to the yelp-camp database
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

// Checks if you succesfully/failed to connected to the database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); // check if there is an error
db.once("open", () => {                                           // if it's succesfully connected
    console.log("Database connected");
})


// A function that returns a randomly picked element from the given array
const sample = array => array[Math.floor(Math.random() * array.length)];

// A function that generate seeds of the campgrounds
const seedDB = async () => {
    await Campground.deleteMany({});    // Delete all existing campgrounds in the db
    
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);    // generate a number between 0 to 1000 to use as index for the cities.js
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '5fff74a73a2ff0414927155c',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis repellendus voluptates rerum voluptate illum minima maiores quibusdam quod architecto reprehenderit voluptatem dolor ipsum labore aperiam, veritatis illo at. Praesentium, iure!",
            price: price,
            geometry: { 
                type: "Point", 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [ 
                { 
                    _id: '6000c85f7900b206088f1b05',
                    url: 'https://res.cloudinary.com/dkvdxmg4j/image/upload/v1610794212/YelpCamp/ydk2vditdwlxvnmz42mc.jpg',
                    filename: 'YelpCamp/ydk2vditdwlxvnmz42mc' },
                { 
                    _id: '6000c85f7900b206088f1b06',
                    url: 'https://res.cloudinary.com/dkvdxmg4j/image/upload/v1610664031/YelpCamp/jlxudpe4mahvtugdsr3l.jpg',
                    filename: 'YelpCamp/jlxudpe4mahvtugdsr3l' } 
                ]
        });
        await camp.save();
    }
}

// Runs the seedDB function, and then it closes the mongoose connectioni after
seedDB().then(() => {
    mongoose.connection.close();
})