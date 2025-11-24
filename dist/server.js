import { createServer } from "./app.js";
import morgan from "morgan";
import { pinoHttp } from "pino-http";
import logger from "./logger.js";
const environment = process.env.NODE_ENV || "development";
const port = Number(process.env.PORT) || 3000;
const app = createServer();
app.use(pinoHttp({
    logger,
}));
app.use(environment === "development" ? morgan("dev") : morgan("tiny"));
const server = app.listen(port, () => {
    console.log(`Server alive! Running on PORT: ${port}`);
});
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(() => {
        console.log("HTTP server closed");
    });
});
//# sourceMappingURL=server.js.map