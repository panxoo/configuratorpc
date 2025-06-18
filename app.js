const express = require('express');
const bodyPareser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const verifyToken = require('./middlewares/authMiddlewares');
const userAuthRoute = require('./routes/userAuthRoutes');
const parametreRoute = require('./routes/parametreRoutes');
const setupRoute = require('./routes/setupRoute');
const composantsRoute = require('./routes/composantsRoute');
const partenairesRoute = require('./routes/partenaireRoute');
const prixComposantRoute = require('./routes/prixComposantRoute');
const userRoute = require('./routes/userRoute');
const userConfigRoute = require('./routes/userConfigRoute');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openApi.yaml');

const requireRole = require('./middlewares/requireRoleMiddlewares');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

dotenv.config();

app.use(bodyPareser.json());

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// routes protégées par le middleware verifyToken
app.use('/api', verifyToken);
app.use('/api/partenaires', requireRole(['admin']));

// routes :

app.use('/auth', userAuthRoute);
app.use('/api/parametre', parametreRoute);
app.use('/api/composants', composantsRoute);
app.use('/api/partenaires', partenairesRoute);
app.use('/api/prixcomposant', prixComposantRoute);
app.use('/api/users', userRoute);
app.use('/api/userconfig', userConfigRoute);

app.use('/setup', setupRoute);

app.get('/', (req, res) => {
  res.send('Accueil');
});

app.listen(8091, () => {
  console.log('Server is running on http://localhost:8091');
});

module.exports = app;
