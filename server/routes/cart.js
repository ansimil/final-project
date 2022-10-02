const router = require('express').Router()
const Cart = require('../models/Cart')
const User = require('../models/User')
const { isAuthenticated } = require('../middleware/jwt.middleware'); 


router.put('/module/:moduleId/addtocart', isAuthenticated, (req, res, next) => {
    const moduleId = req.params.moduleId
    const userId = req.body.userId
    
    console.log(moduleId, userId)


    User.findById(userId)
    .populate('cart')
    .then(response => {
        console.log(response)
        return Cart.findByIdAndUpdate(response.cart[0]._id, { $push: {modules: moduleId } }, {new: true})
        .then(response => {
            return Cart.findById(response._id)
            .populate('modules')
            .then(response => {
                console.log(response)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


module.exports = router;