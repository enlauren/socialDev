const express = require('express');
const router = express.Router();




//@oute             GET api/users/test
// @description     Tests users route
// @access          public
router.get('/test', (req, res)=>res.json({msg: "users works"}));


module.exports = router;