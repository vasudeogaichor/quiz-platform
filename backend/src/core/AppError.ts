export default class AppError extends Error {
  public statusCode: number;
  public errors: string[];

  constructor(
    message: string,
    statusCode: number = 500,
    errors: string[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // Ensure the prototype chain is correctly set
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string, errors: string[] = []): AppError {
    return new AppError(message, 400, errors);
  }

  static unauthorized(message: string = "Unauthorized"): AppError {
    return new AppError(message, 401);
  }

  static notFound(message: string = "Not found"): AppError {
    return new AppError(message, 404);
  }

  static internalServerError(
    message: string = "Internal Server Error"
  ): AppError {
    throw new AppError(message, 500);
  }
}
