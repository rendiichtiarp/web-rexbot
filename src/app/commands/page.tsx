'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

type Command = {
  category: string;
  commands: {
    name: string;
    description: string;
    usage: string;
    premium?: boolean;
    groupOnly?: boolean;
    ownerOnly?: boolean;
    privateOnly?: boolean;
  }[];
};

const commandList: Command[] = [
  {
    category: "AI Chat",
    commands: [
      {
        name: "bagoodex",
        description: "Chat dengan AI Bagoodex",
        usage: ".bagoodex [pesan]"
      },
      {
        name: "bard",
        description: "Chat dengan Google Bard",
        usage: ".bard [pesan]"
      },
      {
        name: "blackbox",
        description: "Chat dengan Blackbox AI",
        usage: ".blackbox [pesan]"
      },
      {
        name: "characterai",
        description: "Chat dengan Character AI",
        usage: ".characterai [pesan]"
      },
      {
        name: "chatgpt",
        description: "Chat dengan ChatGPT",
        usage: ".chatgpt [pesan]"
      },
      {
        name: "claude",
        description: "Chat dengan Claude AI",
        usage: ".claude [pesan]"
      },
      {
        name: "copilot",
        description: "Chat dengan GitHub Copilot",
        usage: ".copilot [pesan]"
      },
      {
        name: "feloai",
        description: "Chat dengan Felo AI",
        usage: ".feloai [pesan]"
      },
      {
        name: "gemini",
        description: "Chat dengan Google Gemini",
        usage: ".gemini [pesan]"
      },
      {
        name: "islamic",
        description: "Chat tentang Islam",
        usage: ".islamic [pertanyaan]"
      },
      {
        name: "lepton",
        description: "Chat dengan Lepton AI",
        usage: ".lepton [pesan]"
      },
      {
        name: "muslim",
        description: "Chat tentang Islam",
        usage: ".muslim [pertanyaan]"
      },
      {
        name: "sooksai",
        description: "Chat dengan Sooks AI",
        usage: ".sooksai [pesan]"
      },
      {
        name: "venice",
        description: "Chat dengan Venice AI",
        usage: ".venice [pesan]"
      }
    ]
  },
  {
    category: "AI Image",
    commands: [
      {
        name: "animegen",
        description: "Generate gambar anime",
        usage: ".animegen [prompt]"
      },
      {
        name: "dreamshaper",
        description: "Generate gambar dengan Dreamshaper",
        usage: ".dreamshaper [prompt]"
      },
      {
        name: "flux",
        description: "Generate gambar dengan Flux",
        usage: ".flux [prompt]"
      },
      {
        name: "nsfwgen",
        description: "Generate gambar NSFW",
        usage: ".nsfwgen [prompt]",
        premium: true
      },
      {
        name: "photoleap",
        description: "Generate gambar dengan Photoleap",
        usage: ".photoleap [prompt]"
      },
      {
        name: "pixelart",
        description: "Generate pixel art",
        usage: ".pixelart [prompt]"
      },
      {
        name: "stabilityai",
        description: "Generate gambar dengan Stability AI",
        usage: ".stabilityai [prompt]"
      },
      {
        name: "stablediffusion",
        description: "Generate gambar dengan Stable Diffusion",
        usage: ".stablediffusion [prompt]"
      },
      {
        name: "text2img",
        description: "Convert teks ke gambar",
        usage: ".text2img [teks]"
      }
    ]
  },
  {
    category: "Converter",
    commands: [
      {
        name: "sticker",
        description: "Membuat stiker dari media",
        usage: ".sticker [caption/reply]"
      },
      {
        name: "stickerwm",
        description: "Membuat stiker dengan watermark",
        usage: ".stickerwm [pack] [author]"
      },
      {
        name: "toaudio",
        description: "Convert video ke audio",
        usage: ".toaudio [reply]"
      },
      {
        name: "toimage",
        description: "Convert stiker ke gambar",
        usage: ".toimage [reply]"
      },
      {
        name: "tovideo",
        description: "Convert stiker ke video",
        usage: ".tovideo [reply]"
      },
      {
        name: "tovn",
        description: "Convert audio ke voice note",
        usage: ".tovn [reply]"
      }
    ]
  },
  {
    category: "Downloader",
    commands: [
      {
        name: "facebookdl",
        description: "Download video Facebook",
        usage: ".facebookdl [url]"
      },
      {
        name: "googledrivedl",
        description: "Download file Google Drive",
        usage: ".googledrivedl [url]"
      },
      {
        name: "instagramdl",
        description: "Download post/reel Instagram",
        usage: ".instagramdl [url]"
      },
      {
        name: "mediafiredl",
        description: "Download file Mediafire",
        usage: ".mediafiredl [url]",
        premium: true
      },
      {
        name: "pixeldraindl",
        description: "Download file Pixeldrain",
        usage: ".pixeldraindl [url]",
        premium: true
      },
      {
        name: "play",
        description: "Play audio dari YouTube",
        usage: ".play [query]"
      },
      {
        name: "sfiledl",
        description: "Download file dari sfile.mobi",
        usage: ".sfiledl [url]",
        premium: true
      },
      {
        name: "soundclouddl",
        description: "Download audio SoundCloud",
        usage: ".soundclouddl [url]"
      },
      {
        name: "spotifydl",
        description: "Download lagu dari Spotify",
        usage: ".spotifydl [url]"
      },
      {
        name: "threadsdl",
        description: "Download post Threads",
        usage: ".threadsdl [url]"
      },
      {
        name: "tiktokdl",
        description: "Download video TikTok",
        usage: ".tiktokdl [url]"
      },
      {
        name: "twitterdl",
        description: "Download video Twitter",
        usage: ".twitterdl [url]",
        premium: true
      },
      {
        name: "videydl",
        description: "Download video Videy",
        usage: ".videydl [url]",
        premium: true
      },
      {
        name: "xnxxdl",
        description: "Download video XNXX",
        usage: ".xnxxdl [url]",
        premium: true
      },
      {
        name: "xvideosdl",
        description: "Download video XVideos",
        usage: ".xvideosdl [url]",
        premium: true
      },
      {
        name: "youtubeaudio",
        description: "Download audio YouTube",
        usage: ".youtubeaudio [url]"
      },
      {
        name: "youtubevideo",
        description: "Download video YouTube",
        usage: ".youtubevideo [url]"
      }
    ]
  },
  {
    category: "Entertainment",
    commands: [
      {
        name: "dukun",
        description: "Random chat dukun",
        usage: ".dukun"
      },
      {
        name: "iqtest",
        description: "Test IQ",
        usage: ".iqtest"
      },
      {
        name: "jokes",
        description: "Random jokes lucu",
        usage: ".jokes"
      },
      {
        name: "megumin",
        description: "Random gambar Megumin",
        usage: ".megumin"
      },
      {
        name: "meme",
        description: "Random meme",
        usage: ".meme"
      },
      {
        name: "neko",
        description: "Random gambar Neko",
        usage: ".neko"
      },
      {
        name: "ppcouple",
        description: "Random PP Couple",
        usage: ".ppcouple"
      },
      {
        name: "shinobu",
        description: "Random gambar Shinobu",
        usage: ".shinobu"
      },
      {
        name: "simsimi",
        description: "Chat dengan SimSimi",
        usage: ".simsimi [pesan]"
      },
      {
        name: "waifu",
        description: "Random gambar Waifu",
        usage: ".waifu"
      }
    ]
  },
  {
    category: "Game",
    commands: [
      {
        name: "asahotak",
        description: "Game asah otak",
        usage: ".asahotak"
      },
      {
        name: "caklontong",
        description: "Game cak lontong",
        usage: ".caklontong"
      },
      {
        name: "family100",
        description: "Game family 100",
        usage: ".family100"
      },
      {
        name: "lengkapikalimat",
        description: "Game lengkapi kalimat",
        usage: ".lengkapikalimat"
      },
      {
        name: "mtkdasar",
        description: "Game matematika dasar",
        usage: ".mtkdasar"
      },
      {
        name: "siapakahaku",
        description: "Game siapakah aku",
        usage: ".siapakahaku"
      },
      {
        name: "susunkata",
        description: "Game susun kata",
        usage: ".susunkata"
      },
      {
        name: "tebakbendera",
        description: "Game tebak bendera",
        usage: ".tebakbendera"
      },
      {
        name: "tebakcharaff",
        description: "Game tebak karakter FF",
        usage: ".tebakcharaff"
      },
      {
        name: "tebakgambar",
        description: "Game tebak gambar",
        usage: ".tebakgambar"
      },
      {
        name: "tebakgame",
        description: "Game tebak game",
        usage: ".tebakgame"
      },
      {
        name: "tebakheroml",
        description: "Game tebak hero ML",
        usage: ".tebakheroml"
      },
      {
        name: "tebakhewan",
        description: "Game tebak hewan",
        usage: ".tebakhewan"
      },
      {
        name: "tebakjkt",
        description: "Game tebak member JKT48",
        usage: ".tebakjkt"
      },
      {
        name: "tebakkabupaten",
        description: "Game tebak kabupaten",
        usage: ".tebakkabupaten"
      },
      {
        name: "tebakkalimat",
        description: "Game tebak kalimat",
        usage: ".tebakkalimat"
      },
      {
        name: "tebakkata",
        description: "Game tebak kata",
        usage: ".tebakkata"
      },
      {
        name: "tebakkimia",
        description: "Game tebak unsur kimia",
        usage: ".tebakkimia"
      },
      {
        name: "tebaklagu",
        description: "Game tebak lagu",
        usage: ".tebaklagu"
      },
      {
        name: "tebaklirik",
        description: "Game tebak lirik",
        usage: ".tebaklirik"
      },
      {
        name: "tebaklogo",
        description: "Game tebak logo",
        usage: ".tebaklogo"
      },
      {
        name: "tebaktebakan",
        description: "Game tebak-tebakan",
        usage: ".tebaktebakan"
      },
      {
        name: "tebakwarna",
        description: "Game tebak warna",
        usage: ".tebakwarna"
      },
      {
        name: "tekateki",
        description: "Game teka-teki",
        usage: ".tekateki"
      }
    ]
  },
  {
    category: "Group",
    commands: [
      {
        name: "add",
        description: "Menambahkan member ke grup",
        usage: ".add 628xxx",
        groupOnly: true
      },
      {
        name: "demote",
        description: "Menurunkan admin grup",
        usage: ".demote @user",
        groupOnly: true
      },
      {
        name: "group",
        description: "Pengaturan grup",
        usage: ".group [open/close]",
        groupOnly: true
      },
      {
        name: "hidetag",
        description: "Tag semua member tanpa nama",
        usage: ".hidetag [teks]",
        groupOnly: true
      },
      {
        name: "intro",
        description: "Perkenalan di grup",
        usage: ".intro",
        groupOnly: true
      },
      {
        name: "kick",
        description: "Mengeluarkan member dari grup",
        usage: ".kick @user",
        groupOnly: true
      },
      {
        name: "link",
        description: "Mengambil link invite grup",
        usage: ".link",
        groupOnly: true
      },
      {
        name: "promote",
        description: "Menjadikan member sebagai admin",
        usage: ".promote @user",
        groupOnly: true
      },
      {
        name: "setdesc",
        description: "Mengubah deskripsi grup",
        usage: ".setdesc [teks]",
        groupOnly: true
      },
      {
        name: "setname",
        description: "Mengubah nama grup",
        usage: ".setname [nama]",
        groupOnly: true
      },
      {
        name: "setoption",
        description: "Mengatur opsi grup",
        usage: ".setoption [opsi]",
        groupOnly: true
      },
      {
        name: "setpp",
        description: "Mengubah foto profil grup",
        usage: ".setpp [reply/caption]",
        groupOnly: true
      },
      {
        name: "settext",
        description: "Mengatur teks grup",
        usage: ".settext [teks]",
        groupOnly: true
      },
      {
        name: "tagall",
        description: "Mention semua member",
        usage: ".tagall [teks]",
        groupOnly: true
      },
      {
        name: "tagme",
        description: "Bot mention kamu",
        usage: ".tagme",
        groupOnly: true
      }
    ]
  },
  {
    category: "Maker",
    commands: [
      {
        name: "brat",
        description: "Membuat stiker brat",
        usage: ".brat"
      },
      {
        name: "abrat",
        description: "Membuat stiker abrat",
        usage: ".abrat"
      },
      {
        name: "carbon",
        description: "Membuat gambar kode",
        usage: ".carbon [kode]"
      },
      {
        name: "emojimix",
        description: "Mix 2 emoji jadi stiker",
        usage: ".emojimix 😎+🤔"
      },
      {
        name: "furbrat",
        description: "Membuat stiker furbrat",
        usage: ".furbrat"
      },
      {
        name: "quotlychat",
        description: "Membuat stiker quote chat",
        usage: ".quotlychat [teks]"
      },
      {
        name: "stickermeme",
        description: "Membuat stiker meme",
        usage: ".stickermeme [teks]"
      }
    ]
  },
  {
    category: "Profile",
    commands: [
      {
        name: "afk",
        description: "Set status AFK",
        usage: ".afk [alasan]"
      },
      {
        name: "buylimit",
        description: "Beli limit penggunaan",
        usage: ".buylimit [jumlah]"
      },
      {
        name: "claim",
        description: "Claim hadiah harian",
        usage: ".claim"
      },
      {
        name: "givecoin",
        description: "Transfer koin ke user lain",
        usage: ".givecoin @user [jumlah]"
      },
      {
        name: "leaderboard",
        description: "Lihat peringkat user",
        usage: ".leaderboard"
      },
      {
        name: "profile",
        description: "Lihat profil user",
        usage: ".profile"
      },
      {
        name: "register",
        description: "Daftar sebagai user bot",
        usage: ".register"
      },
      {
        name: "reset",
        description: "Reset data profil",
        usage: ".reset",
        privateOnly: true
      },
      {
        name: "setprofile",
        description: "Ubah data profil",
        usage: ".setprofile [data]"
      }
    ]
  },
  {
    category: "Search",
    commands: [
      {
        name: "aiimagesearch",
        description: "Cari gambar AI",
        usage: ".aiimagesearch [query]"
      },
      {
        name: "apkpuresearch",
        description: "Cari aplikasi di APKPure",
        usage: ".apkpuresearch [query]"
      },
      {
        name: "bingsearch",
        description: "Cari dengan Bing",
        usage: ".bingsearch [query]"
      },
      {
        name: "bukalapaksearch",
        description: "Cari produk di Bukalapak",
        usage: ".bukalapaksearch [query]"
      },
      {
        name: "githubsearch",
        description: "Cari repository GitHub",
        usage: ".githubsearch [query]"
      },
      {
        name: "googlesearch",
        description: "Cari dengan Google",
        usage: ".googlesearch [query]"
      },
      {
        name: "happymodsearch",
        description: "Cari mod di HappyMod",
        usage: ".happymodsearch [query]"
      },
      {
        name: "kodepossearch",
        description: "Cari kode pos",
        usage: ".kodepossearch [query]"
      },
      {
        name: "npmsearch",
        description: "Cari package NPM",
        usage: ".npmsearch [query]"
      },
      {
        name: "playstoresearch",
        description: "Cari aplikasi di PlayStore",
        usage: ".playstoresearch [query]"
      },
      {
        name: "sendthesongsearch",
        description: "Cari lagu di SendTheSong",
        usage: ".sendthesongsearch [query]"
      },
      {
        name: "sfilesearch",
        description: "Cari file di sfile.mobi",
        usage: ".sfilesearch [query]"
      },
      {
        name: "soundcloudsearch",
        description: "Cari lagu di SoundCloud",
        usage: ".soundcloudsearch [query]"
      },
      {
        name: "spotifysearch",
        description: "Cari lagu di Spotify",
        usage: ".spotifysearch [query]"
      },
      {
        name: "steamsearch",
        description: "Cari game di Steam",
        usage: ".steamsearch [query]"
      },
      {
        name: "tiktoksearch",
        description: "Cari video TikTok",
        usage: ".tiktoksearch [query]"
      },
      {
        name: "xnxxsearch",
        description: "Cari video XNXX",
        usage: ".xnxxsearch [query]",
        premium: true
      },
      {
        name: "xvideossearch",
        description: "Cari video XVideos",
        usage: ".xvideossearch [query]",
        premium: true
      },
      {
        name: "youtubesearch",
        description: "Cari video YouTube",
        usage: ".youtubesearch [query]"
      }
    ]
  },
  {
    category: "Tool",
    commands: [
      {
        name: "alkitab",
        description: "Cari ayat Alkitab",
        usage: ".alkitab [ayat]"
      },
      {
        name: "alquran",
        description: "Cari ayat Al-Quran",
        usage: ".alquran [ayat]"
      },
      {
        name: "animeinfo",
        description: "Info anime dari MyAnimeList",
        usage: ".animeinfo [judul]"
      },
      {
        name: "colorize",
        description: "Mewarnai gambar hitam putih",
        usage: ".colorize [gambar]"
      },
      {
        name: "enlarger",
        description: "Perbesar gambar",
        usage: ".enlarger [gambar]"
      },
      {
        name: "faktaunik",
        description: "Random fakta unik",
        usage: ".faktaunik"
      },
      {
        name: "fetch",
        description: "Fetch URL",
        usage: ".fetch [url]"
      },
      {
        name: "gempa",
        description: "Info gempa terkini",
        usage: ".gempa"
      },
      {
        name: "googleimage",
        description: "Cari gambar di Google",
        usage: ".googleimage [query]"
      },
      {
        name: "holiday",
        description: "Info hari libur",
        usage: ".holiday"
      },
      {
        name: "image2prompt",
        description: "Generate prompt dari gambar",
        usage: ".image2prompt [gambar]"
      },
      {
        name: "jadwalsholat",
        description: "Jadwal sholat daerah",
        usage: ".jadwalsholat [kota]"
      },
      {
        name: "js",
        description: "Evaluasi kode JavaScript",
        usage: ".js [kode]"
      },
      {
        name: "lyrics",
        description: "Cari lirik lagu",
        usage: ".lyrics [judul]"
      },
      {
        name: "mangainfo",
        description: "Info manga dari MyAnimeList",
        usage: ".mangainfo [judul]"
      },
      {
        name: "menfess",
        description: "Kirim pesan rahasia",
        usage: ".menfess [nomor] [pesan]",
        privateOnly: true
      },
      {
        name: "ocr",
        description: "Extract teks dari gambar",
        usage: ".ocr [gambar]"
      },
      {
        name: "pinterest",
        description: "Cari gambar di Pinterest",
        usage: ".pinterest [query]"
      },
      {
        name: "recolor",
        description: "Ubah warna gambar",
        usage: ".recolor [gambar]"
      },
      {
        name: "removebg",
        description: "Hapus background gambar",
        usage: ".removebg [gambar]"
      },
      {
        name: "restore",
        description: "Restore gambar rusak",
        usage: ".restore [gambar]"
      },
      {
        name: "retouch",
        description: "Perbaiki kualitas gambar",
        usage: ".retouch [gambar]"
      },
      {
        name: "screenshot",
        description: "Screenshot website",
        usage: ".screenshot [url]"
      },
      {
        name: "sharpen",
        description: "Pertajam gambar",
        usage: ".sharpen [gambar]"
      },
      {
        name: "superscale",
        description: "Tingkatkan resolusi gambar",
        usage: ".superscale [gambar]",
        premium: true
      },
      {
        name: "translate",
        description: "Terjemahkan teks",
        usage: ".translate [teks]"
      },
      {
        name: "tts",
        description: "Text to speech",
        usage: ".tts [teks]"
      },
      {
        name: "unblur",
        description: "Pertajam gambar blur",
        usage: ".unblur [gambar]"
      },
      {
        name: "upload",
        description: "Upload file ke cloud",
        usage: ".upload [file]"
      },
      {
        name: "upscale",
        description: "Tingkatkan kualitas gambar",
        usage: ".upscale [gambar]"
      },
      {
        name: "weather",
        description: "Info cuaca daerah",
        usage: ".weather [kota]"
      },
      {
        name: "wikipedia",
        description: "Cari artikel Wikipedia",
        usage: ".wikipedia [query]"
      },
      {
        name: "zodiak",
        description: "Ramalan zodiak harian",
        usage: ".zodiak [zodiak]"
      }
    ]
  },
  {
    category: "Owner",
    commands: [
      {
        name: "addcoinuser",
        description: "Tambah koin user",
        usage: ".addcoinuser [nomor] [jumlah]",
        ownerOnly: true
      },
      {
        name: "addpremuser",
        description: "Tambah user premium",
        usage: ".addpremuser [nomor]",
        ownerOnly: true
      },
      {
        name: "banuser",
        description: "Ban user",
        usage: ".banuser [nomor]",
        ownerOnly: true
      },
      {
        name: "broadcastgc",
        description: "Broadcast ke semua grup",
        usage: ".broadcastgc [pesan]",
        ownerOnly: true
      },
      {
        name: "checkapis",
        description: "Cek status API",
        usage: ".checkapis",
        ownerOnly: true
      },
      {
        name: "delpremuser",
        description: "Hapus user premium",
        usage: ".delpremuser [nomor]",
        ownerOnly: true
      },
      {
        name: "fixdb",
        description: "Perbaiki database",
        usage: ".fixdb",
        ownerOnly: true
      },
      {
        name: "join",
        description: "Join grup via link",
        usage: ".join [link]",
        ownerOnly: true
      },
      {
        name: "listbanned",
        description: "List user banned",
        usage: ".listbanned",
        ownerOnly: true
      },
      {
        name: "listpremium",
        description: "List user premium",
        usage: ".listpremium",
        ownerOnly: true
      },
      {
        name: "mode",
        description: "Ubah mode bot",
        usage: ".mode [mode]",
        ownerOnly: true
      },
      {
        name: "oadd",
        description: "Add member (owner)",
        usage: ".oadd [nomor]",
        ownerOnly: true,
        groupOnly: true
      },
      {
        name: "odemote",
        description: "Demote admin (owner)",
        usage: ".odemote @user",
        ownerOnly: true,
        groupOnly: true
      },
      {
        name: "ohidetag",
        description: "Hidetag (owner)",
        usage: ".ohidetag [teks]",
        ownerOnly: true,
        groupOnly: true
      },
      {
        name: "okick",
        description: "Kick member (owner)",
        usage: ".okick @user",
        ownerOnly: true,
        groupOnly: true
      },
      {
        name: "opromote",
        description: "Promote member (owner)",
        usage: ".opromote @user",
        ownerOnly: true,
        groupOnly: true
      },
      {
        name: "osettext",
        description: "Set teks (owner)",
        usage: ".osettext [teks]",
        ownerOnly: true
      },
      {
        name: "otagall",
        description: "Tag all (owner)",
        usage: ".otagall [teks]",
        ownerOnly: true,
        groupOnly: true
      },
      {
        name: "readviewonce",
        description: "Baca pesan view once",
        usage: ".readviewonce",
        ownerOnly: true
      },
      {
        name: "restart",
        description: "Restart bot",
        usage: ".restart",
        ownerOnly: true
      },
      {
        name: "setbotpp",
        description: "Set foto profil bot",
        usage: ".setbotpp",
        ownerOnly: true
      },
      {
        name: "unbanuser",
        description: "Unban user",
        usage: ".unbanuser [nomor]",
        ownerOnly: true
      }
    ]
  },
  {
    category: "Information",
    commands: [
      {
        name: "about",
        description: "Info tentang bot",
        usage: ".about"
      },
      {
        name: "owner",
        description: "Info owner bot",
        usage: ".owner"
      },
      {
        name: "donate",
        description: "Info donasi",
        usage: ".donate"
      },
      {
        name: "listapis",
        description: "List API yang digunakan",
        usage: ".listapis"
      },
      {
        name: "ping",
        description: "Cek ping bot",
        usage: ".ping"
      },
      {
        name: "price",
        description: "List harga premium",
        usage: ".price"
      },
      {
        name: "sc",
        description: "Source code bot",
        usage: ".sc"
      },
      {
        name: "server",
        description: "Info server bot",
        usage: ".server"
      },
      {
        name: "speed",
        description: "Test kecepatan bot",
        usage: ".speed"
      },
      {
        name: "tqto",
        description: "Thanks to",
        usage: ".tqto"
      },
      {
        name: "uptime",
        description: "Waktu aktif bot",
        usage: ".uptime"
      }
    ]
  }
];

export default function Commands() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("AI Chat");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
    </div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">Daftar Perintah</h1>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {commandList.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.category
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>

          {/* Commands Table */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-black dark:text-white">Perintah</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-black dark:text-white">Deskripsi</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-black dark:text-white">Penggunaan</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-black dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {commandList
                    .find(c => c.category === activeCategory)
                    ?.commands.map((cmd, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                        <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                          {cmd.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">
                          {cmd.description}
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-black dark:text-white">
                            {cmd.usage}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {cmd.premium && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
                                Premium
                              </span>
                            )}
                            {cmd.groupOnly && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                Grup
                              </span>
                            )}
                            {cmd.ownerOnly && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                Owner
                              </span>
                            )}
                            {cmd.privateOnly && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300">
                                Private
                              </span>
                            )}
                            {!cmd.premium && !cmd.groupOnly && !cmd.ownerOnly && !cmd.privateOnly && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                Free
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Note */}
          <p className="text-sm text-gray-700 dark:text-gray-400 mt-6 text-center">
            Gunakan <code className="text-sm bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-black dark:text-white">.help [perintah]</code> untuk informasi lebih detail tentang perintah tertentu
          </p>
        </div>
      </main>
    </div>
  );
} 