<!DOCTYPE html>
<html lang="id" class="overflow-x-hidden">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>SMART HUB | CARA'DE PPKO</title>
    
    <link rel="manifest" href="manifest.json">
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
            padding: env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.7); }
        .tab-content { display: none; width: 100%; }
        .tab-content.active { display: block; animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .nav-btn.active { background: var(--p-green); color: white; box-shadow: 0 8px 15px rgba(22, 163, 74, 0.2); }
        #map { height: 300px; width: 100%; border-radius: 1.5rem; border: 4px solid white; z-index: 10; }
        .ai-chat-box { height: 250px; overflow-y: auto; scroll-behavior: smooth; }
        .member-card { transition: transform 0.2s; background: rgba(255, 255, 255, 0.5); }
    </style>
</head>
<body class="w-full overflow-x-hidden m-0 p-0 selection:bg-green-200">

    <!-- Push Notification Alert -->
    <div id="weather-alert" class="hidden bg-orange-600 text-white text-[10px] font-black uppercase py-2 px-4 text-center sticky top-0 z-[110] animate-pulse italic">
        ⚠️ Peringatan: Cuaca Ekstrem Terdeteksi di Desa Tinggimae!
    </div>

    <!-- HEADER & LOGO CLUSTER -->
    <header class="sticky top-0 z-[100] glass border-b border-green-200 px-4 py-3 shadow-sm">
        <div class="max-w-7xl mx-auto flex flex-col gap-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 bg-white/50 p-2 rounded-2xl border border-white">
                    <img src="logo-unhas.png" alt="UNHAS" class="h-7 w-auto object-contain">
                    <img src="logo-bem.png" alt="BEM" class="h-7 w-auto object-contain">
                    <img src="logo-gowa.png" alt="GOWA" class="h-7 w-auto object-contain">
                    <div class="w-[1px] h-6 bg-green-200 mx-1"></div>
                    <span class="font-['Space_Grotesk'] text-sm font-bold tracking-tighter text-green-900 uppercase italic">CARA'DE</span>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="requestNotification()" class="bg-green-100 p-2 rounded-full text-xs shadow-sm">🔔</button>
                    <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>
            </div>

            <!-- Navigasi Tab (Scrollable di Android) -->
            <nav class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                <button onclick="showTab('tab-modul')" id="btn-tab-modul" class="nav-btn active flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all italic border border-green-100">Modul Hub</button>
                <button onclick="showTab('tab-cuaca')" id="btn-tab-cuaca" class="nav-btn flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all italic border border-green-100">Cuaca & AI</button>
                <button onclick="showTab('tab-tim')" id="btn-tab-tim" class="nav-btn flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all italic border border-green-100">Personil</button>
                <button onclick="showTab('tab-lokasi')" id="btn-tab-lokasi" class="nav-btn flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all italic border border-green-100">Lokasi Maps</button>
            </nav>
        </div>
    </header>

    <!-- TAB 1: MODUL HUB -->
    <main id="tab-modul" class="tab-content active w-full px-4 py-6 max-w-7xl mx-auto">
        <div class="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
            <button onclick="setModule(1)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-orange-500 italic shadow-sm">01 APPARE'</button>
            <button onclick="setModule(2)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-green-600 italic shadow-sm">02 MAGGOT</button>
            <button onclick="setModule(3)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-blue-500 italic shadow-sm">03 PANGE'BA</button>
            <button onclick="setModule(4)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-emerald-600 italic shadow-sm">04 PATTAPPARANG</button>
            <button onclick="setModule(5)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-purple-500 italic shadow-sm">05 PA'BULOANG</button>
        </div>
        
        <div id="module-display" class="bg-white rounded-[2.5rem] p-6 md:p-16 shadow-2xl border border-green-100 min-h-[450px]">
            <!-- Injected via JS -->
        </div>
    </main>

    <!-- TAB 2: CUACA & AI -->
    <main id="tab-cuaca" class="tab-content w-full px-4 py-6 max-w-4xl mx-auto space-y-6">
        <!-- Live Weather Card -->
        <div class="bg-gradient-to-br from-green-600 via-green-700 to-blue-700 text-white p-6 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div class="relative z-10">
                <p class="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Real-time Desa Tinggimae</p>
                <div class="flex justify-between items-end mt-4">
                    <div>
                        <h2 id="live-temp" class="text-6xl font-black italic tracking-tighter">--°C</h2>
                        <p id="live-desc" class="text-sm font-bold uppercase mt-2 italic">Menghubungkan Satelit...</p>
                    </div>
                    <div class="text-right">
                        <p class="text-[9px] font-black uppercase opacity-60">Status Kelembapan</p>
                        <p id="live-hum" class="text-2xl font-black">--%</p>
                    </div>
                </div>
            </div>
            <div class="absolute -bottom-10 -right-5 text-[150px] opacity-10">☁️</div>
        </div>

        <!-- AI Assistant -->
        <div class="bg-white rounded-[2.5rem] p-6 shadow-xl border border-green-100">
            <div class="flex items-center gap-3 mb-6 border-b border-green-50 pb-4">
                <div class="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-green-200">🤖</div>
                <div>
                    <h4 class="text-xs font-black uppercase text-green-900 leading-none">CARA'DE Assistant</h4>
                    <p class="text-[8px] text-green-500 font-bold uppercase tracking-widest mt-1">Smart Brain Online</p>
                </div>
            </div>
            <div id="ai-chat-box" class="ai-chat-box space-y-4 mb-6 no-scrollbar">
                <div class="bg-green-50 p-4 rounded-3xl rounded-tl-none text-[11px] font-semibold italic text-green-800 leading-relaxed border border-green-100 shadow-sm">
                    "Halo! Saya asisten digital tim CARA'DE. Ingin tahu tentang 15 personil kami, lokasi Desa Tinggimae, atau rincian 5 modul pengabdian kami?"
                </div>
            </div>
            <div class="flex gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-200 shadow-inner">
                <input id="ai-input" type="text" placeholder="Tanya tentang program..." class="flex-1 bg-transparent border-none px-4 text-[11px] font-bold outline-none italic">
                <button onclick="askAI()" class="bg-green-600 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition active:scale-90">➜</button>
            </div>
        </div>
    </main>

    <!-- TAB 3: PERSONIL -->
    <main id="tab-tim" class="tab-content w-full px-4 py-6 max-w-7xl mx-auto">
        <!-- Dosen Pendamping -->
        <div class="mb-12 bg-green-900 text-white p-8 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
            <div class="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-5xl shadow-xl z-10">👨‍🏫</div>
            <div class="text-center md:text-left z-10">
                <p class="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1 italic">Dosen Pendamping</p>
                <h3 class="text-2xl font-black uppercase italic tracking-tighter leading-tight">Husnul Mubarak, S.TP., M.Si</h3>
                <p class="text-[9px] font-bold opacity-60 mt-1 uppercase tracking-widest">NIP. 198904062024061001 // UNHAS</p>
            </div>
        </div>
        <h2 class="text-3xl font-black italic text-green-950 uppercase text-center mb-8 tracking-tighter">The Commanders</h2>
        <div id="team-grid" class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
            <!-- Injected via JS -->
        </div>
    </main>

    <!-- TAB 4: LOKASI -->
    <main id="tab-lokasi" class="tab-content w-full px-4 py-6 max-w-5xl mx-auto">
        <div class="text-center mb-6">
            <h2 class="text-3xl font-black italic text-green-950 uppercase">Field Terminal</h2>
            <p class="text-[10px] font-bold text-green-600 uppercase mt-1 tracking-[0.3em] italic">Desa Tinggimae, Gowa</p>
        </div>
        <div id="map" class="shadow-2xl"></div>
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="glass p-8 rounded-[2rem] border-2 border-white flex flex-col justify-center">
                <h4 class="font-black text-green-900 uppercase text-sm mb-4 italic">📍 Lokasi Pengabdian</h4>
                <p class="text-xs text-green-800 font-bold italic leading-relaxed">Pusat integrasi perikanan percontohan dan greenhouse digital di Desa Tinggimae, Gowa.</p>
            </div>
            <div class="bg-green-800 p-8 rounded-[2rem] text-white flex justify-between items-center shadow-xl">
                <span class="text-[10px] font-black uppercase tracking-widest opacity-60">Jarak Kampus</span>
                <span class="font-black italic text-xl tracking-tighter">±20 KM</span>
            </div>
        </div>
    </main>

    <footer class="py-20 text-center opacity-30 italic">
        <p class="text-[9px] font-black uppercase tracking-[1em] text-green-900">CARA'DE // PPKO UNHAS // 2026</p>
    </footer>

    <script>
        // --- 1. PWA & NOTIF ---
        if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js'); }
        function requestNotification() {
            Notification.requestPermission().then(p => { if(p === 'granted') alert("Peringatan Cuaca Aktif!"); });
        }

        // --- 2. LIVE WEATHER ---
        async function fetchWeather() {
            try {
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-5.2284&longitude=119.4624&current_weather=true');
                const data = await res.json();
                const temp = Math.round(data.current_weather.temperature);
                document.getElementById('live-temp').innerText = temp + '°C';
                document.getElementById('live-desc').innerText = 'Kondisi Saat Ini';
                document.getElementById('live-hum').innerText = '78%'; // Sample hum
                if (temp > 31) document.getElementById('weather-alert').classList.remove('hidden');
            } catch (e) { console.error("Weather Fail"); }
        }

        // --- 3. AI LOGIC ---
        const knowledge = {
            "tim": "Tim CARA'DE terdiri dari 15 mahasiswa UNHAS yang diketuai oleh Yunita Azzahra.",
            "maggot": "Modul Lembang Maggot fokus pada pengolahan sampah organik menjadi pakan tinggi protein.",
            "lokasi": "Kami mengabdi di Desa Tinggimae, Kab. Gowa.",
            "dosen": "Dosen pendamping kami adalah Bapak Husnul Mubarak, S.TP., M.Si."
        };
        function askAI() {
            const input = document.getElementById('ai-input').value.toLowerCase();
            const chat = document.getElementById('ai-chat-box');
            if(!input) return;
            chat.innerHTML += `<div class="bg-blue-50 p-3 rounded-2xl rounded-tr-none text-[10px] font-bold text-right ml-10 border border-blue-100">"${input}"</div>`;
            let res = "Maaf, saya masih tahap belajar. Coba tanya tentang 'Tim', 'Modul', atau 'Lokasi'.";
            for(let key in knowledge) { if(input.includes(key)) res = knowledge[key]; }
            setTimeout(() => {
                chat.innerHTML += `<div class="bg-green-100 p-4 rounded-3xl rounded-tl-none text-[10px] font-bold italic mr-10 shadow-sm border border-green-200 leading-relaxed">"${res}"</div>`;
                chat.scrollTop = chat.scrollHeight;
            }, 500);
            document.getElementById('ai-input').value = "";
        }

        // --- 4. TEAM RENDER ---
        const members = [
            { n: "Yunita Azzahra", nim: "G031241019", r: "Ketua Tim" },
            { n: "Abdullah Azzam", nim: "G071241032", r: "Anggota" },
            { n: "Andina Putri S.", nim: "G031241054", r: "Anggota" },
            { n: "Dwi Aliyah Ananta", nim: "G041241031", r: "Anggota" },
            { n: "Nurhikmah", nim: "G041241076", r: "Anggota" },
            { n: "Muh. Fadhil", nim: "G041241026", r: "Anggota" },
            { n: "Muh. Shadiq A. R.", nim: "G041241014", r: "Anggota" },
            { n: "Ahmad Fachraisy A.", nim: "G071241028", r: "Anggota" },
            { n: "Amirul Mukminin J.", nim: "G071241039", r: "Anggota" },
            { n: "Nurfahmi", nim: "G041231057", r: "Anggota" },
            { n: "Fitri Ramadhani", nim: "L061241072", r: "Anggota" },
            { n: "Andi Naimah A.", nim: "E011241026", r: "Anggota" },
            { n: "Muhammad Agil Agus", nim: "G041241004", r: "Anggota" },
            { n: "Diva Najwah Sabila", nim: "G031241015", r: "Anggota" },
            { n: "Pandin Bidangan T.", nim: "G011231170", r: "Anggota" }
        ];
        const grid = document.getElementById('team-grid');
        grid.innerHTML = members.map(m => `
            <div class="member-card glass p-4 rounded-[1.8rem] border-b-4 ${m.r === 'Ketua Tim' ? 'border-green-600 bg-white' : 'border-green-200'}">
                <div class="w-10 h-10 bg-green-100 rounded-xl mb-3 flex items-center justify-center font-black text-green-700 text-[10px] uppercase shadow-inner">${m.n.charAt(0)}${m.n.split(' ').pop().charAt(0)}</div>
                <h4 class="text-[9px] font-black uppercase text-green-950 leading-none truncate italic">${m.n}</h4>
                <p class="text-[7px] font-bold text-green-600 uppercase mt-1 opacity-60">${m.nim}</p>
                ${m.r === 'Ketua Tim' ? '<span class="inline-block mt-2 px-2 py-0.5 bg-green-600 text-white text-[6px] font-black rounded-full uppercase">Leader</span>' : ''}
            </div>
        `).join('');

        // --- 5. MODUL RENDER ---
        const mods = {
            1: { t: "APPARE'", s: "Teknologi Pakan", i: "⚙️", c: "orange", d: "Mesin produksi pakan mandiri limbah lokal." },
            2: { t: "MAGGOT", s: "Protein Alternatif", i: "🪱", c: "green", d: "Budidaya Maggot BSF pengurai sampah organik." },
            3: { t: "PANGE'BA", s: "Otomasi Aerasi", i: "🌊", c: "blue", d: "Sistem penjaga oksigen kolam otomatis." },
            4: { t: "PATTAPPARANG", s: "Smart Greenhouse", i: "🌿", c: "emerald", d: "Monitoring iklim mikro berbasis IoT." },
            5: { t: "PA'BULOANG", s: "Bisnis Digital", i: "📈", c: "purple", d: "Pemasaran digital & branding inovasi desa." }
        };
        function setModule(id) {
            const m = mods[id];
            document.getElementById('module-display').innerHTML = `
                <div class="flex flex-col items-center animate-fadeIn text-center">
                    <div class="text-[120px] mb-4 select-none drop-shadow-xl">${m.i}</div>
                    <span class="text-[9px] font-black uppercase tracking-[0.4em] text-${m.c}-600 bg-${m.c}-50 px-4 py-1.5 rounded-full italic font-bold">Modul Digital 0${id}</span>
                    <h2 class="text-4xl font-black italic text-green-950 uppercase mt-4 leading-none tracking-tighter">${m.t}</h2>
                    <h4 class="text-lg font-bold text-green-600 italic mt-2 uppercase tracking-tight">${m.s}</h4>
                    <p class="text-green-800/70 text-sm italic leading-relaxed px-4 my-8">"${m.d}"</p>
                    <button onclick="window.open('modul${id}.pdf', '_blank')" class="w-full bg-green-700 hover:bg-green-800 text-white py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-xl shadow-green-900/20 active:scale-95 transition-all italic">Akses Dokumen PDF</button>
                </div>
            `;
        }

        // --- 6. NAV & MAPS ---
        function showTab(id) {
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            document.getElementById('btn-' + id).classList.add('active');
            if(id === 'tab-lokasi') setTimeout(initMap, 400);
            window.scrollTo({top:0, behavior:'smooth'});
        }
        let map;
        function initMap() {
            if (map) { map.invalidateSize(); return; }
            map = L.map('map').setView([-5.2284, 119.4624], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([-5.2284, 119.4624]).addTo(map).bindPopup("<b class='italic uppercase'>Desa Tinggimae</b>").openPopup();
        }

        window.onload = () => { setModule(1); fetchWeather(); };
    </script>
</body>
</html>
