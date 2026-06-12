import type { IncomingMessage } from "node:http";

export interface AuthContext {
  userId: string | null;
  token: string | null;
}

/**
 * Extract auth context from request headers.
 * TODO: Validate JWT and resolve user identity
 */
export function extractAuth(req: IncomingMessage): AuthContext {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return { userId: null, token: null };
  }

  const token = authHeader.slice(7);
  // TODO: Verify JWT and decode userId
  return { userId: null, token };
}
