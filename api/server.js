const express = require('express');
const bodyParser = require('body-parser');

// Routes
const categoriaRoutes = require('./routes/categoriaRoutes');
const cidadeRoutes = require('./routes/cidadeRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pacoteRoutes = require('./routes/pacoteRoutes');
const ped_pacRoutes = require('./routes/ped_pacRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Add your routes
app.get('/', (req, res) => {
  res.status(200).send("Seja bem-vindo ao API BoaViagem");
});
app.use('/categoria', categoriaRoutes);
app.use('/categoria', cidadeRoutes);
app.use('/categoria', clienteRoutes);
app.use('/categoria', pacoteRoutes);
app.use('/categoria', pedidoRoutes);
app.use('/categoria', ped_pacRoutes);
//categoriaRoutes(app);
// cidadeRoutes(app);
// clienteRoutes(app);
// pacoteRoutes(app);
// pedidoRoutes(app);
// ped_pacRoutes(app);

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});

