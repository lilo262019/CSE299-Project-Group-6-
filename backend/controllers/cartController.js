const Product = require('../models/Products');
const Cart = require('../models/Cart');

module.exports = {
  addTocart: async (req, res) => {
    const { cartItem, quantity } = req.body;
    const userId = req.user.id; 
    console.log('Add to cart request:', { userId, cartItem, quantity });
    
    try {
      const cart = await Cart.findOne({ userId });
      console.log('Existing cart:', cart);

      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem.toString()
        );

        if (existingProduct) {
          existingProduct.quantity += quantity;
          console.log('Updated existing product quantity');
        } else {
          cart.products.push({ cartItem, quantity });
          console.log('Added new product to cart');
        }

        await cart.save();
        console.log('Cart saved successfully');
        res.status(200).json("Product added to cart");
      } else {
        const newCart = new Cart({
          userId,
          products: [{ cartItem, quantity }]
        });

        await newCart.save();
        console.log('New cart created successfully');
        res.status(200).json("Product added to cart");
      }
    } catch (error) {
      console.log('Add to cart error:', error);
      res.status(500).json(error);
    }
  },

  getCart: async (req, res) => {
    const userId = req.user.id; 
    console.log('Get cart request for user:', userId);
    
    try {
      const cart = await Cart.findOne({ userId })
        .populate('products.cartItem', "_id title imageUrl price supplier");
      
      console.log('Found cart:', cart);

      if (!cart) {
        console.log('No cart found for user:', userId);
        return res.status(404).json("Cart not found");
      }

      res.status(200).json(cart);
    } catch (error) {
      console.log('Get cart error:', error);
      res.status(500).json(error);
    }
  },

  deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItem; 
    try {
      const userId = req.user.id;
      const updatedCart = await Cart.findOneAndUpdate(
        { userId, 'products._id': cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );
      if (!updatedCart) {
        return res.status(403).json("Forbidden: You are not allowed to delete this cart item");
      }
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  decrementCartItem: async (req, res) => {
    const { cartItem } = req.body;
    const userId = req.user.id; 
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json("Cart not found");
      }

      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === cartItem.toString()
      );

      if (!existingProduct) {
        return res.status(404).json("Product not found");
      }

      if (existingProduct.quantity === 1) {
        cart.products = cart.products.filter(
          (product) => product.cartItem.toString() !== cartItem.toString()
        );
      } else {
        existingProduct.quantity -= 1;
      }

      await cart.save();

      if (existingProduct.quantity === 0) {
        await Cart.updateOne(
          { userId },
          { $pull: { products: { cartItem } } }
        );
      }

      res.status(200).json("Product updated");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
