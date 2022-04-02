const express = require('express');
const app = express();
const { sequelize } = require('./models/index');
// to accept petitions from other servers like localhost:4200
const cors = require('cors');
app.use(cors());
// Setting
const PORT = process.env.PORT || 3000;

// Middleware
// To be able to fill the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use(require('./routes'));

//Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  sequelize.authenticate().then(() => {
    console.log('Connection established.');
  });
});
