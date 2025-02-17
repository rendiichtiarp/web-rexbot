import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { no_user } = await request.json();
    
    const connection = await connectDB();
    
    // Cek apakah no_user ada dan terdaftar
    const [users] = await connection.execute(
      'SELECT no_user FROM users WHERE no_user = ? AND registered = true',
      [no_user]
    );
    
    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { message: 'No User tidak ditemukan atau belum terdaftar' },
        { status: 404 }
      );
    }

    // Generate OTP (6 digit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Simpan OTP ke database dengan waktu kadaluarsa
    await connection.execute(
      'UPDATE users SET otp = ?, otp_expires = DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE no_user = ?',
      [otp, no_user]
    );

    try {
      // Kirim OTP via WhatsApp
      // Implementasi sesuai dengan sistem WhatsApp Anda
      // Contoh:
      // await sendWhatsAppMessage(
      //   no_user,
      //   `*RexBot OTP*\n\nKode OTP Anda: ${otp}\nBerlaku selama 5 menit.\nJangan bagikan kode ini kepada siapapun!`
      // );
      
      await connection.end();
      return NextResponse.json(
        { message: 'OTP berhasil dikirim ke WhatsApp Anda' },
        { status: 200 }
      );
    } catch {
      // Jika gagal kirim WhatsApp, hapus OTP dari database
      await connection.execute(
        'UPDATE users SET otp = NULL, otp_expires = NULL WHERE no_user = ?',
        [no_user]
      );
      
      await connection.end();
      return NextResponse.json(
        { message: 'Gagal mengirim OTP ke WhatsApp' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat memproses permintaan' },
      { status: 500 }
    );
  }
} 