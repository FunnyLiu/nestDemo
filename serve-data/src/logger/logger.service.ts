import { LoggerService } from "@nestjs/common";
import { createLogger, format, transports} from 'winston'
import { LOG_LABEL } from "./logger.constants";
const { combine, timestamp, label, printf } = format

export class AppLogger implements LoggerService {
  private logger:any
  constructor() {
    this.logger = createLogger({
      format: combine(
        label({ label: LOG_LABEL}),
        timestamp(),
        this.myFormat()
      ),
      transports: [new transports.Console()]
    })
  }

  myFormat() {
    return printf(({ level, message, label, timestamp }) => {
      return `${new Date().toLocaleString('zh')} [${label}] ${level.toUpperCase()} ${message}`
    })
  }

  log(message: string){
    this.logger.log('info',message)
  }
  error(message: string, trace: string){
    this.logger.error(`${message}`)
  }
  warn(message: string) {
    this.logger.warn(message)
  }
  info(message: string) {
    this.logger.info(message)
  }
}