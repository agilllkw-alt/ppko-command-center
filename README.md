<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>CARA'DE Command Center</title>
    
    <!-- Meta untuk WhatsApp Preview agar tidak ada peringatan -->
    <meta property="og:title" content="CARA'DE Command Center">
    <meta property="og:description" content="Sistem Informasi Digital Desa Tinggimae">
    <meta property="og:type" content="website">

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

        /* SPLASH SCREEN FIX */
        #splash-screen {
            position: fixed; inset: 0; z-index: 9999; background: white;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            transition: opacity 0.8s ease, visibility 0.8s;
        }
        .songkok-anim { width: 150px; height: auto; animation: bounceIn 1.2s forwards; }
        .lontara-splash { font-size: 3rem; color: var(--p-red); margin-top: 10px; }
        @keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); } }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.7); }
        .tab-content { display: none; width: 100%; }
        .tab-content.active { display: block; animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .nav-btn.active { background: var(--p-green); color: white; box-shadow: 0 8px 15px rgba(22, 163, 74, 0.2); }
        #map { height: 350px; width: 100%; border-radius: 1.5rem; border: 4px solid white; z-index: 10; }
        
        .ai-chat-box { height: 300px; overflow-y: auto; scroll-behavior: smooth; }
        .message { margin-bottom: 12px; padding: 10px 15px; border-radius: 18px; font-size: 12px; max-width: 85%; }
        .user-msg { background: var(--p-green); color: white; align-self: flex-end; margin-left: auto; border-bottom-right-radius: 4px; }
        .ai-msg { background: white; color: var(--dark); border: 1px solid #e2e8f0; align-self: flex-start; border-bottom-left-radius: 4px; }
        
        .fade-out { opacity: 0 !important; visibility: hidden !important; }
        .lontara-modul { font-size: 2rem; color: var(--p-red); line-height: 1; margin-bottom: 5px; }
        .weather-card { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); }
    </style>
</head>
<body>

<div id="splash-screen">
    <img src="songkok.png" alt="Songkok" class="songkok-anim">
    <div class="lontara-splash">ᨌᨑᨉᨙ</div>
    <div class="text-xl font-black tracking-[0.2em] text-red-700 -mt-2 italic">CARA'DE</div>
</div>

<header class="sticky top-0 z-[100] glass border-b border-green-200 px-4 py-3 shadow-sm">
    <div class="max-w-7xl mx-auto flex flex-col gap-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 bg-white/50 p-2 rounded-2xl border border-white">
                <img src="logo-unhas.png" alt="UNHAS" class="h-7 w-auto">
                <img src="logo-tim.png" alt="TIM" class="h-7 w-auto">
                <div class="w-[1px] h-6 bg-green-200 mx-1"></div>
                <div class="flex flex-col">
                    <span class="font-['Space_Grotesk'] text-[12px] font-bold text-green-900 uppercase italic leading-none">CARA'DE</span>
                    <span class="text-[9px] text-red-600 font-bold leading-none mt-1">ᨌᨑᨉᨙ</span>
                </div>
            </div>
            <button class="bg-green-100 p-2 rounded-full text-xs shadow-sm">🔔</button>
        </div>

        <nav class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button onclick="showTab('tab-modul')" id="btn-tab-modul" class="nav-btn active flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase italic border border-green-100">Modul Hub</button>
            <button onclick="showTab('tab-cuaca')" id="btn-tab-cuaca" class="nav-btn flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase italic border border-green-100">Cuaca & AI</button>
            <button onclick="showTab('tab-tim')" id="btn-tab-tim" class="nav-btn flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase italic border border-green-100">Personil</button>
            <button onclick="showTab('tab-lokasi')" id="btn-tab-lokasi" class="nav-btn flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase italic border border-green-100">Lokasi Maps</button>
        </nav>
    </div>
</header>

<main id="tab-modul" class="tab-content active w-full px-4 py-6 max-w-7xl mx-auto">
    <div class="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
        <button onclick="setModule(1)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-orange-500 italic">01 APPARE'</button>
        <button onclick="setModule(2)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-green-600 italic">02 MAGGOT</button>
        <button onclick="setModule(3)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-blue-500 italic">03 PANGE'BA</button>
        <button onclick="setModule(4)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-emerald-600 italic">04 PATTAPPARANG</button>
        <button onclick="setModule(5)" class="flex-none w-32 p-3 glass rounded-2xl text-[9px] font-black uppercase border-b-4 border-purple-500 italic">05 PA'BULOANG</button>
    </div>
    <div id="module-display" class="bg-white rounded-[2.5rem] p-6 shadow-2xl border border-green-100 min-h-[400px]"></div>
</main>

<main id="tab-cuaca" class="tab-content w-full px-4 py-6 max-w-4xl mx-auto space-y-6">
    <div class="weather-card text-white p-6 rounded-[2.5rem] shadow-xl">
        <div class="flex justify-between items-start">
            <div>
                <h2 id="live-temp" class="text-6xl font-black italic tracking-tighter">--°C</h2>
                <p id="live-desc" class="text-sm font-bold uppercase italic mt-2">Mencari Satelit...</p>
            </div>
            <div class="text-right">
                <p class="text-[10px] font-black opacity-70 uppercase">Desa Tinggimae</p>
                <p id="live-date" class="text-[10px] font-bold">--:--</p>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
            <div class="text-center"><p class="text-[8px] opacity-70 mb-1">Kelembapan</p><p id="weather-hum">--%</p></div>
            <div class="text-center"><p class="text-[8px] opacity-70 mb-1">Angin</p><p id="weather-wind">-- km/h</p></div>
            <div class="text-center"><p class="text-[8px] opacity-70 mb-1">Indeks UV</p><p id="weather-uv">--</p></div>
        </div>
    </div>

    <div class="bg-white rounded-[2.5rem] p-6 shadow-xl border border-green-100">
        <h3 class="text-[10px] font-black uppercase italic mb-4">Cara'de AI Assistant</h3>
        <div id="ai-chat-box" class="ai-chat-box flex flex-col no-scrollbar mb-4">
            <div class="message ai-msg">Halo! Ada yang bisa saya bantu terkait modul?</div>
        </div>
        <div class="flex gap-2 bg-slate-50 p-1.5 rounded-full">
            <input id="ai-input" type="text" placeholder="Tanya sesuatu..." class="flex-1 bg-transparent px-4 text-[11px] outline-none">
            <button onclick="askAI()" class="bg-green-600 text-white w-10 h-10 rounded-full">➜</button>
        </div>
    </div>
</main>

<main id="tab-tim" class="tab-content w-full px-4 py-6 max-w-7xl mx-auto">
    <div class="mb-6 bg-green-900 text-white p-6 rounded-[2.5rem]">
        <p class="text-[10px] text-green-400 font-bold">Dosen Pendamping</p>
        <h3 class="text-xl font-black italic">Husnul Mubarak, S.TP., M.Si</h3>
    </div>
    <div id="team-grid" class="grid grid-cols-2 md:grid-cols-5 gap-3"></div>
</main>

<main id="tab-lokasi" class="tab-content w-full px-4 py-6 max-w-5xl mx-auto">
    <div id="map" class="shadow-2xl"></div>
</main>

<footer class="py-10 text-center opacity-30 text-[9px] font-black tracking-[1em]">CARA'DE 2026</footer>

<script>
    const mods = {
        1: { t: "APPARE'", l: "ᨕᨄᨑᨙ", s: "Teknologi Pakan", i: "⚙️", d: "Mesin produksi pakan mandiri memanfaatkan limbah lokal.", keywords: ["pakan", "mesin"] },
        2: { t: "MAGGOT", l: "ᨑᨁᨚ", s: "Protein Alternatif", i: "🪱", d: "Budidaya Maggot BSF sebagai pengurai sampah organik.", keywords: ["maggot", "bsf"] },
        3: { t: "PANGE'BA", l: "ᨄᨂᨙᨅ", s: "Otomasi Aerasi", i: "🌊", d: "Sistem kincir air otomatis berbasis sensor.", keywords: ["kincir", "oksigen"] },
        4: { t: "PATTAPPARANG", l: "ᨄᨈᨄᨑ", s: "Smart Greenhouse", i: "🌿", d: "Monitoring iklim mikro berbasis IoT.", keywords: ["iot", "greenhouse"] },
        5: { t: "PA'BULOANG", l: "ᨄᨅᨘᨒᨚᨕ", s: "Bisnis Digital", i: "📈", d: "Strategi pemasaran dan branding produk desa.", keywords: ["bisnis", "marketing"] }
    };

    const members = [
        { n: "Yunita Azzahra", nim: "G031241019" }, { n: "Abdullah Azzam", nim: "G071241032" },
        { n: "Andina Putri S.", nim: "G031241054" }, { n: "Dwi Aliyah Ananta", nim: "G041241031" },
        { n: "Nurhikmah", nim: "G041241076" }, { n: "Muh. Fadhil", nim: "G041241026" },
        { n: "Muh. Shadiq A. R.", nim: "G041241014" }, { n: "Ahmad Fachraisy A.", nim: "G071241028" },
        { n: "Amirul Mukminin J.", nim: "G071241039" }, { n: "Nurfahmi", nim: "G041231057" },
        { n: "Fitri Ramadhani", nim: "L061241072" }, { n: "Andi Naimah A.", nim: "E011241026" },
        { n: "Muhammad Agil Agus", nim: "G041241004" }, { n: "Diva Najwah Sabila", nim: "G031241015" },
        { n: "Pandin Bidangan T.", nim: "G011231170" }
    ];

    // Fungsi Hilangkan Splash Screen (Dibuat sangat aman)
    function hideSplash() {
        const splash = document.getElementById('splash-screen');
        if(splash) {
            splash.classList.add('fade-out');
            setTimeout(() => { splash.style.display = 'none'; }, 1000);
        }
    }

    window.onload = () => {
        setTimeout(hideSplash, 2500); // Pastikan splash hilang setelah 2.5 detik
        setModule(1);
        fetchWeather();
        renderTeam();
    };

    function setModule(id) {
        const m = mods[id];
        document.getElementById('module-display').innerHTML = `
            <div class="flex flex-col items-center text-center p-4">
                <div class="text-[80px] mb-2">${m.i}</div>
                <div class="lontara-modul">${m.l}</div>
                <h2 class="text-3xl font-black italic text-green-950 uppercase">${m.t}</h2>
                <h4 class="text-[10px] font-bold text-green-600 uppercase mt-2">${m.s}</h4>
                <p class="text-green-800/70 text-xs italic my-6 px-4">"${m.d}"</p>
                <button onclick="window.open('modul${id}.pdf', '_blank')" class="w-full bg-green-700 text-white py-4 rounded-3xl font-black text-[10px] uppercase italic">Buka PDF</button>
            </div>
        `;
    }

    function renderTeam() {
        document.getElementById('team-grid').innerHTML = members.map(m => `
            <div class="glass p-3 rounded-2xl border-b-4 border-green-200">
                <h4 class="text-[8px] font-black uppercase text-green-950 truncate">${m.n}</h4>
                <p class="text-[7px] font-bold text-green-600">${m.nim}</p>
            </div>
        `).join('');
    }

    async function fetchWeather() {
        try {
            const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-5.2284&longitude=119.4624&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=uv_index_max&timezone=Asia%2FSingapore');
            const data = await res.json();
            document.getElementById('live-temp').innerText = Math.round(data.current.temperature_2m) + '°C';
            document.getElementById('weather-hum').innerText = data.current.relative_humidity_2m + '%';
            document.getElementById('weather-wind').innerText = data.current.wind_speed_10m + ' km/h';
            document.getElementById('weather-uv').innerText = data.daily.uv_index_max[0];
            document.getElementById('live-desc').innerText = "Cerah Berawan";
            document.getElementById('live-date').innerText = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        } catch (e) { console.error("Weather error"); }
    }

    async function askAI() {
        const inp = document.getElementById('ai-input');
        const q = inp.value.trim().toLowerCase();
        if(!q) return;
        addMsg(inp.value, 'user-msg');
        inp.value = '';
        setTimeout(() => {
            let res = "Saya adalah AI Cara'de. Silakan tanya tentang 5 modul kami!";
            Object.values(mods).forEach(m => {
                if(m.keywords.some(k => q.includes(k))) res = `Modul <b>${m.t}</b> fokus pada ${m.d}`;
            });
            addMsg(res, 'ai-msg');
        }, 1000);
    }

    function addMsg(t, c) {
        const b = document.getElementById('ai-chat-box');
        const d = document.createElement('div');
        d.className = `message ${c}`;
        d.innerHTML = t;
        b.appendChild(d);
        b.scrollTop = b.scrollHeight;
    }

    function showTab(id) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        document.getElementById('btn-' + id).classList.add('active');
        if(id === 'tab-lokasi') setTimeout(initMap, 400);
    }

    let map;
    function initMap() {
        if (map) return;
        map = L.map('map').setView([-5.2284, 119.4624], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([-5.2284, 119.4624]).addTo(map).bindPopup("<b>Desa Tinggimae</b>").openPopup();
    }
</script>
</body>
</html>
