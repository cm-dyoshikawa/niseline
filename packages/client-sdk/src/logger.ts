/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

export interface Logger {
  info(message: string): void
}

export class ConsoleLogger implements Logger {
  info(message: string) {
    console.log(`@linely/client-sdk: ${message}`)
  }
}
