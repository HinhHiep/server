const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: '*' })); // Cho phép mọi domain gọi API
app.use(express.json());


const userRoutes = require('./routes/user.routes');
app.use('/api', userRoutes);


const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});