var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.json({msg:'response from GET /user'});
});
/* CREATE new User */
router.post('/',function(req,res){
        res.json({msg:'response from POST /user'});
});

/* GET a user with id */
router.get('/:id', function(req, res) {
  res.json({msg:'response from GET /user/:id'});
});

/* UPDATE user with id */
router.put('/:id', function(req, res) {
  res.json({msg: 'response from PUT /user/:id'});
});

router.delete('/:id',function(req,res){
  res.json({msg: 'response from DELETE /user/:id'});
});

module.exports = router;
