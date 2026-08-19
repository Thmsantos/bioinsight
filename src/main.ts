import appBuild from "./app.ts";
import { logger } from "./lib/pino/logger.ts";

const main = async () => {
  const app = await appBuild();

  try {
    await app.listen({
      port: 7000,
      host: "0.0.0.0",
    });

    logger.info(`Server is running - ${new Date().toLocaleString()}`);
  } catch (err) {
    app.log.error(err);
  }
};

main();