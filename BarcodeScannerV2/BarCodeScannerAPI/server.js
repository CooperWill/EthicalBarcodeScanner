const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product');

const app = express();
app.use(cors());
app.use(express.json());

// Use the routes
app.use('/product', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
