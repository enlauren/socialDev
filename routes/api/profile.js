const express = require('express');
const router = express.Router();





//@oute             GET api/profile/test
// @description     Tests profile route
// @access          public
router.get('/test', (req, res)=>res.json({msg: "profile works"}));


module.exports = router;