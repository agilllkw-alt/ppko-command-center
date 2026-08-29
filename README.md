<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KNOWLEDGE HUB | CARA'DE PPKO UNHAS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
    <style>
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            /* Latar belakang Hijau Terang dengan gradasi segar */
            background: linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 50%, #4ade80 100%);
            background-attachment: fixed;
            color: #064e3b;
            overflow-x: hidden;
        }
        
        /* Glassmorphism yang disesuaikan untuk latar terang */
        .glass { 
            background: rgba(255, 255, 255, 0.4); 
            backdrop-filter: blur(20px); 
            border: 1px solid rgba(255, 255, 255, 0.6); 
            box-shadow: 0 8px 32px rgba(0, 71, 49, 0.1);
        }
        
        .gradient-border {
            position: relative;
            border-radius: 2.5rem;
            padding: 3px;
            background: linear-gradient(45deg, #16a34a, #22c55e, #3b82f6);
            box-shadow: 0 20px 50px rgba(22, 163, 74, 0.2);
        }
        
        /* Konten utama menggunakan warna putih gading agar nyaman dibaca */
        .gradient-content { background: #ffffff; border-radius: 2.3rem; padding: 2.5rem; height: 100%; }
        
        .module-btn { transition: all 0.3s ease; cursor: pointer; border-bottom: 4px solid transparent; background: rgba(255, 255, 255, 0.5); }
        .module-btn:hover { transform: translateY(-5px); background: #ffffff; }
        .active-btn { border-bottom: 4px solid #16a34a; background: #ffffff; box-shadow: 0 10px 20px rgba(22, 163, 74, 0.1); }
        
        /* Warna Teks Highlight */
        .orange-text { color: #ea580c; }
        .green-text { color: #15803d; }
        .blue-text { color: #1d4ed8; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-content { animation: fadeInUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
    </style>
</head>
<body class="min-h-screen">

    <!-- Header Navbar -->
    <header class="pt-8 pb-6 px-6 sticky top-0 z-50 glass border-b border-green-200">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center border-2 border-white shadow-lg">
                    <span class="font-black text-white text-[10px]">UNHAS</span>
                </div>
                <div>
                    <h1 class="font-['Space_Grotesk'] text-2xl font-bold tracking-tighter uppercase italic text-green-900">CARA'DE <span class="text-green-600">MODUL HUB</span></h1>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <p class="text-[9px] text-green-700 font-black uppercase tracking-[0.4em]">Integrated Farming Digital Center</p>
                    </div>
                </div>
            </div>
            <a href="https://agilllkw-alt.github.io/ppko-command-center/" class="px-6 py-2 bg-green-800 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition shadow-lg italic">Dashboard Utama</a>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-12 space-y-8">
        
        <!-- Module Selector (Tab Atas) -->
        <section class="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div onclick="setModule(1)" id="m1" class="module-btn p-5 rounded-2xl text-center active-btn">
                <p class="text-[9px] font-black text-green-800/40 mb-1">01</p>
                <h4 class="text-[10px] font-black uppercase tracking-widest italic leading-tight text-green-900">APPARE'</h4>
            </div>
            <div onclick="setModule(2)" id="m2" class="module-btn p-5 rounded-2xl text-center">
                <p class="text-[9px] font-black text-green-800/40 mb-1">02</p>
                <h4 class="text-[10px] font-black uppercase tracking-widest italic leading-tight text-green-900">LEMBANG MAGGOT</h4>
            </div>
            <div onclick="setModule(3)" id="m3" class="module-btn p-5 rounded-2xl text-center">
                <p class="text-[9px] font-black text-green-800/40 mb-1">03</p>
                <h4 class="text-[10px] font-black uppercase tracking-widest italic leading-tight text-green-900">PANGE'BA</h4>
            </div>
            <div onclick="setModule(4)" id="m4" class="module-btn p-5 rounded-2xl text-center">
                <p class="text-[9px] font-black text-green-800/40 mb-1">04</p>
                <h4 class="text-[10px] font-black uppercase tracking-widest italic leading-tight text-green-900">PATTAPPARANG</h4>
            </div>
            <div onclick="setModule(5)" id="m5" class="module-btn p-5 rounded-2xl text-center">
                <p class="text-[9px] font-black text-green-800/40 mb-1">05</p>
                <h4 class="text-[10px] font-black uppercase tracking-widest italic leading-tight text-green-900">PA'BULOANG</h4>
            </div>
        </section>

        <!-- Content Area -->
        <section id="display-container" class="animate-content">
            <div class="gradient-border">
                <div class="gradient-content flex flex-col lg:flex-row gap-12 items-center">
                    
                    <!-- Sisi Kiri: Ikon Visual -->
                    <div class="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center">
                        <div id="module-icon" class="text-[150px] mb-8 drop-shadow-xl">⚙️</div>
                        <div class="bg-green-50 p-8 rounded-[2rem] border border-green-100 w-full text-left">
                            <h5 class="text-[10px] font-black text-green-800/50 uppercase tracking-widest mb-6 border-l-4 border-green-600 pl-4 italic">Core Pokok Bahasan:</h5>
                            <div id="module-points" class="space-y-4">
                                <!-- JS Injected Points -->
                            </div>
                        </div>
                    </div>

                    <!-- Sisi Kanan: Deskripsi & Tombol -->
                    <div class="w-full lg:w-1/2 space-y-8">
                        <div>
                            <span id="module-badge" class="text-[9px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full bg-green-100 text-green-700 border border-green-200 italic font-bold">CATEGORY</span>
                            <h2 id="module-title" class="text-5xl md:text-6xl font-black italic tracking-tighter uppercase mt-8 leading-none transition-all text-green-900">TITLE</h2>
                            <p id="module-desc" class="text-green-800/70 text-lg leading-relaxed mt-8 italic border-l-4 border-green-200 pl-6 text-justify">Description text...</p>
                        </div>
                        
                        <div class="flex flex-col sm:flex-row gap-4 pt-6">
                            <!-- Tombol PDF -->
                            <button id="pdf-button" class="flex-[2] bg-green-600 hover:bg-green-700 p-5 rounded-2xl transition hover:scale-[1.03] active:scale-95 shadow-xl shadow-green-900/10 flex items-center justify-center gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                                <span class="text-white text-[11px] font-black uppercase tracking-[0.2em] italic">Buka Modul PDF</span>
                            </button>
                            <button class="flex-1 bg-white border-2 border-green-600 text-green-700 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-50 transition italic">Tutorial</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    </main>

    <footer class="py-16 text-center opacity-60">
        <p class="text-[9px] font-black uppercase tracking-[1em] text-green-900 italic">CARA'DE // BEM KMF TP UNHAS // 2026</p>
    </footer>

    <script>
        const moduleData = {
            1: {
                title: "CARA'DE APPARE'",
                badge: "Teknologi Pakan",
                icon: "⚙️",
                colorClass: "green-text",
                pdf: "modul1.pdf",
                desc: "Panduan operasional mesin pencacah, penepung, dan tableting untuk produksi pakan mandiri guna menekan biaya operasional kolam ikan.",
                points: ["Mastering Mesin Produksi", "Formulasi Nutrisi Pelet", "Efisiensi Anggaran 50%"]
            },
            2: {
                title: "CARA'DE LEMBANG MAGGOT",
                badge: "Biokonversi",
                icon: "🪱",
                colorClass: "green-text",
                pdf: "modul2.pdf",
                desc: "Metode budidaya larva BSF (Maggot) sebagai pengurai sampah organik sekaligus penyedia protein tinggi pakan alternatif.",
                points: ["Siklus Lalat BSF", "Manajemen Rumah Maggot", "Zero Waste Desa"]
            },
            3: {
                title: "CARA'DE PANGE'BA",
                badge: "Otomasi Air",
                icon: "🌊",
                colorClass: "blue-text",
                pdf: "modul3.pdf",
                desc: "Teknis pemasangan Smart Aerator otomatis untuk stabilitas oksigen kolam yang terintegrasi dengan akuaponik hortikultura.",
                points: ["Sistem Kontrol Oksigen", "Instalasi Akuaponik", "Monitoring Air Real-time"]
            },
            4: {
                title: "CARA'DE PATTAPPARANG",
                badge: "IoT Greenhouse",
                icon: "🌿",
                colorClass: "green-text",
                pdf: "modul4.pdf",
                desc: "Digitalisasi pertanian melalui sensor suhu dan kelembapan berbasis IoT untuk optimalisasi produksi di dalam greenhouse.",
                points: ["Konfigurasi Sensor DHT-22", "Otomasi Iklim Mikro", "Manajemen Pertanian Presisi"]
            },
            5: {
                title: "CARA'DE PA'BULOANG",
                badge: "Bisnis Digital",
                icon: "📈",
                colorClass: "orange-text",
                pdf: "modul5.pdf",
                desc: "Strategi pemasaran digital, branding produk lokal, dan manajemen unit bisnis desa untuk keberlanjutan ekonomi tim.",
                points: ["Branding & Visual Design", "Social Media Marketing", "Pembukuan Keuangan Digital"]
            }
        };

        function setModule(id) {
            document.querySelectorAll('.module-btn').forEach(b => b.classList.remove('active-btn'));
            document.getElementById('m' + id).classList.add('active-btn');

            const m = moduleData[id];
            const container = document.getElementById('display-container');
            
            container.classList.remove('animate-content');
            void container.offsetWidth; 
            container.classList.add('animate-content');

            document.getElementById('module-title').innerText = m.title;
            document.getElementById('module-title').className = `text-5xl md:text-6xl font-black italic tracking-tighter uppercase mt-8 leading-none ${m.colorClass}`;
            document.getElementById('module-badge').innerText = m.badge;
            document.getElementById('module-desc').innerText = `"${m.desc}"`;
            document.getElementById('module-icon').innerText = m.icon;

            const pointsList = document.getElementById('module-points');
            pointsList.innerHTML = m.points.map(p => `
                <div class="flex items-center gap-5">
                    <div class="w-3 h-3 bg-green-600 rounded-full shadow-lg"></div>
                    <span class="text-[11px] font-black uppercase tracking-widest italic text-green-900">${p}</span>
                </div>
            `).join('');

            document.getElementById('pdf-button').onclick = () => {
                window.open(m.pdf, '_blank');
            };
        }

        window.onload = () => setModule(1);
    </script>
</body>
</html>
