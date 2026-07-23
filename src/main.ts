import appBuild from "./app.ts";

const main = async () => {
  const app = await appBuild();

  try {
    await app.listen({
      port: 7000,
      host: "0.0.0.0",
    });

    console.log("Server is running!");
  } catch (err) {
    app.log.error(err);
  }
};

main();