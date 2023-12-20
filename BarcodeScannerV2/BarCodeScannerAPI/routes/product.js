const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the database connection

router.get('/:barcode', (req, res) => {
    const barcode = req.params.barcode;
    const query = 'SELECT ProductName, ProductBrand, BrandEthicalRating, BrandInfo, InfoLink FROM products WHERE productID = ?';

    db.query(query, [barcode], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ error: 'Server error', details: err.message });
            return;
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.json({ message: 'Product not found in the database' }); // Ensure this is JSON
        }
    });
});

module.exports = router;
