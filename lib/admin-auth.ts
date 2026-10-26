import crypto from 'crypto';

const AUTH_SECRET = process.env.JWT_SECRET || 'greenline_admin_secret_key_2026_fertilizers';

export interface AdminPayload {
  username: string;
  role: string;
  exp: number;
}

export function createAdminToken(username: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60); // 7 days expiration
  const payload: AdminPayload = {
    username,
    role: 'admin',
    exp,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(`${header}.${data}`).digest('base64url');
  return `${header}.${data}.${signature}`;
}

export function verifyAdminToken(token: string | undefined): AdminPayload | null {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, data, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', AUTH_SECRET).update(`${header}.${data}`).digest('base64url');
    if (signature !== expectedSig) return null;
    
    const payload: AdminPayload = JSON.parse(Buffer.from(data, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}
