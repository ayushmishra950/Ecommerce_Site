const Rating = require("../../models/rating.model");


// ADD RATING
const addRating = async (req, res) => {
    try {
    console.log(req.body);
        const { shopId, productId, rating, feedback } = req.body;
        const userId = req.user._id; // assume auth middleware

        const existingRating = await Rating.findOne({
            userId,
            productId
        });

        if (existingRating) {
            return res.status(400).json({
                success: false,
                message: "You already rated this product"
            });
        }

        const newRating = await Rating.create({
            shopId,
            productId,
            userId,
            rating,
            feedback
        });

        res.status(201).json({
            success: true,
            data: newRating
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// GET ALL RATINGS BY PRODUCT
const getProductRatings = async (req, res) => {
    try {

        const { productId } = req.params;

        const ratings = await Rating.find({ productId })
            .populate("userId", "name");

        res.status(200).json({
            success: true,
            count: ratings.length,
            data: ratings
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// GET RATINGS BY SHOP
const getShopRatings = async (req, res) => {
    try {

        const { shopId } = req.params;

        const ratings = await Rating.find({ shopId });

        res.status(200).json({
            success: true,
            count: ratings.length,
            data: ratings
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// UPDATE RATING
const updateRating = async (req, res) => {
    try {

        const { id } = req.params;

        const updatedRating = await Rating.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedRating) {
            return res.status(404).json({
                success: false,
                message: "Rating not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedRating
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// DELETE RATING
const deleteRating = async (req, res) => {
    try {

        const { id } = req.params;

        const rating = await Rating.findByIdAndDelete(id);

        if (!rating) {
            return res.status(404).json({
                success: false,
                message: "Rating not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Rating deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    addRating,
    getProductRatings,
    getShopRatings,
    updateRating,
    deleteRating
};
