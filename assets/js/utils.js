// Utilitas Global TERAVIA
export const loadComponent = async (targetId, url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Gagal memuat komponen: ${url}`);
        const html = await response.text();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.innerHTML = html;
        }
    } catch (error) {
        console.error("Terjadi kesalahan pada Component Loader:", error);
    }
};

