export default class NotFoundError extends Error {
  name: "NotFoundError";

  constructor(message: string) {
    super(message);
  }
}
