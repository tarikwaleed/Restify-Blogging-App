const restify = require('restify');
const logger = require("morgan");
require("./config/database").connect();


const server = restify.createServer();

server.listen(8080, () => {
  console.log(`Server listening on port ${server.address().port}🚀`);
});

server.use(logger("dev"))
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());