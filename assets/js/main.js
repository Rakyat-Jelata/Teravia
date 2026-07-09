import { loadComponent } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    // Jalankan inisialisasi platform TERAVIA
    initPlatform();

    async function initPlatform() {
        try {
            // Menggunakan path relatif tanpa "/" di depan agar aman di hosting Vercel/Netlify
            await loadComponent("navbar-container", "components/navbar.html");
            await loadComponent("footer-container", "components/footer.html");
            await loadComponent("main-content", "pages/home.html");
            
            // Jalankan fungsi interaktif setelah semua elemen sukses ter-render
            initResponsiveMenu();
        } catch (error) {
            console.error("Gagal menginisialisasi komponen utama TERAVIA:", error);
            // Tampilkan pesan error ke user jika fetch gagal
            const mainContent = document.getElementById("main-content");
            if (mainContent) {
                mainContent.innerHTML = `<p style="text-align:center; padding:50px; color:red;">Gagal memuat halaman. Silakan muat ulang browser Anda.</p>`;
            }
        }
    }

    function initResponsiveMenu() {
        const burger = document.getElementById("mobile-menu");
        if (burger) {
            burger.addEventListener("click", () => {
                const navLinks = document.querySelector(".nav-links");
                if (navLinks) navLinks.classList.toggle("nav-active");
            });
        }
    }
});

