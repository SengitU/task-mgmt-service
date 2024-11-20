import db from "./db";
import server from "./server";

(async () => {
  try {
    await db.connect();
    await server.start();
  } catch (err) {
    await db.disconnect();
  }
})();
