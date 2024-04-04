const express = require('express');
const app = express();

// Import the path module to construct the absolute path to the static assets folder
const path = require('path');

// Construct the absolute path to the static assets folder using the `path.join()` method
const pathToDistFolder = path.join(__dirname, '..', 'path', 'to', 'frontend', 'dist');

// Create the middleware function for serving static assets
const serveStatic = express.static(pathToDistFolder);

// Use the middleware function to serve static assets
app.use(serveStatic);

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next(); // Passes the request to the next middleware/controller
};

app.use(logRoutes);

// controllers
const serveIndex = (req, res, next) => {
    //sends html response with an html file
    res.sendFile(__dirname + '/index.html');
  }

  const serveFunFact = (req, res, next) => {
    //sends html response with raw html
    res.send("<h3>Kellyne's favorite color is turquoise</h3>");
  }

  const serveGreeting = (req, res, next) => {
    //sends a data response
    const greeting = req.query.greeting || "hello"
    res.send(`Kellyne says ${greeting}!`);
  }

  const serveData = (req, res, next) => {
    //sends a data response
    const data = [{ name: 'Kellyne' }, { age: '19' }, { friends: ["Leah", "Mikayla"] }];
    res.send(data);
  }
  
  // endpoints
  app.get('/', serveIndex);
  app.get('/about', serveFunFact);
  app.get('/api/greeting', serveGreeting);
  app.get('/api/data', serveData);

// listen
const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`)); 









// // Middleware function for logging route requests
// const logRoutes = (req, res, next) => {
//     const time = new Date().toLocaleString();
//     console.log(`${req.method}: ${req.originalUrl} - ${time}`);
//     next(); // Passes the request to the next middleware/controller
//   };
  
//   // Controller function for serving a hello message
//   const serveHello = (req, res, next) => {
//     const name = req.query.name || "stranger";
//     res.send(`Hello, ${name}!`);
//   };
  
//   // Register the logRoutes middleware globally to log all requests
//   app.use(logRoutes);
  
//   // Register the serveHello controller for the /api/hello route
//   app.get('/api/hello', serveHello);