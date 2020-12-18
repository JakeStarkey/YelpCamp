const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const Campground = require('../models/campground');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>{
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedsDB = async() =>{
    await Campground.deleteMany({});
    for(let i = 0; i <50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251', 
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ad aspernatur sit nostrum praesentium, dignissimos similique, enim mollitia repellat non in deserunt provident dolores distinctio aperiam dolor odio laborum molestiae!',
            price
        });
        await camp.save();
    }
    
}

seedsDB().then(()=>{mongoose.connection.close();})