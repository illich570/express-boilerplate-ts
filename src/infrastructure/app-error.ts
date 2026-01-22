export class AppError extends Error {
  private readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
