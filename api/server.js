const express = require('express');
const helmet = require('helmet');

const zooRouter = require('../router/zoos-router');
const bearsRouter = require('../router/bears-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zooRouter);
server.use('/api/bears', bearsRouter);

module.exports = server;
