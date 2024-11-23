export default class UnauthorizedError extends Error {
  name: "UnauthorizedError";

  constructor(message = "Not authorized") {
    super(message);
  }
}
