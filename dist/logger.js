import pino from "pino";
const environment = process.env.NODE_ENV || "development";
const __dirname = import.meta.dirname;
const activePretty = environment
    ? {
        target: "pino-pretty",
    }
    : {
        target: "undefined",
    };
const transport = pino.transport({
    targets: [
        {
            target: "pino/file",
            options: { destination: `${__dirname}/server.log` },
        },
        activePretty,
    ],
});
const logger = pino({
    level: process.env.PINO_LOG_LEVEL || "info",
    timestamp: pino.stdTimeFunctions.isoTime,
}, transport);
export default logger;
//# sourceMappingURL=logger.js.map