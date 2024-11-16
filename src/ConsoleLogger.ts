import { Logger } from "./Logger";

export class ConsoleLogger extends Logger {
    alert(message: string, ...meta: any[]) {
        console.error(message, ...meta);
    }
    error(message: string, ...meta: any[]) {
        console.error(message, ...meta);
    }
    warning(message: string, ...meta: any[]) {
        console.log(message, ...meta);
    }
    notice(message: string, ...meta: any[]) {
        console.log(message, ...meta);
    }
    info(message: string, ...meta: any[]) {
        console.log(message, ...meta);
    }
    debug(message: string, ...meta: any[]) {
        console.log(message, ...meta);
    }
}