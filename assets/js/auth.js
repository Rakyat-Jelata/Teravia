import { supabase } from '../database/supabase.js';

// 1. LOGIKA REGISTER
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const fullName = document.getElementById('full_name').value;

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: { data: { full_name: fullName } }
        });

        if (error) {
            alert("Gagal Daftar: " + error.message);
        } else {
            alert("Pendaftaran Berhasil! Silakan verifikasi email Anda.");
            window.location.href = '../login.html'; // Arahkan ke halaman login
        }
    });
}

// 2. LOGIKA LOGIN
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert("Login Gagal: " + error.message);
        } else {
            alert("Login Berhasil! Selamat datang di Teravia.");
            window.location.href = '../index.html'; // Arahkan ke beranda setelah login
        }
    });
}

