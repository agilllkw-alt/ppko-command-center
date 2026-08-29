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
            background-color: #020617;
            background-image: linear-gradient(rgba(2, 6, 23, 0.85), rgba(2, 6, 23, 0.85)), 
                              url('https://images.unsplash.com/photo-1625244724123-9fb09c7878a0?q=80&w=2070&auto=format&fit=crop'); 
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
        }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .gradient-border {
            position: relative;
            border-radius: 2rem;
            padding: 2px;
            background: linear-gradient(to right, #f97316, #22c55e, #3b82f6);
        }
        .gradient-content { background: #020617; border-radius: 1.9rem; padding: 2.5rem; height: 100%; }
        .module-btn { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; border-bottom: 2px solid transparent; }
        .module-btn:hover { background: rgba(255, 255, 255, 0.05); transform: translateY(-5px); }
        .active-btn { border-bottom: 3px solid #f97316; background: rgba(249, 115, 22, 0.1); }
        
        .orange-glow { color: #f97316; text-shadow: 0 0 15px rgba(249, 115, 22, 0.4); }
        .green-glow { color: #22c55e; text-shadow: 0 0 15px rgba(34, 197, 94, 0.4); }
        .blue-glow { color: #3b82f6; text-shadow: 0 0 15px rgba(59, 130, 246, 0.4); }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-content { animation: fadeInUp 0.6s ease forwards; }
    </style>
</head>
<body class="min-h-screen">

    <!-- Header Ikonik -->
    <header class="pt-10 pb-6 px-6 sticky top-0 z-50 backdrop-blur-xl border-b border-white/5">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-500 via-green-500 to-blue-500 rounded-2xl p-0.5">
                    <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-xs">UH</div>
                </div>
                <div>
                    <h1 class="font-['Space_Grotesk'] text-2xl font-bold tracking-tighter uppercase italic">CARA'DE <span class="text-orange-500">MODUL HUB</span></h1>
                    <div class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <p class="text-[9px] text-slate-400 font-bold uppercase tracking-[0.4em]">Integrated Farming Digital Center</p>
                    </div>
                </div>
            </div>
            <nav class="flex gap-2">
                <a href="https://agilllkw-alt.github.io/ppko-command-center/" class="px-6 py-2 glass rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition shadow-lg shadow-orange-500/10">Dashboard</a>
            </nav>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        <!-- Module Selector (Top Horizontal) -->
        <section class="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div onclick="setModule(1)" id="m1" class="module-btn glass p-4 rounded-2xl text-center active-btn">
                <p class="text-[8px] font-black opacity-50 uppercase mb-1 tracking-tighter">01</p>
                <h4 class="text-[10px] font-bold uppercase tracking-tight italic">APPARE'</h4>
            </div>
            <div onclick="setModule(2)" id="m2" class="module-btn glass p-4 rounded-2xl text-center">
                <p class="text-[8px] font-black opacity-50 uppercase mb-1 tracking-tighter">02</p>
                <h4 class="text-[10px] font-bold uppercase tracking-tight italic">MAGGOT</h4>
            </div>
            <div onclick="setModule(3)" id="m3" class="module-btn glass p-4 rounded-2xl text-center">
                <p class="text-[8px] font-black opacity-50 uppercase mb-1 tracking-tighter">03</p>
                <h4 class="text-[10px] font-bold uppercase tracking-tight italic">PANGE'BA</h4>
            </div>
            <div onclick="setModule(4)" id="m4" class="module-btn glass p-4 rounded-2xl text-center">
                <p class="text-[8px] font-black opacity-50 uppercase mb-1 tracking-tighter">04</p>
                <h4 class="text-[10px] font-bold uppercase tracking-tight italic">PATTAPPARANG</h4>
            </div>
            <div onclick="setModule(5)" id="m5" class="module-btn glass p-4 rounded-2xl text-center">
                <p class="text-[8px] font-black opacity-50 uppercase mb-1 tracking-tighter">05</p>
                <h4 class="text-[10px] font-bold uppercase tracking-tight italic tracking-tighter">PA'BULOANG</h4>
            </div>
        </section>

        <!-- Main Display Content -->
        <section id="display-container" class="animate-content">
            <div class="gradient-border glow-blue">
                <div class="gradient-content flex flex-col lg:flex-row gap-12 items-center">
                    
                    <!-- Left Side: Visual -->
                    <div class="w-full lg:w-1/2">
                        <div id="module-icon" class="text-[120px] mb-6 text-center animate-pulse">⚙️</div>
                        <div class="glass p-6 rounded-3xl border-dashed border-white/10 italic tracking-tighter">
                            <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic tracking-tighter">Highlight Pembelajaran:</h5>
                            <div id="module-points" class="space-y-4">
                                <!-- Points will be injected here -->
                            </div>
                        </div>
                    </div>

                    <!-- Right Side: Text -->
                    <div class="w-full lg:w-1/2 space-y-8">
                        <div>
                            <span id="module-badge" class="text-[9px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full glass italic tracking-tighter font-bold tracking-tighter">Category Name</span>
                            <h2 id="module-title" class="text-5xl font-black italic tracking-tighter uppercase mt-6 leading-none tracking-tighter">Module Title</h2>
                            <p id="module-desc" class="text-slate-400 text-lg leading-relaxed mt-6 italic border-l-2 border-orange-500 pl-6 tracking-tighter italic font-bold tracking-tighter">Module Description text here.</p>
                        </div>
                        
                        <div class="flex flex-col sm:flex-row gap-4 pt-4">
                            <button class="flex-1 bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 p-[2px] rounded-2xl transition hover:scale-105">
                                <div class="bg-slate-950 w-full h-full rounded-[14px] py-4 flex items-center justify-center">
                                    <span class="text-[10px] font-black uppercase tracking-widest italic tracking-tighter font-bold tracking-tighter">Buka Modul PDF</span>
                                </div>
                            </button>
                            <button class="flex-1 glass py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition tracking-tighter italic font-bold tracking-tighter">Video Tutorial</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    </main>

    <footer class="py-20 text-center border-t border-white/5 mx-10 opacity-40 italic tracking-tighter font-bold tracking-tighter italic">
        <p class="text-[9px] font-black uppercase tracking-[0.8em]">UNHAS // BEM KMF TP // DESA TINGGIMAE 2026</p>
    </footer>

    <script>
        const data = {
            1: {
                title: "CARA'DE APPARE'",
                badge: "Perikanan & Pakan",
                icon: "⚙️",
                color: "orange-glow",
                desc: "Implementasi teknologi produksi pakan ikan mandiri melalui pemanfaatan limbah organik dan dedak padi dengan mesin pencacah serta penepung pelet.",
                points: ["Sirkular Ekonomi Pakan", "Mesin Pencacah Digital", "Reduksi Biaya Produksi 50%"]
            },
            2: {
                title: "CARA'DE LEMBANG MAGGOT",
                badge: "Biokonversi Limbah",
                icon: "🪱",
                color: "orange-glow",
                desc: "Pembangunan rumah budidaya Maggot BSF sebagai solusi pengelolaan sampah organik desa yang diolah menjadi sumber protein hewani berkualitas tinggi.",
                points: ["Siklus Lalat BSF", "Manajemen Biopond Modern", "Agen Pengurai Organik"]
            },
            3: {
                title: "CARA'DE PANGE'BA",
                badge: "Otomasi Perairan",
                icon: "🌊",
                color: "blue-glow",
                desc: "Sistem aerator cerdas yang bekerja secara otomatis menjaga kadar oksigen kolam, terintegrasi dengan akuaponik sayuran hortikultura.",
                points: ["Kontrol Oksigen Terlarut", "Monitoring Air Real-time", "Integrasi Akuaponik"]
            },
            4: {
                title: "CARA'DE PATTAPPARANG",
                badge: "Agriculture IoT",
                icon: "🌿",
                color: "green-glow",
                desc: "Digitalisasi greenhouse dengan sensor suhu dan kelembapan berbasis IoT untuk optimalisasi hasil pertanian di lahan Desa Tinggimae.",
                points: ["Sistem Sensor DHT-22", "Otomasi Iklim Mikro", "Akses Data via Smartphone"]
            },
            5: {
                title: "CARA'DE PA'BULOANG",
                badge: "Hilirisasi Bisnis",
                icon: "📈",
                color: "green-glow",
                desc: "Strategi pemasaran produk inovasi melalui digital marketing dan penguatan kelembagaan ekonomi masyarakat untuk keberlanjutan program.",
                points: ["Branding Produk Lokal", "Social Media Marketing", "Manajemen Bisnis Desa"]
            }
        };

        function setModule(id) {
            // Update UI Active State
            document.querySelectorAll('.module-btn').forEach(btn => btn.classList.remove('active-btn'));
            document.getElementById('m' + id).classList.add('active-btn');

            const m = data[id];
            const container = document.getElementById('display-container');
            
            // Animation reset
            container.classList.remove('animate-content');
            void container.offsetWidth; 
            container.classList.add('animate-content');

            // Inject Data
            document.getElementById('module-title').innerText = m.title;
            document.getElementById('module-title').className = `text-5xl font-black italic tracking-tighter uppercase mt-6 leading-none ${m.color}`;
            document.getElementById('module-badge').innerText = m.badge;
            document.getElementById('module-desc').innerText = `"${m.desc}"`;
            document.getElementById('module-icon').innerText = m.icon;

            const pointsList = document.getElementById('module-points');
            pointsList.innerHTML = m.points.map(p => `
                <div class="flex items-center gap-4">
                    <div class="w-2 h-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></div>
                    <span class="text-[11px] font-black uppercase tracking-tight italic">${p}</span>
                </div>
            `).join('');
        }

        // Default Load
        window.onload = () => setModule(1);
    </script>
</body>
</html>
