const mongoose = require('mongoose');
const Product =require('../models/Products');

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
             res.status(200).json(products)
        } catch (error) {
            res.status(500).json("failed to get the products")
            
        }
    },
   getProduct: async (req, res) => {
  const rawId = req.params.id;
  const cleanId = rawId.trim();

  try {
    const product = await Product.findById(cleanId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to get the product", error: error.message });
  }
},
   searchProduct: async (req, res) => {
  const query = req.params.key.trim();

  try {
    if (mongoose.Types.ObjectId.isValid(query)) {
      const product = await Product.findById(query);
      if (product) return res.status(200).json([product]); 
    }

    const result = await Product.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: query,
            path: {
              wildcard: "*"
            }
          }
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to search the product", error: error.message });
  }
}

    
}