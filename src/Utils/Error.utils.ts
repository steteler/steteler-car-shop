export default class ErrorHandler extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;

    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
}