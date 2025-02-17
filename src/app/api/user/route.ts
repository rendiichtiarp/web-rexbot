import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // Ambil token dari header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Verifikasi token dan dapatkan no_user
    const no_user = verifyToken(token);
    if (!no_user) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const connection = await connectDB();

    // Ambil data user dari database
    const [users] = await connection.execute(
      `SELECT 
        no_user,
        name,
        IFNULL(level, 1) as level,
        IFNULL(xp, 0) as xp,
        IFNULL(coin, 0) as coin,
        IFNULL(premium, 0) as premium
      FROM users 
      WHERE no_user = ?`,
      [no_user]
    );

    await connection.end();

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Return data user
    return NextResponse.json(users[0]);

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 