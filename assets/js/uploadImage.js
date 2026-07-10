import { supabase } from '../../database/supabase.js';

/**
 * Fungsi untuk memproses, mengompres, dan mengupload foto ke Supabase Storage
 * @param {File} file - File foto dari input HTML
 * @param {string} bucketName - Nama bucket di Supabase (default: 'properti-images')
 * @returns {Promise<string|null>} - URL foto publik atau null jika gagal
 */
export async function processAndUploadImage(file, bucketName = 'properti-images') {
    // 1. Validasi tipe file (Pastikan hanya gambar)
    if (!file.type.startsWith('image/')) {
        alert("File bukan gambar!");
        return null;
    }

    // 2. Opsi Kompresi: Target max 100KB, dimensi max 1024px
    const options = {
        maxSizeMB: 0.1, 
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    };

    try {
        console.log("Memulai kompresi foto...");
        const compressedFile = await imageCompression(file, options);
        console.log(`Foto dikompresi: ${(compressedFile.size / 1024).toFixed(2)} KB`);

        // 3. Buat nama file unik agar tidak bentrok
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        const filePath = `listings/${fileName}`;

        // 4. Upload ke Supabase
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, compressedFile);

        if (error) throw error;

        // 5. Dapatkan Public URL
        const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        return publicUrlData.publicUrl;

    } catch (error) {
        console.error("Kesalahan saat upload:", error);
        return null;
    }
}

