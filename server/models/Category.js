const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: String
});

module.exports = mongoose.model('Category', CategorySchema);
