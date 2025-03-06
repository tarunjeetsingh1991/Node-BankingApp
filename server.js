const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
  res.send("Good Morning!");
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', authMiddleware, clientRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));