// Tunggu sehingga semua elemen dimuatkan
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // LOGIK TOGGLE MODE 1 & MODE 2
    // ==========================================
    const toggleSwitch = document.getElementById('mode-toggle');
    const labelText = document.getElementById('mode-label');
    const mode1View = document.getElementById('view-mode1');
    const mode2View = document.getElementById('view-mode2');
    const htmlRoot = document.documentElement;

    function switchMode(isMode2) {
        if (isMode2) {
            htmlRoot.setAttribute('data-theme', 'mode2');
            mode1View.style.display = 'none';
            mode2View.style.display = 'block';
            labelText.innerText = 'Mode 2 (Hijau)';
            localStorage.setItem('ketick_theme', 'mode2');
        } else {
            htmlRoot.removeAttribute('data-theme');
            mode2View.style.display = 'none';
            mode1View.style.display = 'block';
            labelText.innerText = 'Mode 1 (Ungu)';
            localStorage.setItem('ketick_theme', 'mode1');
        }
    }

    const savedTheme = localStorage.getItem('ketick_theme');
    
    if (savedTheme === 'mode2') {
        toggleSwitch.checked = true;
        switchMode(true);
    } else {
        toggleSwitch.checked = false;
        switchMode(false);
    }

    toggleSwitch.addEventListener('change', (event) => {
        switchMode(event.target.checked);
    });

    // ==========================================
    // FUNGSI SEMAKAN STATUS DOMAIN (HEALTH CHECK)
    // ==========================================
    const ketickDomains = [
        { name: "Ketick Utama", url: "https://ketick.my" },
        { name: "Sistem ERP", url: "https://erp.ketick.my" }, 
        { name: "IdeaNest Platform", url: "https://ideanest.ketick.my" },
        { name: "Klinik Yakin Bahau", url: "https://klinikyakin.ketick.my" }
    ];

    const statusListContainer = document.getElementById('domain-status-list');

    if(statusListContainer) {
        function renderStatusList() {
            statusListContainer.innerHTML = '';
            ketickDomains.forEach((domain, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${domain.name}</span>
                    <div class="status-indicator">
                        <span class="dot checking" id="dot-${index}"></span>
                        <span id="text-${index}" style="color: var(--text-muted);">Menyemak...</span>
                    </div>
                `;
                statusListContainer.appendChild(li);
            });
        }

        async function checkDomainStatus() {
            ketickDomains.forEach(async (domain, index) => {
                const dotIndicator = document.getElementById(`dot-${index}`);
                const textIndicator = document.getElementById(`text-${index}`);

                if(dotIndicator && textIndicator) {
                    try {
                        await fetch(domain.url, { mode: 'no-cors', cache: 'no-store' });
                        dotIndicator.className = 'dot online';
                        textIndicator.innerText = 'Online';
                        textIndicator.style.color = '#00E676';
                    } catch (error) {
                        dotIndicator.className = 'dot offline';
                        textIndicator.innerText = 'Offline';
                        textIndicator.style.color = '#FF3B30';
                    }
                }
            });
        }

        renderStatusList();
        setTimeout(checkDomainStatus, 1500);
        setInterval(checkDomainStatus, 60000);
    }

    // ==========================================
    // FUNGSI GRAF INTERAKTIF (CHART.JS) - BARU DITAMBAH
    // ==========================================
    const ctx = document.getElementById('mainChart');
    
    // Pastikan elemen canvas wujud sebelum lukis graf
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Statistik Data',
                    data: [120, 190, 300, 250, 400, 320, 500], // Ini data contoh (dummy)
                    borderColor: '#00E676', // Warna Hijau Neon
                    backgroundColor: 'rgba(0, 230, 118, 0.1)', // Hijau lutsinar
                    borderWidth: 2,
                    pointBackgroundColor: '#0B0E14',
                    pointBorderColor: '#00E676',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    fill: true,
                    tension: 0.4 // Jadikan garisan melengkung (smooth)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Sembunyikan label legend di atas
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)' // Garisan grid yang sangat pudar
                        },
                        ticks: {
                            color: '#9CA3AF'
                        }
                    },
                    x: {
                        grid: {
                            display: false // Buang garisan menegak
                        },
                        ticks: {
                            color: '#9CA3AF'
                        }
                    }
                }
            }
        });
    }
});
