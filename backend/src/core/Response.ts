export default class Response {
  static success(
    data: any = null,
    message: string = "Success"
  ): { success: boolean; message: string; data: any } {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(
    message: string,
    errors: string[] = []
  ): { success: boolean; message: string; errors: string[] } {
    return {
      success: false,
      message,
      errors,
    };
  }
}
