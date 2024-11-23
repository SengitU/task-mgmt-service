export default class ConstraintError extends Error {
    name: "ConstraintError";
  
    constructor(message: string) {
      super(message);
    }
  }
  