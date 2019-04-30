const knex = require('knex');
const router = require('express').Router();


const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true,
    debug: true
}

const db = knex(knexConfig);

router.post('/', (req, res) => {
    if(req.body.name) {
        db('bears')
        .insert(req.body, 'id')
        .then(bears => {
            res.status(200).json(bears);
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        res.status(404).json({message: "Please provide name"})
    }
})

router.get('/', (req, res) => {
    db('bears')
        .then(bears => {
            res.status(200).json(bears);
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;