<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PPKO Command Center</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); }
    </style>
</head>
<body class="bg-slate-950 text-slate-100 font-sans">

    <!-- Header -->
    <header class="py-12 px-6 text-center bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 border-b border-slate-800">
        <h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">PPKO <span class="text-blue-500">Command Center</span></h1>
        <p class="text-slate-400 text-lg">Monitoring Program Penguatan Kapasitas Organisasi Kemahasiswaan</p>
    </header>

    <main class="max-w-6xl mx-auto px-6 py-12">
        
        <!-- Section Tim -->
        <section class="mb-20">
            <h2 class="text-2xl font-bold mb-8 border-l-4 border-blue-500 pl-4">STRUKTUR TIM ORMAWA</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all">
                    <div class="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-3xl">👤</div>
                    <h3 class="text-xl font-bold">Nama Ketua</h3>
                    <p class="text-blue-400 text-sm">Leader / Coordinator</p>
                </div>
                <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all">
                    <div class="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-3xl">📝</div>
                    <h3 class="text-xl font-bold">Nama Sekretaris</h3>
                    <p class="text-blue-400 text-sm">Administration</p>
                </div>
                <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all">
                    <div class="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-3xl">💰</div>
                    <h3 class="text-xl font-bold">Nama Bendahara</h3>
                    <p class="text-blue-400 text-sm">Finance Manager</p>
                </div>
            </div>
        </section>

        <!-- Section Story & Spotify -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Timeline Perjalanan -->
            <section>
                <h2 class="text-2xl font-bold mb-8 border-l-4 border-blue-500 pl-4">TIMELINE CERITA</h2>
                <div class="space-y-8 border-l border-slate-800 ml-3 pl-8 relative">
                    <div>
                        <span class="absolute left-[-5px] w-3 h-3 bg-blue-500 rounded-full"></span>
                        <h4 class="text-blue-400 font-bold">MEI 2024</h4>
                        <p class="text-lg font-semibold text-white">Inisiasi Tim</p>
                        <p class="text-slate-400">Penyusunan proposal dan visi misi tim ormawa.</p>
                    </div>
                    <div>
                        <span class="absolute left-[-5px] w-3 h-3 bg-blue-500 rounded-full"></span>
                        <h4 class="text-blue-400 font-bold">JUNI 2024</h4>
                        <p class="text-lg font-semibold text-white">Survei Lapangan</p>
                        <p class="text-slate-400">Diskusi bersama tokoh masyarakat desa sasaran.</p>
                    </div>
                </div>
            </section>

            <!-- Spotify -->
            <section>
                <h2 class="text-2xl font-bold mb-8 border-l-4 border-green-500 pl-4 uppercase">Team Anthem</h2>
                <div class="bg-slate-900 p-4 rounded-3xl border border-slate-800">
                    <iframe style="border-radius:20px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM3M?utm_source=generator&theme=0" width="100%" height="300" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
            </section>
        </div>
    </main>

    <footer class="py-12 text-center text-slate-500 border-t border-slate-900 mt-20">
        <p>PPKO COMMAND CENTER &copy; 2024 - Built for Impact</p>
    </footer>

</body>
</html
