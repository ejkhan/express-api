const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());


const recipies = [
    { id: 1, name: 'recipie1'},
    { id: 2, name: 'recipie2'},
    { id: 3, name: 'recipie3'},
];

//Route to all the /
app.get('/', (req, res) => {
    res.send('Hello Browser');
});

//Route to GET all recipeis
app.get('/api/recipies', (req, res) => {
    res.send(recipies);
});

//Route to POST
app.post('/api/recipies', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required
    };

    const result = Joi.validate(req.body, schema);
    
    if(result.error) {
        res.status(400).send(result.error);
    }
    
    const recipie ={
        id: recipies.length + 1,
        name: req.body.name
    };
    recipies.push(recipie);
    res.send(recipie);
});


//Route GET a specific recipie
app.get('/api/recipies/:id', (req, res) => {
    const recipie = recipies.find(c => c.id === parseInt(req.params.id));
    if(!recipie) res.status(404). send('The recipie with the given ID is not found');
    res.send(recipie);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));