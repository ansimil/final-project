const router = require("express").Router();
const { isAuthenticated } = require('../../middleware/jwt.middleware');

router.get('/verify', isAuthenticated, (req, res, next) => {       // <== CREATE NEW ROUTE
 
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and made available on `req.payload`
    console.log(`req.payload`, req.payload);
   
    // Send back the object with user data previously set as the token payload
    res.status(200).json(req.payload);
  });

  module.exports = router;