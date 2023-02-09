const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();
    let lasagnaRecipe = await Recipe.create({ title: 'Lasagna', cuisine: 'Italian'})
    console.log(lasagnaRecipe.title);
    await Recipe.insertMany(data);
    let allRecipes = await Recipe.find();
    allRecipes.forEach((element) => console.log(element.title));
    await Recipe.findOneAndUpdate( {title: 'Rigatoni alla Genovese'}, {duration: 100}, console.log('Rigatoni: duration updated!') );
    await Recipe.deleteOne({ title: 'Carrot Cake' }, console.log('Carrot Cake deleted'));
/*     if (await Recipe.findOne({ title: 'Carrot Cake' }) === {}) console.log('Carrot Cake successfully deleted')
    else console.log('nope'); */

    mongoose.disconnect();

  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
