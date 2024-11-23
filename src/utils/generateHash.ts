const { createHash } = require("node:crypto");

const generateHash = (toHash: string) => {
  return createHash("sha256").update(toHash).digest("hex") as string;
};

export default generateHash;
