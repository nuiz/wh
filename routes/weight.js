var express = require('express');
var router = express.Router();

/* GET weight listing. */
router.get('/', function(req, res, next) {
  io = router.dep.io;
  io.sockets.emit('update_weight', req.query);
  res.json(req.query);
});

module.exports = router;
