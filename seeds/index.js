const Campground = require('../models/campground');
const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers')

//'mongodb://localhost:27017/yelp-camp'
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const c = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente rem iure debitis at sit consequatur atque a. Et culpa, ipsam aspernatur temporibus laudantium tempora sequi qui fugit porro. Quibusdam, dicta!',
            price,
            author: '600e637e6ddc060015081d0a',
            images: [
                {
                    "url": "https://res.cloudinary.com/yelpcampimgs/image/upload/v1611079886/Yelpcamp/rlie4d3bksjzatnygpsv.jpg",
                    "filename": "Yelpcamp/rf9sqipofpxsw3dqzwcj"
                },
                {
                    "url": "https://res.cloudinary.com/yelpcampimgs/image/upload/v1611079885/Yelpcamp/r9o8rrw25aq1hu3rjhch.jpg",
                    "filename": "Yelpcamp/rmfniicawwe8wobz7uen"
                },
            ],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        });
        await c.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database Disconnected')
})