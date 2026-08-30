<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    
    <!-- NAMA WEB PADA TAB BROWSER -->
    <title>CARA'DE Command Center - Desa Tinggimae</title>
    
    <!-- PWA Meta -->
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#16a34a">
    <meta name="description" content="Sistem Informasi Digital CARA'DE Gowa">
    
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

        /* --- SPLASH SCREEN --- */
        #splash-screen {
            position: fixed; inset: 0; z-index: 9999; background: white;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            transition: opacity 0.8s ease, visibility 0.8s;
        }
        .songkok-anim {
            width: 150px; height: auto;
            animation: bounceIn 1.2s forwards;
        }
        .lontara-splash {
            font-size: 3rem; color: var(--p-red); margin-top: 10px;
        }
        @keyframes bounceIn {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
        }

        /* --- UI STYLING --- */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.7); }
        .tab-content { display: none; width: 100%; }
        .tab-content.active { display: block; animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .nav-btn.active { background: var(--p-green); color: white; box-shadow: 0 8px 15px rgba(22, 163, 74, 0.2); }
        #map { height: 300px; width: 100%; border-radius: 1.5rem; border: 4px solid white; z-index: 10; }
        
        .ai-chat-box { height: 300px; overflow-y: auto; scroll-behavior: smooth; }
        .message { margin-bottom: 12px; padding: 10px 15px; border-radius: 18px; font-size: 12px; max-width: 85%; }
        .user-msg { background: var(--p-green); color: white; align-self: flex-end; margin-left: auto; border-bottom-right-radius: 4px; }
        .ai-msg { background: white; color: var(--dark); border: 1px solid #e2e8f0; align-self: flex-start; border-bottom-left-radius: 4px; }
        
        .fade-out { opacity: 0; visibility: hidden; }
        .lontara-modul { font-size: 2rem; color: var(--p-red); line-height: 1; margin-bottom: 5px; }
        
        .weather-card { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); }
    </style>
</head>
<body>

<!-- 1. SPLASH SCREEN -->
<div id="splash-screen">
    <img src="songkok.png" alt="Songkok Sultan Hasanuddin" class="songkok-anim">
    <div class="lontara-splash">ᨌᨑᨉᨙ</div>
    <div class="text-xl font-black tracking-[0.2em] text-red-700 -mt-2 italic">CARA'DE</div>
</div>

<!-- 2. HEADER -->
<header class="sticky top-0 z-[100] glass border-b border-green-200 px-4 py-3 shadow-sm">
    <div class="max-w-7xl mx-auto flex flex-col gap-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 bg-white/50 p-2 rounded-2xl border border-white">
                <img src="logo-unhas.png" alt="UNHAS" class="h-7 w-auto">
                <img src="logo-bem.png" alt="BEM" class="h-7 w-auto">
                <img src="logo-tim.png" alt="TIM" class="h-7 w-auto">
                <img src="logo-gowa.png" alt="GOWA" class="h-7 w-auto">
                <div class="w-[1px] h-6 bg-green-200 mx-1"></div>
                <div class="flex flex-col">
                    <span class="font-['Space_Grotesk'] text-[12px] font-bold text-green-900 uppercase italic leading-none">CARA'DE</span>
                    <span class="text-[9px] text-red-600 font-bold leading-none mt-1">ᨌᨑᨉᨙ</span>
                </div>
            </div>
            <!-- Menghilangkan Alert Notifikasi agar tidak ada pop-up mengganggu -->
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

<!-- 3. TAB MODUL -->
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

<!-- 4. TAB CUACA & AI -->
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
            <div class="text-center">
                <p class="text-[8px] font-black opacity-70 uppercase mb-1">Kelembapan</p>
                <p id="weather-hum" class="font-bold">--%</p>
            </div>
            <div class="text-center">
                <p class="text-[8px] font-black opacity-70 uppercase mb-1">Angin</p>
                <p id="weather-wind" class="font-bold">-- km/h</p>
            </div>
            <div class="text-center">
                <p class="text-[8px] font-black opacity-70 uppercase mb-1">Indeks UV</p>
                <p id="weather-uv" class="font-bold">--</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-[2.5rem] p-6 shadow-xl border border-green-100">
        <div class="flex items-center gap-2 mb-4">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 class="text-[10px] font-black uppercase italic">Cara'de AI Assistant</h3>
        </div>
        <div id="ai-chat-box" class="ai-chat-box flex flex-col no-scrollbar mb-4">
            <div class="message ai-msg">Halo! Saya AI Cara'de. Ada yang bisa saya bantu terkait modul atau informasi Desa Tinggimae?</div>
        </div>
        <div class="flex gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-200">
            <input id="ai-input" type="text" placeholder="Tanya tentang modul atau hal umum..." class="flex-1 bg-transparent px-4 text-[11px] font-bold outline-none italic">
            <button onclick="askAI()" class="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-700 transition">➜</button>
        </div>
    </div>
</main>

<!-- 5. TAB PERSONIL -->
<main id="tab-tim" class="tab-content w-full px-4 py-6 max-w-7xl mx-auto">
    <div class="mb-10 bg-green-900 text-white p-8 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center gap-6">
        <div class="text-5xl">👨‍🏫</div>
        <div>
            <p class="text-[10px] font-black text-green-400 uppercase italic">Dosen Pendamping</p>
            <h3 class="text-2xl font-black uppercase italic tracking-tighter">Husnul Mubarak, S.TP., M.Si</h3>
            <p class="text-[9px] opacity-60 font-bold uppercase mt-1">Universitas Hasanuddin (UNHAS)</p>
        </div>
    </div>
    <div id="team-grid" class="grid grid-cols-2 md:grid-cols-5 gap-3"></div>
</main>

<!-- 6. TAB LOKASI -->
<main id="tab-lokasi" class="tab-content w-full px-4 py-6 max-w-5xl mx-auto">
    <div id="map" class="shadow-2xl"></div>
</main>

<footer class="py-20 text-center opacity-30 italic text-[9px] font-black uppercase tracking-[1em]">
    CARA'DE // 2026
</footer>

<script>
    // 1. DATA LENGKAP
    const mods = {
        1: { t: "APPARE'", l: "ᨕᨄᨑᨙ", s: "Teknologi Pakan", i: "⚙️", c: "orange", d: "Mesin produksi pakan mandiri yang memanfaatkan limbah lokal desa untuk meningkatkan efisiensi peternakan.", keywords: ["pakan", "mesin", "ternak", "limbah"] },
        2: { t: "MAGGOT", l: "ᨑᨁᨚ", s: "Protein Alternatif", i: "🪱", c: "green", d: "Budidaya Maggot BSF (Black Soldier Fly) sebagai pengurai sampah organik sekaligus sumber protein tinggi untuk pakan.", keywords: ["maggot", "bsf", "sampah", "protein", "organik"] },
        3: { t: "PANGE'BA", l: "ᨄᨂᨙᨅ", s: "Otomasi Aerasi", i: "🌊", c: "blue", d: "Sistem kincir air otomatis berbasis sensor untuk menjaga kadar oksigen terlarut dalam kolam budidaya.", keywords: ["kincir", "oksigen", "kolam", "air", "aerasi"] },
        4: { t: "PATTAPPARANG", l: "ᨄᨈᨄᨑ", s: "Smart Greenhouse", i: "🌿", c: "emerald", d: "Monitoring iklim mikro (suhu & kelembapan) berbasis IoT untuk optimalisasi hasil pertanian dalam rumah kaca.", keywords: ["iot", "greenhouse", "tanaman", "suhu", "kelembapan", "pertanian"] },
        5: { t: "PA'BULOANG", l: "ᨄᨅᨘᨒᨚᨕ", s: "Bisnis Digital", i: "📈", c: "purple", d: "Strategi pemasaran digital, branding produk desa, dan manajemen keuangan untuk keberlanjutan ekonomi masyarakat.", keywords: ["bisnis", "marketing", "digital", "branding", "uang", "ekonomi"] }
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

    // 2. CORE LOGIC
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('splash-screen').classList.add('fade-out');
            setTimeout(() => { document.getElementById('splash-screen').style.display = 'none'; }, 800);
        }, 2000);
        setModule(1);
        fetchWeather();
        renderTeam();
    });

    function setModule(id) {
        const m = mods[id];
        document.getElementById('module-display').innerHTML = `
            <div class="flex flex-col items-center text-center animate-fadeIn">
                <div class="text-[100px] mb-2">${m.i}</div>
                <div class="lontara-modul">${m.l}</div>
                <h2 class="text-4xl font-black italic text-green-950 uppercase leading-none">${m.t}</h2>
                <h4 class="text-xs font-bold text-green-600 italic mt-2 uppercase tracking-widest">${m.s}</h4>
                <p class="text-green-800/70 text-sm italic leading-relaxed px-4 my-8">"${m.d}"</p>
                <button onclick="window.open('modul${id}.pdf', '_blank')" class="w-full bg-green-700 text-white py-5 rounded-[2.5rem] font-black text-[11px] uppercase italic transition active:scale-95 shadow-xl">Buka Dokumen Modul PDF</button>
            </div>
        `;
    }

    function renderTeam() {
        document.getElementById('team-grid').innerHTML = members.map(m => `
            <div class="glass p-4 rounded-3xl border-b-4 border-green-200">
                <h4 class="text-[9px] font-black uppercase text-green-950 truncate italic leading-none">${m.n}</h4>
                <p class="text-[7px] font-bold text-green-600 mt-1 opacity-60">${m.nim}</p>
            </div>
        `).join('');
    }

    // 3. WEATHER SYSTEM
    async function fetchWeather() {
        try {
            const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-5.2284&longitude=119.4624&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=uv_index_max&timezone=Asia%2FSingapore');
            const data = await res.json();
            document.getElementById('live-temp').innerText = Math.round(data.current.temperature_2m) + '°C';
            document.getElementById('weather-hum').innerText = data.current.relative_humidity_2m + '%';
            document.getElementById('weather-wind').innerText = data.current.wind_speed_10m + ' km/h';
            document.getElementById('weather-uv').innerText = data.daily.uv_index_max[0];
            const codes = { 0: "Cerah", 1: "Cerah Berawan", 2: "Berawan", 3: "Mendung", 45: "Berkabut", 61: "Hujan Ringan", 95: "Badai Petir" };
            document.getElementById('live-desc').innerText = codes[data.current.weather_code] || "Berawan";
            document.getElementById('live-date').innerText = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        } catch (e) { document.getElementById('live-desc').innerText = "Gagal memuat cuaca"; }
    }

    // 4. AI SYSTEM
    async function askAI() {
        const inputField = document.getElementById('ai-input');
        const query = inputField.value.trim().toLowerCase();
        if (!query) return;
        addChatMessage(inputField.value, 'user-msg');
        inputField.value = '';
        const chatBox = document.getElementById('ai-chat-box');
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'message ai-msg italic opacity-50';
        loadingMsg.innerText = 'Cara\'de sedang berpikir...';
        chatBox.appendChild(loadingMsg);
        setTimeout(async () => {
            chatBox.removeChild(loadingMsg);
            let response = "";
            let foundMod = Object.values(mods).find(m => m.keywords.some(key => query.includes(key)) || query.includes(m.t.toLowerCase()));
            if (foundMod) { 
                response = `Berdasarkan modul <b>${foundMod.t}</b>: ${foundMod.d}`; 
            } else if (query.includes("tinggimae")) {
                response = "Desa Tinggimae adalah lokasi pelaksanaan program CARA'DE yang fokus pada inovasi pakan, maggot, dan IoT.";
            } else {
                response = `Maaf, saya tidak menemukan info spesifik tentang "${query}" di modul, namun ini berkaitan dengan teknologi desa.`;
            }
            addChatMessage(response, 'ai-msg');
        }, 1000);
    }

    function addChatMessage(text, type) {
        const chatBox = document.getElementById('ai-chat-box');
        const msg = document.createElement('div');
        msg.className = `message ${type}`;
        msg.innerHTML = text;
        chatBox.appendChild(msg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // 5. NAVIGATION
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
        map = L.map('map').setView([-5.2284, 119.4624], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([-5.2284, 119.4624]).addTo(map).bindPopup("<b>Desa Tinggimae</b><br>Lokasi Program CARA'DE").openPopup();
    }
</script>
</body>
</html>
