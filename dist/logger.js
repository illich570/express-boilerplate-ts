import pino from 'pino';
const __dirname = import.meta.dirname;
import { validConfig } from './config.js';
const activePretty = validConfig.env === 'development'
    ? {
        target: 'pino-pretty',
    }
    : {
        target: 'undefined',
    };
const transport = pino.transport({
    targets: [
        {
            target: 'pino/file',
            options: { destination: `${__dirname}/${validConfig.logFile}` },
        },
        activePretty,
    ],
});
const logger = pino({
    level: validConfig.logLevel,
    timestamp: pino.stdTimeFunctions.isoTime,
}, transport);
export default logger;
//# sourceMappingURL=logger.js.map