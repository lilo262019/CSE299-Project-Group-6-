const  router=require('express').Router();
const productController= require('../controllers/productsControllers');

router.get('/',productController.getAllProduct)
router.get('/search/:key',productController.searchProduct)
router.get('/:id',productController.getProduct)
router.post('/',productController.creatProduct)

module.exports =router