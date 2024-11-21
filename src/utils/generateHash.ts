const { createHash } = require("crypto");

const generateHash = (toHash: string) => {
  return createHash("sha256").update(toHash).digest("hex");
};

export default generateHash;
