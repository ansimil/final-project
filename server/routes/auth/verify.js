const router = require("express").Router();
const { isAuthenticated } = require('../../middleware/jwt.middleware');

router.get('/verify', isAuthenticated, (req, res, next) => {  
    //console.log(`req.payload`, req.payload);
    res.status(200).json(req.payload);
  });

  module.exports = router;