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

    // Jika elemen tidak wujud (contohnya pengguna di Mode 1), elakkan ralat
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
});
