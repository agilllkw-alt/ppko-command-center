<!DOCTYPE html>
<html lang="id" class="overflow-x-hidden">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>COMMAND CENTER | CARA'DE PPKO UNHAS</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">

    <style>
        :root { --p-green: #16a34a; --dark: #064e3b; }
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background: linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%); 
            background-attachment: fixed;
            color: var(--dark);
            padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
        }
        
        /* Navigasi Scrollable untuk Mobile */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Animasi Transisi Tab */
        .tab-content { display: none; }
        .tab-content.active { display: block; animation: fadeInUp 0.5s ease-out; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* Style Khusus Navigasi */
        .nav-btn.active { background: var(--p-green); color: white; box-shadow: 0 10px 15px rgba(22, 163, 74, 0.2); }
        
        /* Map Responsif */
        #map { height: 400px; width: 100%; border-radius: 2rem; border: 6px solid white; z-index: 1; }
        @media (max-width: 640px) { #map { height: 300px; border-radius: 1.5rem; } }

        /* Card Effect */
        .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.8); }
        .member-card { transition: all 0.3s ease; }
        @media (min-width: 1024px) { .member-card:hover { transform: translateY(-10px); background: white; } }
    </style>
</head>
<body class="overflow-x-hidden">

    <!-- HEADER: Berbeda tampilan PC vs HP -->
    <header class="sticky top-0 z-[100] glass border-b border-green-200 px-4 py-3 md:py-5">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            <!-- Branding: Di Kiri (PC), Di Tengah (HP) -->
            <div class="flex items-center gap-3 bg-white/50 p-2 md:p-3 rounded-2xl border border-white shadow-sm w-full md:w-auto justify-center md:justify-start">
                <img src="logo-unhas.png" alt="UNHAS" class="h-8 md:h-10 w-auto object-contain">
                <img src="logo-bem.png" alt="BEM" class="h-8 md:h-10 w-auto object-contain">
                <img src="logo-gowa.png" alt="GOWA" class="h-8 md:h-10 w-auto object-contain">
                <div class="w-[1px] h-8 bg-green-200 mx-1 hidden md:block"></div>
                <div class="text-center md:text-left">
                    <h1 class="font-['Space_Grotesk'] text-lg md:text-xl font-black tracking-tighter text-green-900 leading-none">CARA'DE</h1>
                    <p class="text-[8px] md:text-[10px] font-black text-green-600 uppercase tracking-widest">PPKO UNHAS 2026</p>
                </div>
            </div>

            <!-- Tab Utama: Berjejer (PC), Geser (HP) -->
            <nav class="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto justify-start md:justify-end pb-1 md:pb-0">
                <button onclick="showTab('tab-modul')" id="btn-tab-modul" class="nav-btn active flex-none px-6 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all italic border border-green-100 shadow-sm">Modul Hub</button>
                <button onclick="showTab('tab-tim')" id="btn-tab-tim" class="nav-btn flex-none px-6 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all italic border border-green-100 shadow-sm">Personil</button>
                <button onclick="showTab('tab-lokasi')" id="btn-tab-lokasi" class="nav-btn flex-none px-6 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all italic border border-green-100 shadow-sm">Lokasi Maps</button>
            </nav>
        </div>
    </header>

    <!-- TAB 1: MODUL HUB -->
    <main id="tab-modul" class="tab-content active max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <!-- Selector Modul: Horizontal Scroll di HP -->
        <div class="flex md:grid md:grid-cols-5 gap-3 mb-8 overflow-x-auto no-scrollbar pb-4 md:pb-0">
            <button onclick="setModule(1)" class="flex-none w-36 md:w-full p-4 glass rounded-3xl text-[9px] md:text-[10px] font-black uppercase border-b-4 border-orange-500 italic shadow-sm hover:bg-white transition">01 APPARE'</button>
            <button onclick="setModule(2)" class="flex-none w-36 md:w-full p-4 glass rounded-3xl text-[9px] md:text-[10px] font-black uppercase border-b-4 border-green-600 italic shadow-sm hover:bg-white transition">02 MAGGOT</button>
            <button onclick="setModule(3)" class="flex-none w-36 md:w-full p-4 glass rounded-3xl text-[9px] md:text-[10px] font-black uppercase border-b-4 border-blue-500 italic shadow-sm hover:bg-white transition">03 PANGE'BA</button>
            <button onclick="setModule(4)" class="flex-none w-36 md:w-full p-4 glass rounded-3xl text-[9px] md:text-[10px] font-black uppercase border-b-4 border-emerald-600 italic shadow-sm hover:bg-white transition">04 PATTAPPARANG</button>
            <button onclick="setModule(5)" class="flex-none w-36 md:w-full p-4 glass rounded-3xl text-[9px] md:text-[10px] font-black uppercase border-b-4 border-purple-500 italic shadow-sm hover:bg-white transition">05 PA'BULOANG</button>
        </div>
        
        <!-- Area Konten Modul: Grid 1 Kolom (HP), 2 Kolom (PC) -->
        <div id="module-display" class="bg-white rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 shadow-2xl shadow-green-900/10 border border-green-50 min-h-[450px]">
            <!-- Injected by JS -->
        </div>
    </main>

    <!-- TAB 2: PERSONIL (GRID RESPONSIF) -->
    <main id="tab-tim" class="tab-content max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <!-- Dosen Pendamping: Lebar di PC, Stack di HP -->
        <div class="mb-12 bg-green-900 text-white p-8 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-2xl relative overflow-hidden">
            <div class="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl flex items-center justify-center text-4xl md:text-5xl shadow-xl z-10 border-4 border-green-700/20">👨‍🏫</div>
            <div class="text-center md:text-left z-10">
                <p class="text-[10px] md:text-[12px] font-black text-green-400 uppercase tracking-widest mb-1 italic">Dosen Pendamping</p>
                <h3 class="text-2xl md:text-4xl font-black uppercase italic tracking-tighter leading-tight">Husnul Mubarak, S.TP., M.Si</h3>
                <p class="text-[10px] md:text-sm font-bold opacity-60 mt-1">NIP. 198904062024061001 // Universitas Hasanuddin</p>
            </div>
        </div>

        <h2 class="text-3xl md:text-5xl font-black italic text-green-950 uppercase text-center mb-10 tracking-tighter">The Personnel</h2>

        <!-- Grid: 2 Kolom (HP), 5 Kolom (PC) -->
        <div id="team-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
            <!-- Injected by JS -->
        </div>
    </main>

    <!-- TAB 3: LOKASI (MAPS FULL WIDTH) -->
    <main id="tab-lokasi" class="tab-content max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-black italic text-green-950 uppercase tracking-tighter">Field Hub</h2>
            <p class="text-[10px] md:text-xs font-bold text-green-600 uppercase mt-2 tracking-widest italic">Desa Tinggimae, Barombong, Kab. Gowa</p>
        </div>
        
        <div id="map"></div>
        
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 italic">
            <div class="glass p-6 md:p-10 rounded-[2rem] border-2 border-white shadow-lg">
                <h4 class="font-black text-green-900 uppercase text-sm md:text-lg mb-4">Informasi Sasaran</h4>
                <p class="text-xs md:text-sm leading-relaxed text-green-800 font-bold opacity-70">Reaktivasi kolam ikan & pembangunan Smart Greenhouse berbasis IoT untuk kemandirian pangan desa.</p>
            </div>
            <div class="flex flex-col gap-3">
                <div class="bg-white/80 p-5 rounded-2xl border border-white flex justify-between items-center">
                    <span class="text-[10px] font-black uppercase text-green-600">Jarak Kampus</span>
                    <span class="font-bold text-green-950">±20 KM</span>
                </div>
                <div class="bg-green-800 p-5 rounded-2xl text-white flex justify-between items-center shadow-lg">
                    <span class="text-[10px] font-black uppercase text-green-200">Waktu Tempuh</span>
                    <span class="font-bold">±34 Menit</span>
                </div>
            </div>
        </div>
    </main>

    <footer class="py-16 text-center opacity-30 italic">
        <p class="text-[9px] font-black uppercase tracking-[1em] text-green-900">CARA'DE // PPKO UNHAS // 2026</p>
    </footer>

    <script>
        // DATA TETAP SAMA
        const members = [
            { n: "Yunita Azzahra", nim: "G031241019", r: "Ketua Tim" },
            { n: "Abdullah Azzam", nim: "G071241032", r: "Anggota" },
            { n: "Andina Putri S.", nim: "G031241054", r: "Anggota" },
            { n: "Dwi Aliyah Ananta", nim: "G041241031", r: "Anggota" },
            { n: "Nurhikmah", nim: "G041241076", r: "Anggota" },
            { n: "Muh. Fadhil", nim: "G041241026", r: "Anggota" },
            { n: "Muh. Shadiq A.R.", nim: "G041241014", r: "Anggota" },
            { n: "Ahmad Fachraisy A.", nim: "G071241028", r: "Anggota" },
            { n: "Amirul Mukminin J.", nim: "G071241039", r: "Anggota" },
            { n: "Nurfahmi", nim: "G041231057", r: "Anggota" },
            { n: "Fitri Ramadhani", nim: "L061241072", r: "Anggota" },
            { n: "Andi Naimah A.", nim: "E011241026", r: "Anggota" },
            { n: "Muhammad Agil Agus", nim: "G041241004", r: "Anggota" },
            { n: "Diva Najwah Sabila", nim: "G031241015", r: "Anggota" },
            { n: "Pandin Bidangan T.", nim: "G011231170", r: "Anggota" }
        ];

        const modules = {
            1: { t: "APPARE'", s: "Teknologi Pakan", i: "⚙️", c: "orange", d: "Mesin produksi pakan mandiri dari limbah lokal." },
            2: { t: "MAGGOT", s: "Protein Tinggi", i: "🪱", c: "green", d: "Budidaya Maggot BSF untuk nutrisi pakan alternatif." },
            3: { t: "PANGE'BA", s: "Otomasi Aerasi", i: "🌊", c: "blue", d: "Sistem penjaga oksigen kolam otomatis & akuaponik." },
            4: { t: "PATTAPPARANG", s: "Smart Greenhouse", i: "🌿", c: "emerald", d: "Monitoring iklim mikro berbasis sensor IoT (Internet of Things)." },
            5: { t: "PA'BULOANG", s: "Hilirisasi Digital", i: "📈", c: "purple", d: "Strategi pemasaran dan branding produk inovasi desa." }
        };

        const grid = document.getElementById('team-grid');
        grid.innerHTML = members.map(m => `
            <div class="member-card glass p-4 md:p-8 rounded-[1.8rem] md:rounded-[2.5rem] border-b-4 md:border-b-8 ${m.r === 'Ketua Tim' ? 'border-green-600 bg-white' : 'border-green-200'}">
                <div class="w-10 h-10 md:w-14 md:h-14 bg-green-100 rounded-xl md:rounded-2xl mb-4 flex items-center justify-center font-black text-green-700 text-[10px] md:text-xs shadow-inner uppercase italic">${m.n.charAt(0)}${m.n.split(' ').pop().charAt(0)}</div>
                <h4 class="text-[9px] md:text-[11px] font-black uppercase text-green-950 italic leading-tight mb-1">${m.n}</h4>
                <p class="text-[7px] md:text-[8px] font-bold text-green-600 uppercase tracking-widest">${m.nim}</p>
                ${m.r === 'Ketua Tim' ? '<span class="inline-block mt-3 px-2 py-0.5 bg-green-600 text-white text-[6px] md:text-[7px] font-black rounded-full uppercase italic">Leader</span>' : ''}
            </div>
        `).join('');

        function showTab(id) {
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            document.getElementById('btn-' + id).classList.add('active');
            if(id === 'tab-lokasi') setTimeout(initMap, 400);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function setModule(id) {
            const m = modules[id];
            document.getElementById('module-display').innerHTML = `
                <div class="flex flex-col lg:flex-row gap-8 md:gap-16 items-center animate-fadeIn text-center lg:text-left">
                    <div class="text-[100px] md:text-[160px] drop-shadow-2xl animate-pulse select-none">${m.i}</div>
                    <div class="flex-1 space-y-5 md:space-y-8">
                        <div>
                            <span class="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-${m.c}-600 bg-${m.c}-50 px-4 py-1 rounded-full italic font-bold">Modul 0${id}</span>
                            <h2 class="text-3xl md:text-6xl font-black italic text-green-950 uppercase leading-none mt-4 md:mt-8 tracking-tighter">${m.t}</h2>
                            <h4 class="text-sm md:text-2xl font-bold text-green-600 italic mt-2">${m.s}</h4>
                        </div>
                        <p class="text-green-900/70 text-sm md:text-xl italic border-l-4 border-green-100 pl-4 md:pl-8 leading-relaxed">"${m.d}"</p>
                        <button onclick="window.open('modul${id}.pdf', '_blank')" class="bg-green-700 hover:bg-green-800 text-white w-full lg:w-auto px-10 py-5 rounded-2xl md:rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-green-900/20 transition-all active:scale-95 italic">Akses Dokumen PDF</button>
                    </div>
                </div>
            `;
        }

        let map;
        function initMap() {
            if (map) { map.invalidateSize(); return; }
            map = L.map('map').setView([-5.2284, 119.4624], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([-5.2284, 119.4624]).addTo(map).bindPopup("<b>Desa Tinggimae</b>").openPopup();
        }

        window.onload = () => setModule(1);
    </script>
</body>
</html>
