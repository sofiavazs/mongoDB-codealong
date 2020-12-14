import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

//Code for connection 
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/books";
mongoose.createConnection(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

//Defining models 

const Author = mongoose.model('Author', { 
  name: String
}); 

const seedDatabase = async () => { 
  const tolkien = new Author({ name: 'J.R.R Tolkien' })
  await tolkien.save()

  const rowling = new Author({ name: 'J.K. Rowling'})
  await rowling.save()
}; 
seedDatabase()

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (required, response) => {
  response.send('Hello world')
});

app.get('/authors', async (required, response) => {
   const authors = await Author.find()
   response.json(authors)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
