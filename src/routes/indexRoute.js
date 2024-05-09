const express = require('express');

var router = express.Router();

const IndexController = require('../controller/indexController');

router
    .get('./index', IndexController.getIndex);

module.exports = router;
