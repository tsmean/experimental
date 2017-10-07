"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const logger_1 = require("./logger/logger");
const app_config_1 = require("./config/app-config");
const db_1 = require("./db");
const router_module_1 = require("../router-module");
function main() {
    // Step 1) Set & Get App Configuration
    app_config_1.appConfig.setAppConfig(process.argv[2] || 'local');
    // Step 2) Connect to the database
    db_1.database().database.connectToDatabase(app_config_1.appConfig.appConfig.db, (db) => {
        // when connected to db:
        // Step 3) Set Port for router
        const normalizePort = (val) => {
            const port = (typeof val === 'string') ? parseInt(val, 10) : val;
            if (isNaN(port)) {
                return val;
            }
            else if (port >= 0) {
                return port;
            }
            else {
                return false;
            }
        };
        const port = normalizePort(process.env.PORT || 4242);
        router_module_1.router.set('port', port);
        const server = http.createServer(router_module_1.router);
        // Step 4) Handle Errors
        const onError = (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
            switch (error.code) {
                case 'EACCES':
                    console.error(`${bind} requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(`${bind} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        };
        const onListening = () => {
            const addr = server.address();
            const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        };
        server.on('error', onError);
        server.on('listening', onListening);
        server.listen(port, function () {
            logger_1.log.info('Server listening at port %d', port);
        });
    });
}
exports.main = main;
;
main();
