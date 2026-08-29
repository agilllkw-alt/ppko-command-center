<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COMMAND CENTER | CARA'DE PPKO UNHAS</title>
    
    <!-- Framework & Library -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">

    <style>
        :root { --p-green: #16a34a; --s-green: #f0fdf4; --dark: #064e3b; }
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background: linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%); 
            background-attachment: fixed;
            color: var(--dark);
        }
        .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.9); }
        .tab-content { display: none; }
        .tab-content.active { display: block; animation: fadeIn 0.6s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .nav-btn.active { background: var(--p-green); color: white; shadow: 0 10px 15px rgba(22, 163, 74, 0.2); transform: scale(1.05); }
        #map { height: 450px; border-radius: 2.5rem; border: 6px solid white; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .member-card { transition: all 0.3s ease; }
        .member-card:hover { transform: translateY(-8px); background: white; }
    </style>
</head>
<body class="min-h-screen selection:bg-green-200">

    <!-- HEADER & NAVIGATION -->
    <header class="pt-6 pb-4 px-6 sticky top-0 z-50 glass border-b border-green-200 shadow-sm">
        <div class="max-w-7xl mx-auto flex flex-col gap-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                <!-- Branding Area -->
                <div class="flex items-center gap-4 bg-white/60 px-5 py-2.5 rounded-3xl border border-white shadow-inner">
                    <img src="logo-unhas.png" alt="UNHAS" class="h-10 w-auto object-contain">
                    <img src="logo-bem.png" alt="BEM" class="h-10 w-auto object-contain">
                    <img src="logo-gowa.png" alt="GOWA" class="h-10 w-auto object-contain">
                    <div class="h-8 w-[1.5px] bg-green-200 mx-1 hidden md:block"></div>
                    <div>
                        <h1 class="font-['Space_Grotesk'] text-xl font-bold tracking-tighter uppercase italic text-green-900 leading-none">CARA'DE</h1>
                        <p class="text-[9px] font-black text-green-600 uppercase tracking-widest">PPKO UNHAS 2026</p>
                    </div>
                </div>

                <!-- Main Tabs -->
                <nav class="flex bg-green-200/40 p-1.5 rounded-full border border-green-200 overflow-hidden">
                    <button onclick="showTab('tab-modul')" id="btn-tab-modul" class="nav-btn active px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all italic">Modul</button>
                    <button onclick="showTab('tab-tim')" id="btn-tab-tim" class="nav-btn px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all italic">Personil</button>
                    <button onclick="showTab('tab-lokasi')" id="btn-tab-lokasi" class="nav-btn px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all italic">Lokasi</button>
                </nav>
            </div>
        </div>
    </header>

    <!-- TAB 1: MODUL PEMBELAJARAN -->
    <main id="tab-modul" class="tab-content active max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
            <button onclick="setModule(1)" class="p-5 glass rounded-[2rem] text-[9px] font-black uppercase hover:bg-white transition-all border-b-4 border-orange-500 shadow-sm italic">01 APPARE'</button>
            <button onclick="setModule(2)" class="p-5 glass rounded-[2rem] text-[9px] font-black uppercase hover:bg-white transition-all border-b-4 border-green-600 shadow-sm italic">02 MAGGOT</button>
            <button onclick="setModule(3)" class="p-5 glass rounded-[2rem] text-[9px] font-black uppercase hover:bg-white transition-all border-b-4 border-blue-500 shadow-sm italic text-blue-600">03 PANGE'BA</button>
            <button onclick="setModule(4)" class="p-5 glass rounded-[2rem] text-[9px] font-black uppercase hover:bg-white transition-all border-b-4 border-emerald-600 shadow-sm italic text-emerald-600">04 PATTAPPARANG</button>
            <button onclick="setModule(5)" class="p-5 glass rounded-[2rem] text-[9px] font-black uppercase hover:bg-white transition-all border-b-4 border-purple-500 shadow-sm italic text-purple-600">05 PA'BULOANG</button>
        </div>
        
        <div id="module-display" class="bg-white rounded-[4rem] p-10 md:p-20 shadow-2xl shadow-green-900/5 border border-green-100 min-h-[550px] flex items-center justify-center">
            <!-- Data switching via JS -->
        </div>
    </main>

    <!-- TAB 2: PERSONIL TIM -->
    <main id="tab-tim" class="tab-content max-w-7xl mx-auto px-6 py-12">
        <!-- Dosen Pendamping -->
        <div class="mb-16 bg-green-900 text-white p-10 rounded-[3.5rem] flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-green-950/20 relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-green-800 rounded-full opacity-30"></div>
            <div class="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-5xl shadow-xl z-10 border-4 border-green-700/20">👨‍🏫</div>
            <div class="text-center md:text-left z-10">
                <p class="text-[12px] font-black text-green-400 uppercase tracking-[0.4em] mb-2 italic">Dosen Pendamping</p>
                <h3 class="text-4xl font-black uppercase italic tracking-tighter leading-tight">Husnul Mubarak, S.TP., M.Si</h3>
                <p class="text-sm font-bold opacity-60 mt-2">NIDN. 198904062024061001 // Univ. Hasanuddin</p>
            </div>
        </div>

        <div class="text-center mb-16">
            <h2 class="text-5xl font-black italic text-green-950 uppercase tracking-tighter">The Personnel</h2>
            <p class="text-xs font-bold text-green-600 uppercase tracking-[0.3em] mt-2 italic">Tim Pelaksana PPKO CARA'DE 2026</p>
        </div>

        <div id="team-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <!-- List Anggota Tim Injected via JS -->
        </div>
    </main>

    <!-- TAB 3: LOKASI PETA -->
    <main id="tab-lokasi" class="tab-content max-w-5xl mx-auto px-6 py-12">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-black italic text-green-950 uppercase tracking-tighter leading-none">Field Hub</h2>
            <p class="text-xs font-bold text-green-600 uppercase mt-3 tracking-[0.5em] italic">Desa Tinggimae, Kab. Gowa</p>
        </div>
        <div id="map"></div>
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 italic tracking-tighter">
            <div class="glass p-10 rounded-[3rem] border-2 border-white">
                <h4 class="font-black text-green-900 uppercase italic mb-6">Informasi Sasaran</h4>
                <p class="text-sm leading-relaxed text-green-800 font-bold opacity-70">Program difokuskan pada pemberdayaan masyarakat Desa Tinggimae melalui integrasi kolam ikan percontohan dan pengelolaan Greenhouse berbasis IoT untuk kemandirian pangan.</p>
            </div>
            <div class="glass p-10 rounded-[3rem] border-2 border-white flex flex-col justify-center">
                <div class="flex items-center gap-4 bg-green-600/5 p-4 rounded-2xl mb-3">
                    <span class="text-xl">📍</span>
                    <span class="text-xs font-black uppercase text-green-900 tracking-widest">Kecamatan Barombong</span>
                </div>
                <div class="flex items-center gap-4 bg-green-600/5 p-4 rounded-2xl">
                    <span class="text-xl">🕒</span>
                    <span class="text-xs font-black uppercase text-green-900 tracking-widest">34 Menit dari Unhas</span>
                </div>
            </div>
        </div>
    </main>

    <footer class="py-20 text-center opacity-30 italic">
        <p class="text-[9px] font-black uppercase tracking-[1em] text-green-900">CARA'DE // PPKO ORMAWA UNHAS // 2026</p>
    </footer>

    <script>
        // DATA 15 ANGGOTA TIM
        const members = [
            { n: "Yunita Azzahra", nim: "G031241019", y: "2024", r: "Ketua Tim" },
            { n: "Abdullah Azzam", nim: "G071241032", y: "2024", r: "Anggota" },
            { n: "Andina Putri Suryatmaja", nim: "G031241054", y: "2024", r: "Anggota" },
            { n: "Dwi Aliyah Ananta", nim: "G041241031", y: "2024", r: "Anggota" },
            { n: "Nurhikmah", nim: "G041241076", y: "2024", r: "Anggota" },
            { n: "Muh. Fadhil", nim: "G041241026", y: "2024", r: "Anggota" },
            { n: "Muh. Shadiq Athallah R.", nim: "G041241014", y: "2024", r: "Anggota" },
            { n: "Ahmad Fachraisy Azhari", nim: "G071241028", y: "2024", r: "Anggota" },
            { n: "Amirul Mukminin Jafar", nim: "G071241039", y: "2024", r: "Anggota" },
            { n: "Nurfahmi", nim: "G041231057", y: "2023", r: "Anggota" },
            { n: "Fitri Ramadhani", nim: "L061241072", y: "2024", r: "Anggota" },
            { n: "Andi Naimah Al-Amin", nim: "E011241026", y: "2024", r: "Anggota" },
            { n: "Muhammad Agil Agus", nim: "G041241004", y: "2024", r: "Anggota" },
            { n: "Diva Najwah Sabila", nim: "G031241015", y: "2024", r: "Anggota" },
            { n: "Pandin Bidangan Toding", nim: "G011231170", y: "2023", r: "Anggota" }
        ];

        // DATA 5 MODUL
        const modules = {
            1: { t: "CARA'DE APPARE'", s: "Teknologi Produksi Pakan", i: "⚙️", c: "orange", d: "Optimalisasi biaya pakan mandiri melalui pemanfaatan limbah lokal." },
            2: { t: "CARA'DE LEMBANG MAGGOT", s: "Biokonversi Protein", i: "🪱", c: "green", d: "Budidaya Maggot BSF sebagai agen pengurai dan nutrisi tinggi pakan." },
            3: { t: "CARA'DE PANGE'BA", s: "Otomasi Aerasi Kolam", i: "🌊", c: "blue", d: "Sistem penjaga oksigen otomatis terintegrasi akuaponik." },
            4: { t: "CARA'DE PATTAPPARANG", s: "Smart Greenhouse IoT", i: "🌿", c: "emerald", d: "Monitoring iklim mikro berbasis Internet of Things (IoT)." },
            5: { t: "CARA'DE PA'BULOANG", s: "Hilirisasi Digital", i: "📈", c: "purple", d: "Strategi pemasaran dan branding digital produk inovasi desa." }
        };

        // RENDER TEAM
        const grid = document.getElementById('team-grid');
        grid.innerHTML = members.map(m => `
            <div class="member-card glass p-8 rounded-[2.5rem] border-b-8 ${m.r === 'Ketua Tim' ? 'border-green-600 bg-white' : 'border-green-200'}">
                <div class="w-14 h-14 bg-green-100 rounded-2xl mb-6 flex items-center justify-center font-black text-green-700 text-xs shadow-inner uppercase italic">${m.n.charAt(0)}${m.n.split(' ').pop().charAt(0)}</div>
                <h4 class="text-[11px] font-black uppercase text-green-950 italic leading-tight mb-2 tracking-tighter">${m.n}</h4>
                <p class="text-[8px] font-bold text-green-600 uppercase tracking-widest">${m.nim} // ${m.y}</p>
                ${m.r === 'Ketua Tim' ? '<span class="inline-block mt-4 px-3 py-1 bg-green-600 text-white text-[7px] font-black rounded-full uppercase italic">Leader</span>' : ''}
            </div>
        `).join('');

        // NAVIGATION LOGIC
        function showTab(id) {
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            document.getElementById('btn-' + id).classList.add('active');
            if(id === 'tab-lokasi') setTimeout(initMap, 400);
        }

        function setModule(id) {
            const m = modules[id];
            document.getElementById('module-display').innerHTML = `
                <div class="flex flex-col lg:flex-row gap-16 items-center animate-fadeIn">
                    <div class="text-[160px] drop-shadow-2xl animate-pulse select-none">${m.i}</div>
                    <div class="flex-1 space-y-8 text-center lg:text-left">
                        <div>
                            <span class="text-[10px] font-black uppercase tracking-[0.4em] text-${m.c}-600 bg-${m.c}-50 px-5 py-2 rounded-full italic font-bold">Modul Digital 0${id}</span>
                            <h2 class="text-5xl md:text-6xl font-black italic text-green-950 leading-none uppercase tracking-tighter mt-8">${m.t}</h2>
                            <h4 class="text-2xl font-bold text-green-600 italic mt-4 tracking-tight">${m.s}</h4>
                        </div>
                        <p class="text-green-900/60 text-xl italic border-l-4 border-green-200 pl-8 leading-relaxed">"${m.d}"</p>
                        <button onclick="window.open('modul${id}.pdf', '_blank')" class="bg-green-700 hover:bg-green-800 text-white w-full lg:w-auto px-12 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-green-900/30 transition-all active:scale-95 italic">Akses Dokumen PDF</button>
                    </div>
                </div>
            `;
        }

        // MAPS LOGIC
        let map;
        function initMap() {
            if (map) return;
            map = L.map('map').setView([-5.2284, 119.4624], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([-5.2284, 119.4624]).addTo(map).bindPopup("<b class='font-black italic uppercase'>Desa Tinggimae</b><br>Lokasi Pengabdian").openPopup();
        }

        window.onload = () => setModule(1);
    </script>
</body>
</html>
