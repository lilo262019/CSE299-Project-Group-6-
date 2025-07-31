const router = require('express').Router();
const cartController = require('../controllers/cartController')

router.get("/find",cartController.getCart);

router.post("/",cartController.addTocart);

router.post("/quantity",cartController.decrementCartItem);

router.delete("/:cartItem", cartController.deleteCartItem);

module.exports = router;