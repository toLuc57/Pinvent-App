const mongoose = require('mongoose');

const productCounterSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "User",
    },
    sequence_value: {
        type: Number,
        default: 1
    }
});

const ProductCounter = mongoose.model('ProductCounter', productCounterSchema);

module.exports = ProductCounter;
