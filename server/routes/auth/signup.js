const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const saltRounds = 10;

router.post("/signup", (req, res, next) => {
    const { email, password, firstName, surname } = req.body;
   
    // Check if email or password or name are provided as empty string 
    if (email === '' || password === '' || firstName === '' || surname === '') {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }
   
    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ messageEmail: 'Provide a valid email address.' });
      return;
    }
    
    // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({ messagePassword: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
      return;
    }
   
   
    // Check the users collection if a user with the same email already exists
    User.findOne({ email })
      .then((foundUser) => {
        // If the user with the same email already exists, send an error response
        if (foundUser) {
          res.status(400).json({ messageUserExists: "User already exists." });
          return;
        }
   
        // If email is unique, proceed to hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
   
        // Create the new user in the database
        // We return a pending promise, which allows us to chain another `then` 
        return User.create({ email, password: hashedPassword, firstName, surname })
      })
      .then((createdUser) => {
        // Deconstruct the newly created user object to omit the password
        // We should never expose passwords publicly
        const { email, _id } = createdUser;
        console.log(email, _id)
        // Create a new object that doesn't expose the password
        const user = { email, _id };

        const payload = { _id, email };
   
          // Create and sign the token
        const authToken = jwt.sign( 
        payload,
        `${process.env.TOKEN_SECRET}`,
        { algorithm: 'HS256', expiresIn: "6h" }
        );
        console.log('authToken', authToken);
          // Send the token as the response
        res.status(200).json({ authToken: authToken, user });
   
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
      });
  });
 

  
module.exports = router;