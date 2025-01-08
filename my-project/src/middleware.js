import { middlewareToken } from '@/middleware/route';

export function middleware(req) {
  return middlewareToken(req);
}