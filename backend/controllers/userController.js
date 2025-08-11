const User = require('../models/User');


module.exports ={
    deleteUser: async (req, res ) => {
        try {

            if (req.user.id !== req.params.id) {
                return res.status(403).json('You can only delete your own account');
            }
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Sucessfully Deleted');
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getUser: async (req, res ) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json("User does not exist");
        }

        const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
},
}