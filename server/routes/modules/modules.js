const router = require('express').Router()
const Module = require('../../models/Module')

router.get("/modules", (req, res, next) => {
    Module.find()
    .then(response => {
      res.status(200).json(response)  
    })
    .catch(err => console.log(err))
  });

router.post("/dashboard/add", (req, res, next) => {
    Module.create(req.body)
    .then(response => res.json(response))
    .catch(err => console.log(err))
})

  module.exports = router;