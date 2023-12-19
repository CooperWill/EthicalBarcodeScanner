const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors()); // To handle cross-origin requests
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: '10.0.0.94',
    user: 'will',
    password: '',
    database: 'barcode_database',
    port: 3307
});

// Endpoint to get product description by barcode
app.get('/product/:barcode', (req, res) => {
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
