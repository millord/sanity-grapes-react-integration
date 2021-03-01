const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors')


const app = express();

app.use(cors())
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.static('public'));

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', 'hbs');


// sanity setup 

const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: '39emtu7e',
  dataset: 'production',
  token: 'sk33g0tUW1jEV9CJ5jAnFdoCyH88J2HNbVTMxwsttHIj4tpM6PM8yfCqNgy2bhVLUkgX24fGnsf5NcOsN', // or leave blank to be anonymous user
  useCdn: false // `false` if you want to ensure fresh data
})



var content = {};


app.get('/', (req, res) =>{
  console.log('content', content)
   res.render('home', {
      content:content
  
  });
});

// connect to sanity here

app.post('/create', (req, res) =>{
  console.log(req.body.templateData)
  content = req.body.templateData


  const content = {
    _type: 'templateData',
    html: req.body.templateData.html,
    css: req.body.templateData.css
  }

  // sanity api call 
  
  client.create(content).then(res => {
    console.log(`template was created, document ID is ${res._id}`)
  })


  var fs = require('fs')
fs.writeFile('./public/css/styles.css', req.body.templateData.css, function (err) {
  if (err) {
    // append failed
  } else {
    // done
  }
})
fs.writeFile('./template.html', 
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    ${req.body.templateData.css}
    </style>
  </head>
  <body>
    ${req.body.templateData.html}
  </body>
  </html>`, function (err) {
  if (err) {
    // append failed
  } else {
    // done
  }
})
});






app.listen(8000, () => {
  console.log('The web server has started on port 8000');
});