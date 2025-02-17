import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { no_user, otp } = await request.json();

    const connection = await connectDB();
    
    // Verifikasi OTP
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE no_user = ? AND otp = ? AND otp_expires > NOW()',
      [no_user, otp]
    );

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { message: 'OTP tidak valid atau sudah kadaluarsa' },
        { status: 400 }
      );
    }

    // Reset OTP setelah berhasil diverifikasi
    await connection.execute(
      'UPDATE users SET otp = NULL, otp_expires = NULL WHERE no_user = ?',
      [no_user]
    );

    // Generate token untuk user
    const token = generateToken(no_user);

    await connection.end();

    return NextResponse.json({
      message: 'Login berhasil',
      token
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat memverifikasi OTP' },
      { status: 500 }
    );
  }
} 