import db from "./db";
import server from "./server";

(async () => {
  try {
    await db.connect();
    server.start();
  } catch (err) {
    console.log({ err });
    await db.disconnect();
  }
})();
