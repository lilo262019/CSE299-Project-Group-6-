const  router=require('express').Router();
const productController= require('../controllers/productscontrollers');

router.get('/',productController.getAllProduct)
router.get('/:id',productController.getAProduct)
router.get('/search/:key',productController.searchProduct)
router.post('/',productController.creatProduct)

module.exports =router