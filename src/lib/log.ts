import chalk from "chalk";

const logger = console.log;

export const errorLog = (message: string) => {
  logger(`${chalk.bgRed("[vite-plugin-font-cdn]")}${chalk.red.bold("[Error]: ")}${chalk.red(message)}`);
};
export const successLog = (message: string) => {
  logger(`${chalk.bgGreen("[vite-plugin-font-cdn]")}${chalk.green.bold("[Success]: ")}${chalk.green(message)}`);
};
