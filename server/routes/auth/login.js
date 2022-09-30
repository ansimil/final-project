const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// POST  /auth/login
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
   
    // Check if email or password are provided as empty string 
    if (email === '' || password === '') {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }
   
    // Check the users collection if a user with the same email exists
    User.findOne({ email })
      .then((foundUser) => {
      
        if (!foundUser) {
          // If the user is not found, send an error response
          res.status(401).json({ message: "User not found." })
          return;
        }
   
        // Compare the provided password with the one saved in the database
        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
   
        if (passwordCorrect) {
          // Deconstruct the user object to omit the password
          const { _id, email, isAdmin, firstName, wishlist} = foundUser;
          
          // Create an object that will be set as the token payload
          const payload = { _id, email, isAdmin, firstName, wishlist };
   
          // Create and sign the token
          const authToken = jwt.sign( 
            payload,
            `${process.env.TOKEN_SECRET}`,
            { algorithm: 'HS256', expiresIn: "6h" }
          );
        console.log('authToken', authToken);
          // Send the token as the response
          res.status(200).json({ authToken: authToken });
        }
        else {
          res.status(401).json({ message: "Your email or your password is incorrect" });
        }
   
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));


});

module.exports = router;