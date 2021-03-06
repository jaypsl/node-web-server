const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=> {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log', log + '\n' ,(error)=> {
	if(error){console.log('unable to append to server.log')}
});
	next();
});


// app.use((req,res,next) => {
// 	res.render('maintenence.hbs');
// 	next();
// });

hbs.registerHelper('getCurrentYear', ()=> {
	return new Date().getFullYear()

});

hbs.registerHelper('screamIt', (text)=> {
	return text.toUpperCase()
})




app.get('/', (req,res) => {
res.render('home.hbs', {
	pagetitle: 'Home page',
	welcomemessage: 'Welcome to my website'
	

});

});

app.get(('/about'), (req, res) => {
res.render('about.hbs', {
pagetitle: 'About page',


});

});

app.get(('/project'), (req, res) => {
res.render('project.hbs', {
pagetitle: 'Project page',
welcomemessage: 'Welcome to my project page'

});

});


app.get(('/bad'), (req, res) => {
	res.send('unable to fulfill the request, sorry fuck off');
});

app.listen(3000, ()=>{
	console.log(`server is up on ${port}`);
});