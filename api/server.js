const restify = require('restify');
const errors = require('restify-errors');
const restifyPlugins = require('restify-plugins');

//Rotas
const categoriaRoutes = require('./routes/categoriaRoutes');
const cidadeRoutes = require('./routes/cidadeRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const produtoRoutes = require('./routes/pacoteRoutes');
const ped_pacRoutes = require('./routes/ped_pacRoutes');

const servidor = restify.createServer({
  name: 'SiteDeViagem',
  version: '1.0.0',
});

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.listen(8001, function () {
  console.log('%s executando em %s', servidor.name, servidor.url);
});

categoriaRoutes(servidor);
cidadeRoutes(servidor);
clienteRoutes(servidor);
produtoRoutes(servidor);
pedidoRoutes(servidor);
ped_pacRoutes(servidor)
