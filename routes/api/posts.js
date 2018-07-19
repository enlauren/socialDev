const express = require('express');
const router = express.Router();



//@oute             GET api/posts/test
// @description     Tests post route
// @access          public
router.get('/test', (req, res)=>res.json({msg: "posts works"}));


module.exports = router;