import { supabase } from '../../database/supabase.js';

export async function processAndUploadImage(file, bucketName = 'properti-images') {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            
            img.onload = async () => {
                // 1. Buat Canvas untuk Resize
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 1024; // Lebar maksimal 1024px
                const scale = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // 2. Convert ke .webp dengan kualitas 0.7 (70% - sangat ringan)
                canvas.toBlob(async (blob) => {
                    if (!blob) return reject("Gagal convert gambar");

                    // 3. Upload ke Supabase
                    const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.webp`;
                    const filePath = `listings/${fileName}`;

                    const { error } = await supabase.storage
                        .from(bucketName)
                        .upload(filePath, blob, {
                            contentType: 'image/webp'
                        });

                    if (error) return reject(error);

                    const { data: publicUrlData } = supabase.storage
                        .from(bucketName)
                        .getPublicUrl(filePath);

                    resolve(publicUrlData.publicUrl);
                }, 'image/webp', 0.7);
            };
        };
        reader.onerror = (error) => reject(error);
    });
}
