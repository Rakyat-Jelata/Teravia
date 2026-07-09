document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LOGIKA HAMBURGER MENU (MOBILE VIEW)
    // ==========================================
    const btnHamburger = document.getElementById("btn-hamburger");
    const mobileMenu = document.getElementById("mobile-menu");

    if (btnHamburger && mobileMenu) {
        btnHamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle("hidden");
        });

        // Klik di luar menu untuk menutup otomatis
        document.addEventListener("click", (e) => {
            if (!mobileMenu.classList.contains("hidden") && !mobileMenu.contains(e.target) && e.target !== btnHamburger) {
                mobileMenu.classList.add("hidden");
            }
        });
    }

    // ==========================================
    // 2. LOGIKA TAMPIL/SEMBUNYI DETAIL PROPERTI
    // ==========================================
    const selectJenis = document.getElementById("select-jenis");
    const formDetailIds = ["form-rumah", "form-tanah", "form-hotel", "form-perkantoran", "form-rs"];

    if (selectJenis) {
        selectJenis.addEventListener("change", (e) => {
            const targetValue = e.target.value;
            // Sembunyikan semua spesifikasi dulu
            formDetailIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.add("hidden");
            });
            // Munculkan yang dipilih saja
            if (targetValue) {
                const selectedForm = document.getElementById(`form-${targetValue}`);
                if (selectedForm) selectedForm.classList.remove("hidden");
            }
        });
    }

    // ==========================================
    // 3. LOGIKA API WILAYAH INDONESIA (JSDELIVR)
    // ==========================================
    const baseUrl = "https://cdn.jsdelivr.net/gh/fajarghifar/api-wilayah-indonesia@master/api";
    
    const selectProv = document.getElementById("provinsi");
    const selectKab = document.getElementById("kabupaten");
    const selectKec = document.getElementById("kecamatan");
    const selectKel = document.getElementById("kelurahan");

    if (selectProv) {
        // Ambil Data Provinsi Saat Halaman Terbuka
        fetch(`${baseUrl}/provinces.json`)
            .then(res => res.json())
            .then(data => {
                data.sort((a, b) => a.name.localeCompare(b.name));
                data.forEach(prov => {
                    let opt = document.createElement("option");
                    opt.value = prov.id;
                    opt.textContent = prov.name;
                    selectProv.appendChild(opt);
                });
            }).catch(err => console.error("Gagal memuat provinsi:", err));

        // Event Provinsi -> Ambil Kabupaten
        selectProv.addEventListener("change", (e) => {
            const provId = e.target.value;
            selectKab.innerHTML = '<option value="">-- Pilih Kabupaten/Kota --</option>';
            selectKec.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
            selectKel.innerHTML = '<option value="">-- Pilih Kelurahan/Desa --</option>';
            selectKab.disabled = true; selectKec.disabled = true; selectKel.disabled = true;

            if (provId) {
                fetch(`${baseUrl}/regencies/${provId}.json`)
                    .then(res => res.json())
                    .then(data => {
                        data.sort((a, b) => a.name.localeCompare(b.name));
                        data.forEach(kab => {
                            let opt = document.createElement("option");
                            opt.value = kab.id;
                            opt.textContent = kab.name;
                            selectKab.appendChild(opt);
                        });
                        selectKab.disabled = false;
                    }).catch(err => console.error(err));
            }
        });

        // Event Kabupaten -> Ambil Kecamatan
        selectKab.addEventListener("change", (e) => {
            const kabId = e.target.value;
            selectKec.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
            selectKel.innerHTML = '<option value="">-- Pilih Kelurahan/Desa --</option>';
            selectKec.disabled = true; selectKel.disabled = true;

            if (kabId) {
                fetch(`${baseUrl}/districts/${kabId}.json`)
                    .then(res => res.json())
                    .then(data => {
                        data.sort((a, b) => a.name.localeCompare(b.name));
                        data.forEach(kec => {
                            let opt = document.createElement("option");
                            opt.value = kec.id;
                            opt.textContent = kec.name;
                            selectKec.appendChild(opt);
                        });
                        selectKec.disabled = false;
                    }).catch(err => console.error(err));
            }
        });

        // Event Kecamatan -> Ambil Kelurahan
        selectKec.addEventListener("change", (e) => {
            const kecId = e.target.value;
            selectKel.innerHTML = '<option value="">-- Pilih Kelurahan/Desa --</option>';
            selectKel.disabled = true;

            if (kecId) {
                fetch(`${baseUrl}/villages/${kecId}.json`)
                    .then(res => res.json())
                    .then(data => {
                        data.sort((a, b) => a.name.localeCompare(b.name));
                        data.forEach(kel => {
                            let opt = document.createElement("option");
                            opt.value = kel.id;
                            opt.textContent = kel.name;
                            selectKel.appendChild(opt);
                        });
                        selectKel.disabled = false;
                    }).catch(err => console.error(err));
            }
        });
    }
});
                          
