import _ from "lodash";
import util from "node:util";
import winston from "winston";
import { Logger } from "./Logger";
import { Configuration } from "@hexaform/configuration/Configuration";

export class WinstonLogger extends Logger {
    private config: Configuration;
    private logger: winston.Logger;

    constructor(config: Configuration) {
        super();
        this.config = config;

        this.logger = winston.createLogger();

        const LEVEL: unique symbol = Symbol.for("level");
        const MESSAGE: unique symbol = Symbol.for("message");
        const SPLAT: unique symbol = Symbol.for("splat");

        if (config.get("log.console.enable")) {
            this.logger.add(new winston.transports.Console({
                level: config.get("log.console.level"),
                debugStdout: true,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format((info) => {
                        let formatOptions = {
                            breakLength: Infinity,
                            colors: true,
                            compact: false,
                            depth: 10,
                            sorted: true
                        };
                        let meta = _.omit(info, ["level", "message", SPLAT, MESSAGE, LEVEL]);

                        let padding = info.padding && info.padding[info.level] || "";
                        if (!_.isEmpty(meta)) {
                            info[MESSAGE as unknown as string] = `${info.level}:${padding} ${info.message} ${util.formatWithOptions(formatOptions, meta)}`;
                        } else {
                            info[MESSAGE as unknown as string] = `${info.level}:${padding} ${info.message}`;
                        }

                        return info;
                    })()
                )
            }));
        }
    }
    alert(message: string, ...meta: any[]) {
        this.logger.alert(message, ...meta);
    }
    error(message: string, ...meta: any[]) {
        this.logger.error(message, ...meta);
    }
    warning(message: string, ...meta: any[]) {
        this.logger.warning(message, ...meta);
    }
    notice(message: string, ...meta: any[]) {
        this.logger.notice(message, ...meta);
    }
    info(message: string, ...meta: any[]) {
        this.logger.info(message, ...meta);
    }
    debug(message: string, ...meta: any[]) {
        this.logger.debug(message, ...meta);
    }
}