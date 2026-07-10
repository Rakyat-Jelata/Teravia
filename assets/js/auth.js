import { supabase } from '../database/supabase.js'; 

// PENTING: Path import supabase mungkin perlu disesuaikan 
// Jika auth.js di dalam /assets/js/ dan supabase.js di /database/ 
// maka gunakan: ../database/supabase.js (keluar 1 folder lalu masuk ke database)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LOGIKA UI (DIPINDAH DARI HTML) ---
    const hamburger = document.getElementById('hamburgerMenu');
    const navLinks = document.getElementById('navLinks');
    if (hamburger) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    const toggleIcon = document.querySelector('.toggle-password-btn');
    if (toggleIcon) {
        toggleIcon.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            this.classList.toggle('fa-eye', isPassword);
            this.classList.toggle('fa-eye-slash', !isPassword);
        });
    }

    // --- LOGIKA SUPABASE (REGISTER) ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const fullName = document.getElementById('reg-name').value;
            
            const { error } = await supabase.auth.signUp({
                email, password, options: { data: { full_name: fullName } }
            });
            if (error) alert("Gagal: " + error.message);
            else alert("Sukses! Silakan cek email.");
        });
    }

    // --- LOGIKA SUPABASE (LOGIN) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Sesuaikan ID input di login.html dengan di bawah ini
            const email = document.querySelector('input[type="email"]').value;
            const password = document.getElementById('login-password').value;
            
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) alert("Login Gagal: " + error.message);
            else window.location.href = 'index.html';
        });
    }
});
