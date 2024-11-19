export interface AuthenticatedRequest extends Request {
  user: { id: string; grade: number };
}
