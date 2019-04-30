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

router.get('/:id', (req, res) => {
    db('bears')
        .where({id: req.params.id})
        .first()
        .then(bear => {
            if(bear) {
                res.status(200).json(bear);
            } else {
                res.status(404).json({message: "Bear not found"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


module.exports = router;