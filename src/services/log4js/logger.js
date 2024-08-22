import log4js from "log4js";

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    outLevelFilter: {
      type: "logLevelFilter",
      level: "warn",
      appender: "out",
    },
    file: { type: "file", filename: "./logs/muhtar.log" },
  },
  categories: {
    default: { appenders: ["out"], level: "debug" },
    test: {
      appenders: ["outLevelFilter", "file"],
      level: "debug",
    },
    prod: {
      appenders: ["outLevelFilter", "file"],
      level: "debug",
    },
  },
});

export default log4js.getLogger(process.env.MACHINE);
