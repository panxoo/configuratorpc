const express = require('express');
const bodyPareser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const verifyToken = require('./middlewares/authMiddlewares');
const userAuthRoute = require('./routes/userAuthRoutes');

const app = express();

dotenv.config();

app.use(bodyPareser.json());

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});


// routes protégées par le middleware verifyToken
app.use('/api', verifyToken);

// routes :

app.use('/auth', userAuthRoute);



app.get('/', (req, res) => {
    res.send('Accueil');
});


app.listen(8091, () => {
    console.log('Server is running on http://localhost:8091');
});