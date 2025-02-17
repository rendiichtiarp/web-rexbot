import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { no_user, name, birth_date } = await request.json();
    
    const connection = await connectDB();

    // Cek apakah no_user sudah terdaftar
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE no_user = ?',
      [no_user]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      // Update data user yang sudah ada
      await connection.execute(
        `UPDATE users SET 
          name = ?,
          birth_date = ?,
          birth_date_time = ?,
          age = ?,
          registered = true,
          updated_at = NOW()
        WHERE no_user = ?`,
        [
          name, 
          birth_date, 
          new Date(birth_date).getTime(),
          new Date().getFullYear() - new Date(birth_date).getFullYear(),
          no_user
        ]
      );

      await connection.end();
      return NextResponse.json({ message: 'Data berhasil diperbarui' }, { status: 200 });
    }
    
    // Jika user baru
    const uid = uuidv4();
    const birthDate = new Date(birth_date);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    
    await connection.execute(
      `INSERT INTO users (
        uid, no_user, name, birth_date, birth_date_time, 
        age, registered, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, true, NOW())`,
      [uid, no_user, name, birth_date, birthDate.getTime(), age]
    );
    
    await connection.end();
    return NextResponse.json({ message: 'Pendaftaran berhasil' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat memproses pendaftaran' },
      { status: 500 }
    );
  }
} 