let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();
let PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// DATA =====================================================
var characters = [{
        routeName: "yoda",
        name: "Yoda",
        role: "Jedi Master",
        age: 900,
        forcePoints: 2000
    }, {
        routeName: "darthmaul",
        name: "Darth Maul",
        role: "Sith Lord",
        age: 200,
        forcePoints: 1200
    }, {
        routeName: "obiwankenobi",
        name: "Obi Wan Kenobi",
        role: "Jedi Knight",
        age: 60,
        forcePoints: 1350
}];

// ROUTES ===================================================

app.get('/', function(req, res) {
    // res.send('welcome to the star wars page.');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Route
app.get('/api/characters', function(req, res) {
    return res.json(characters);
});


app.get('/api/characters/:character', function(req, res) {
    // Make a Sequelize call to db to get yoda, etc.
    let chosen = req.params.character;

    for (var i=0; i < characters.length; i++) {
        if (chosen == characters[i].routeName) {
            return res.json(characters[i]);
        }
    }
    // console.log(chosen);
    // res.json(characters);
    return res.send('no character found');
    // res.json(chosen);
    res.end();
    // res.json(chosen);
});

// Create new characters
app.post('/api/characters', function(req, res) {
    let newcharacter = req.body;
    // body parser parses the body for us
    characters.push(newcharacter);
    res.json(newcharacter);
    console.log(newcharacter);
});

app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});