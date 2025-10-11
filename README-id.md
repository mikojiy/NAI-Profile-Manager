# 📝 NovelAI Profile Manager

Script Tampermonkey ini dirancang khusus untuk pengguna **NovelAI Image** yang ingin mengelola prompt dengan lebih cepat, rapi, dan fleksibel — tanpa mengubah satu pun istilah prompt asli kamu (seperti `twintail`, `masterpiece`, atau `school uniform`). Semua tetap seperti yang kamu tulis.

Berikut penjelasan lengkap semua fitur, berdasarkan cara kerja script-nya:

---

## 🎯 Profil Prompt

Simpan pasangan prompt positif dan negatif sebagai **profil bernama** — seperti preset pribadi.

- Setiap profil menyimpan dua bagian:  
  ✅ **Prompt positif** (yang kamu inginkan)  
  ❌ **Prompt negatif** (yang ingin dihindari)
- Buat sebanyak mungkin: `anime girl`, `cyberpunk city`, `miku concert`, dll.
- Ganti, simpan, hapus, atau urutkan ulang kapan saja.

> 💡 **Tips**: Gunakan `Ctrl+1` sampai `Ctrl+9` untuk langsung terapkan profil #1–#9. `Ctrl+0` = profil #10. Tidak perlu klik!

---

## 🌐 Variabel Global (`{nama}`)

Gunakan placeholder untuk **mengganti teks panjang** dengan satu nama pendek.

**Contoh**:  
Buat variabel:  miku = twintail, blue hair, aqua eyes

Lalu di prompt, cukup tulis:  masterpiece, {miku}, looking at viewer


Saat diterapkan, `{miku}` akan diganti otomatis menjadi nilai lengkapnya.

- Kelola semua variabel lewat tombol **🔤 Variabel Global**.
- Format: `nama=nilai` (satu baris per variabel).

> ⚠️ Variabel **tidak langsung mengganti** teks asli — kamu akan diminta isi nilainya dulu lewat dialog sebelum ditempel.

---

## 🎲 Wildcard (`[nama]`)

Masukkan **pilihan acak** dari daftar — cocok untuk eksperimen atau batch generation.

**Contoh**:  
Buat wildcard:  karakter = miku, teto, luka

Gunakan di prompt:  [karakter], solo, portrait


Saat diterapkan, muncul popup untuk **pilih salah satu** (atau kosongkan untuk menghapus wildcard-nya).

---

## 🔍 Integrasi Danbooru (`{DB}`)

Ambil **tag asli dari Danbooru** langsung ke editor NovelAI.

1. Tulis `{DB}` di prompt (misal: `masterpiece, {DB}, solo`).
2. Saat klik **Timpa** atau **Tambahkan**, muncul dialog minta **ID posting Danbooru** (contoh: `789532`).
3. Script ambil tag karakter, copyright, dan umum — lalu **hapus tag yang masuk daftar hitam** (seperti `text`, `watermark`, dll).
4. Hasilnya langsung dimasukkan ke tempat `{DB}`.

> ✅ Tag otomatis diubah dari `blue_eyes` jadi `blue eyes`, dan duplikat dihapus.

Kamu juga bisa pakai tombol **🔍 Danbooru** untuk ambil tag **tanpa membuat profil**.

---

## 🛑 Daftar Hitam Tag

Tidak ingin `white background` atau `upper body` muncul dari Danbooru?

- Masuk ke **⚙️ Pengaturan & Daftar Hitam**.
- Tambahkan tag yang ingin dihapus, pisahkan dengan koma:  
  `white background, text, watermark, simple background, upper body`
- Tag ini **otomatis dihilangkan** setiap kali ambil dari Danbooru.

---

## ➕ Timpa vs. Tambahkan

- **🔄 Timpa**: Mengganti seluruh isi editor (positif & negatif) dengan isi profil.
- **➕ Tambahkan**: Menambahkan isi profil ke akhir teks yang sudah ada (dipisah koma).

Keduanya bekerja **sekaligus di dua editor**, dan menghormati posisi kursor.

---

## 💾 Cadangan & Pulihkan Semua

Ekspor **semua data** — profil, variabel, wildcard, daftar hitam, pengaturan tampilan, posisi ikon — dalam satu file `.json`.

- **📦 Cadangan Lengkap**: Simpan semua.
- **🔁 Pulihkan Semua**: Muat kembali persis seperti sebelumnya.

> 🔒 Data hanya disimpan di browser kamu — tidak pernah dikirim ke mana pun.

---

## ⌨️ Pintasan Keyboard

| Pintasan | Aksi |
|--------|------|
| `Ctrl+1` → `Ctrl+0` | Terapkan profil #1–#10 |
| `Ctrl+Q` | Cari cepat: ketik **nama** atau **nomor** profil |

Bekerja meski panel tertutup!

---

## 🌗 Mode Gelap & Ikon Geser

- Aktifkan/nonaktifkan mode gelap lewat tombol **🌙/☀️**.
- Geser ikon 📝 ke mana saja di layar — posisinya diingat selamanya.

---

## 🔄 Pemeriksa Pembaruan Otomatis

Script otomatis cek versi terbaru saat kamu buka NovelAI. Jika ada update, muncul notifikasi kecil di pojok kanan atas dengan tombol **“Perbarui Sekarang”**.

---

## ❓ Dialog “Isi Variabel Saat Terapkan”

Setiap kali prompt-mu mengandung:
- `{variabel}`
- `[wildcard]`
- `{DB}`

...maka sebelum ditempel, muncul **dialog sementara** untuk:
- Isi nilai variabel
- Pilih opsi wildcard
- Masukkan ID Danbooru

**Profil asli tetap utuh** — ini hanya untuk penggunaan sekali jalan.

---

## 💖 Dukung Pengembang

Script ini **gratis, open-source, dan tanpa iklan** — tapi kalau membantu alur kerjamu, pertimbangkan untuk traktir saya kopi! ☕

→ [https://ko-fi.com/mikojiy](https://ko-fi.com/mikojiy)

Setiap donasi membantu script ini tetap hidup dan terus diperbarui.

---

Dibuat dengan ❤️ untuk pengguna NovelAI yang percaya bahwa **mengelola prompt harus cepat, fleksibel, dan menyenangkan** — tanpa kompromi pada kreativitasmu.
