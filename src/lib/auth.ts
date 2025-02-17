import jwt from 'jsonwebtoken';

// Gunakan secret key yang kuat dari environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'rexbot-secret-key-2024';

export function generateToken(no_user: string): string {
  // Payload berisi:
  const payload = {
    no_user: no_user,         // nomor user
    iat: Date.now(),          // waktu token dibuat
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000), // expired dalam 7 hari
    type: 'access_token'      // tipe token
  };

  // Generate token
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token: string): string | null {
  try {
    // Verifikasi dan decode token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      no_user: string;
      iat: number;
      exp: number;
      type: string;
    };

    // Cek apakah token sudah expired
    if (decoded.exp < Date.now()) {
      return null;
    }

    return decoded.no_user;
  } catch {
    return null;
  }
} 