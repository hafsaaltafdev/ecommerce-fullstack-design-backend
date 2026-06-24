import Cart from "../models/Cart.js";

//ADD TO CART
export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            cart = new Cart({
                userId: userId,
                items: [{ productId, quantity: quantity || 1 }],
            });
        } else {
            const item = cart.items.find(
                i => i.productId.toString() === productId
            );

            if (item) {
                item.quantity += quantity || 1;
            } else {
                cart.items.push({ productId, quantity: quantity || 1 });
            }
        }

        await cart.save();

        res.status(200).json({
            message: "Added to cart",
            cart,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// GET CART 
export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ userId: userId })
            .populate("items.productId");

        if (cart) {
            cart.items = cart.items.filter(item => item.productId);
        }
        
        if (!cart) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json({ cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// REMOVE ITEM 
export const removeItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        const cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            i => i.productId.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            message: "Item removed from cart",
            cart,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// CLEAR CART 
export const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({
            message: "Cart cleared",
            cart: { items: [] }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// UPDATE QUANTITY
export const updateQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            i => i.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            message: "Item quantity updated",
            cart,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};