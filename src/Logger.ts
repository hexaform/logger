export abstract class Logger {
    abstract alert(...args: any): void;
    abstract error(...args: any): void;
    abstract warning(...args: any): void;
    abstract notice(...args: any): void;
    abstract info(...args: any): void;
    abstract debug(...args: any): void;
}