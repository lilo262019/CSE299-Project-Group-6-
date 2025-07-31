const Product =require('../models/Product');

module.exports ={
    creatProduct: async(req, res)=> {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json("product created successfully")
        } catch (error) {  
            res.status(500).json("failed to create the product")
        }
    },
    getAllProduct: async(req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1})
             res.status(200).json("products")
        } catch (error) {
            res.status(500).json("failed to create the products")
            
        }
    },
     getAProduct: async(req, res) => {
        try {
            const product = await Product.findById(req.params.id)
             res.status(200).json("product")
        } catch (error) {
            res.status(500).json("failed to create the product")
            
        }
    },
    searchProduct: async(req,res) =>{
        try {
             const result = await Product.aggregate(
                [
                 {
                  $search: {
                   index: "Aureva",
                     text: {
                       query: req.params.key,
                        path: {
                         wildcard: "*"
                              }
                           }
                         }
                  }
               ]
             )  
              res.status(200).json("product")
        } catch (error) {
             res.status(500).json("failed to create the product")
        }
    }
}