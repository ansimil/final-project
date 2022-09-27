const router = require("express").Router();
const User = require("../models/User")

router.get("/", (req, res, next) => {
  User.find()
  .then(response => res.json(response))
  .catch(err => console.log(err))
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
