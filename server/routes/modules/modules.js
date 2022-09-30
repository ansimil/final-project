const router = require('express').Router()
const Module = require('../../models/Module')

router.get("/modules", (req, res, next) => {
    Module.find()
    .then(response => {
      res.status(200).json(response)  
    })
    .catch(err => console.log(err))
  });

  router.get("/module/:moduleId", (req, res, next)=>{
    const moduleId = req.params.moduleId
    Module.findById(moduleId)
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err))
  })

  router.put("/dashboard/:moduleId/edit", (req, res, next) => {
    const moduleId = req.params.moduleId
    Module.findByIdAndUpdate(moduleId, req.body, {new: true})
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err))
  })

  router.delete("/dashboard/:moduleId/delete", (req, res, next)=>{
    const moduleId = req.params.moduleId
    Module.findByIdAndRemove(moduleId)
    .then((response) => res.status(200).json(response))
    .catch(err => console.log(err)) 
  })

router.post("/dashboard/add", (req, res, next) => {
    Module.create(req.body)
    .then(response => res.json(response))
    .catch(err => console.log(err))
})

  module.exports = router;