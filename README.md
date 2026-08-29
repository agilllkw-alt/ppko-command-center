<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>CARA'DE Command Center</title>
    
    <!-- PWA Meta -->
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#16a34a">
    
    <!-- Dependencies -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Space_Grotesk:wght@700&display=swap" rel="stylesheet">

    <style>
        :root { --p-green: #16a34a; --dark: #064e3b; --p-red: #dc2626; }
        
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background: linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%); 
            background-attachment: fixed;
            color: var(--dark);
            margin: 0;
            padding: env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0;
        }

        /* --- SPLASH SCREEN SONGKOK --- */
        #splash-screen {
            position: fixed; inset: 0; z-index: 9999; background: white;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            transition: opacity 0.8s ease, visibility 0.8s;
        }
        .songkok-anim {
            width: 160px; height: auto;
            animation: bounceIn 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }
        .lontara-splash {
            font-size: 3rem; color: var(--p-red); margin-top: 10px;
            animation: fadeIn 1.5s ease;
        }
        @keyframes bounceIn {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
        }

        /* --- UI UTAMA --- */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.7); }
        .tab-content { display: none; width: 100%; }
        .tab-content.active { display: block; animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .nav-btn.active { background: var(--p-green); color: white; box-shadow: 0 8px 15px rgba(22, 163, 74, 0.2); }
        #map { height: 300px; width: 100%; border-radius: 1.5rem; border: 4px solid white; z-index: 10; }
        .ai-chat-box { height: 250px; overflow-y: auto; scroll-behavior: smooth; }
        .fade-out { opacity: 0; visibility: hidden; }
        
        /* Style Lontara Khusus Modul */
        .lontara-modul { font-size: 1.8rem; color: var(--p-red); line-height: 1; margin-bottom: 4px; }
    </style>
</head>
<body>

<!-- 1. SPLASH SCREEN -->
<div id="splash-screen">
    <img src="songkok.png" alt="Songkok Sultan Hasanuddin" class="songkok-anim">
    <div class="lontara-splash">ᨌᨑᨉᨙ</div>
    <div class="text-xl font-black tracking-[0.2em] text-red-700 -mt-2 italic uppercase">CARA'DE</div>
</div>

<!-- 2. HEADER -->
<header class="sticky top-0 z-[100] glass border-b border-green-200 px-4 py-3 shadow-sm">
    <div class="max-w-7xl mx-auto flex flex-col gap-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 bg-white/50 p-2 rounded-2xl border border-white">
                <img src="logo-unhas.png" alt="UNHAS" class="h-7 w-auto">
                <img src="logo-bem.png" alt="BEM" class="h-7 w-auto">
                <img src="logo-gowa.png" alt="GOWA" class="h-7 w-auto">
                <div class="w-[1px] h-6 bg-green-200 mx-1"></div>
                <div class="flex flex-col">
                    <span class="font-['Space_Grotesk'] text-[12px] font-bold text-green-900 uppercase italic leading-none">CARA'DE</span>
                    <span class="text-[9px] text-red-600 font-bold leading-none mt-1">ᨌᨑᨉᨙ</span>
                </div>
            </div>
            <button onclick="requestNotification()" class="bg-green-100 p-2 rounded-full shadow-sm text-xs">🔔</button>
        </div>

        <nav class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button onclick="showTab('tab-modul')" id="btn-tab-modul" class="nav-btn active flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase italic border border-green-100">Modul Hub</button>
            <button onclick="showTab('tab-cuaca')" id="btn-tab-cuaca" class="nav-btn flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase italic border border-green-100">Cuaca & AI</button>
            <button onclick="showTab('tab-tim')" id="btn-tab-tim" class="nav-btn flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase italic border border-green-100">Personil</button>
            <button onclick="showTab('tab-lokasi')" id="btn-tab-lokasi" class="nav-btn flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase italic border border-green-100">Lokasi Maps</button>
        </nav>
    </div>
</header>

<!-- 3. TAB CONTENT: MODUL (DENGAN LONTARA) -->
<main id="tab-modul" class="tab-content active w-full px-4 py-6 max-w-7xl mx-auto">
    <div class="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
        <button onclick="setModule(1)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-orange-500 italic">01 APPARE'</button>
        <button onclick="setModule(2)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-green-600 italic">02 MAGGOT</button>
        <button onclick="setModule(3)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-blue-500 italic">03 PANGE'BA</button>
        <button onclick="setModule(4)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-emerald-600 italic">04 PATTAPPARANG</button>
        <button onclick="setModule(5)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-purple-500 italic">05 PA'BULOANG</button>
    </div>
    
    <div id="module-display" class="bg-white rounded-[2.5rem] p-6 md:p-16 shadow-2xl border border-green-100 min-h-[420px]"></div>
</main>

<!-- TAB CUACA & AI -->
<main id="tab-cuaca" class="tab-content w-full px-4 py-6 max-w-4xl mx-auto space-y-6">
    <div class="bg-gradient-to-br from-green-600 via-green-700 to-blue-700 text-white p-6 rounded-[2.5rem] shadow-xl">
        <h2 id="live-temp" class="text-6xl font-black italic tracking-tighter">--°C</h2>
        <p id="live-desc" class="text-sm font-bold uppercase italic mt-2">Menghubungkan...</p>
    </div>
    <div class="bg-white rounded-[2.5rem] p-6 shadow-xl border border-green-100">
        <div id="ai-chat-box" class="ai-chat-box space-y-4 mb-4 no-scrollbar">
            <div class="bg-green-50 p-4 rounded-3xl rounded-tl-none text-[11px] font-semibold italic text-green-800">
                "Salama' ki'! Saya asisten digital CAR'ADE. Ada yang bisa saya bantu?"
            </div>
        </div>
        <div class="flex gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-200">
            <input id="ai-input" type="text" placeholder="Tanya tentang program..." class="flex-1 bg-transparent px-4 text-[11px] font-bold outline-none italic">
            <button onclick="askAI()" class="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center">➜</button>
        </div>
    </div>
</main>

<!-- TAB PERSONIL (BERSIH DARI LONTARA) -->
<main id="tab-tim" class="tab-content w-full px-4 py-6 max-w-7xl mx-auto">
    <div class="mb-10 bg-green-900 text-white p-8 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center gap-6">
        <div class="text-5xl">👨‍🏫</div>
        <div>
            <p class="text-[10px] font-black text-green-400 uppercase italic">Dosen Pendamping</p>
            <h3 class="text-2xl font-black uppercase italic tracking-tighter">Husnul Mubarak, S.TP., M.Si</h3>
            <p class="text-[9px] opacity-60 font-bold uppercase mt-1">Universitas Hasanuddin // UNHAS</p>
        </div>
    </div>
    <div id="team-grid" class="grid grid-cols-2 md:grid-cols-5 gap-3"></div>
</main>

<!-- TAB LOKASI -->
<main id="tab-lokasi" class="tab-content w-full px-4 py-6 max-w-5xl mx-auto">
    <div id="map" class="shadow-2xl"></div>
</main>

<footer class="py-20 text-center opacity-30 italic">
    <p class="text-[9px] font-black uppercase tracking-[1em] text-green-900">CARA'DE // 2026</p>
</footer>

<script>
    // --- 1. PWA & SPLASH LOGIC ---
    if ('serviceWorker' in navigator) { 
        navigator.serviceWorker.register('sw.js').catch(err => console.log(err));
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('splash-screen').classList.add('fade-out');
            setTimeout(() => { document.getElementById('splash-screen').style.display = 'none'; }, 800);
        }, 3000);
    });

    // --- 2. MODUL RENDER (DENGAN LONTARA) ---
    const mods = {
        1: { t: "APPARE'", l: "ᨕᨄᨑᨙ", s: "Teknologi Pakan", i: "⚙️", c: "orange", d: "Mesin produksi pakan mandiri limbah lokal." },
        2: { t: "MAGGOT", l: "ᨑᨁᨚ", s: "Protein Alternatif", i: "🪱", c: "green", d: "Budidaya Maggot BSF pengurai sampah organik." },
        3: { t: "PANGE'BA", l: "ᨄᨂᨙᨅ", s: "Otomasi Aerasi", i: "🌊", c: "blue", d: "Sistem penjaga oksigen kolam otomatis." },
        4: { t: "PATTAPPARANG", l: "ᨄᨈᨄᨑ", s: "Smart Greenhouse", i: "🌿", c: "emerald", d: "Monitoring iklim mikro berbasis IoT." },
        5: { t: "PA'BULOANG", l: "ᨄᨅᨘᨒᨚᨕ", s: "Bisnis Digital", i: "📈", c: "purple", d: "Pemasaran digital & branding inovasi desa." }
    };

    function setModule(id) {
        const m = mods[id];
        document.getElementById('module-display').innerHTML = `
            <div class="flex flex-col items-center text-center animate-fadeIn">
                <div class="text-[100px] mb-2">${m.i}</div>
                <div class="lontara-modul">${m.l}</div>
                <h2 class="text-4xl font-black italic text-green-950 uppercase leading-none">${m.t}</h2>
                <h4 class="text-xs font-bold text-green-600 italic mt-2 uppercase tracking-widest">${m.s}</h4>
                <p class="text-green-800/70 text-sm italic leading-relaxed px-4 my-8">"${m.d}"</p>
                <button class="w-full bg-green-700 text-white py-5 rounded-[2.5rem] font-black text-[11px] uppercase italic transition active:scale-95">Akses Dokumen PDF</button>
            </div>
        `;
    }

    // --- 3. TAB NAV & MAPS ---
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
        L.marker([-5.2284, 119.4624]).addTo(map).bindPopup("<b>Desa Tinggimae</b>").openPopup();
    }

    // --- 4. WEATHER & TEAM (ASLI TANPA LONTARA) ---
    async function fetchWeather() {
        try {
            const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-5.2284&longitude=119.4624&current_weather=true');
            const data = await res.json();
            document.getElementById('live-temp').innerText = Math.round(data.current_weather.temperature) + '°C';
            document.getElementById('live-desc').innerText = 'Kondisi Langit Desa Tinggimae';
        } catch (e) { console.log("Weather error"); }
    }

    const members = [
        { n: "Yunita Azzahra", nim: "G031241019" },
        { n: "Abdullah Azzam", nim: "G071241032" },
        { n: "Andina Putri S.", nim: "G031241054" },
        { n: "Dwi Aliyah Ananta", nim: "G041241031" },
        { n: "Nurhikmah", nim: "G041241076" },
        { n: "Muh. Fadhil", nim: "G041241026" },
        { n: "Muh. Shadiq A. R.", nim: "G041241014" },
        { n: "Ahmad Fachraisy A.", nim: "G071241028" },
        { n: "Amirul Mukminin J.", nim: "G071241039" },
        { n: "Nurfahmi", nim: "G041231057" },
        { n: "Fitri Ramadhani", nim: "L061241072" },
        { n: "Andi Naimah A.", nim: "E011241026" },
        { n: "Muhammad Agil Agus", nim: "G041241004" },
        { n: "Diva Najwah Sabila", nim: "G031241015" },
        { n: "Pandin Bidangan T.", nim: "G011231170" }
    ];
    
    document.getElementById('team-grid').innerHTML = members.map(m => `
        <div class="glass p-4 rounded-3xl border-b-4 border-green-200">
            <h4 class="text-[9px] font-black uppercase text-green-950 truncate italic leading-none">${m.n}</h4>
            <p class="text-[7px] font-bold text-green-600 mt-1 opacity-60">${m.nim}</p>
        </div>
    `).join('');

    window.onload = () => { setModule(1); fetchWeather(); };
</script>
</body>
</html>
