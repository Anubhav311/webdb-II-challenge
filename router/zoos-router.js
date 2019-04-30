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
        db('zoos')
        .insert(req.body, 'id')
        .then(zoos => {
            res.status(200).json(zoos);
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        res.status(404).json({message: "Please provide name"})
    }
})


router.get('/', (req, res) => {
    db('zoos')
        .then(zoos => {
            res.status(200).json(zoos);
        })
        .catch(err => {
            console.log(err)
        })
})


router.get('/:id', (req, res) => {
    db('zoos')
        .where({id: req.params.id})
        .first()
        .then(zoo => {
            res.status(200).json(zoo);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


router.get('/:id', (req, res) => {
    db('zoos')
        .where({id: req.params.id})
        .first()
        .then(zoo => {
            if(zoo) {
                res.status(200).json(zoo);
            } else {
                res.status(404).json({message: "Zoo not found"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


router.put('/:id', (req, res) => {
    db('zoos')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                  message: `${count} ${count > 1 ? 'records' : 'record'} updated`,
                });
              } else {
                res.status(404).json({ message: 'Role does not exist' });
              }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


router.delete('/:id', (req, res) => {
    db('zoos')
        .where({id: req.params.id})
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                  message: `${count} ${count > 1 ? 'records' : 'record'} deleted`,
                });
              } else {
                res.status(404).json({ message: 'Role does not exist' });
              }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;