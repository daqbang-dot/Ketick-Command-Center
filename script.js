// Tunggu sehingga semua elemen dimuatkan
document.addEventListener("DOMContentLoaded", () => {
    
    // Kenal pasti elemen HTML
    const toggleSwitch = document.getElementById('mode-toggle');
    const labelText = document.getElementById('mode-label');
    const mode1View = document.getElementById('view-mode1');
    const mode2View = document.getElementById('view-mode2');
    const htmlRoot = document.documentElement;

    // Fungsi untuk menukar mod
    function switchMode(isMode2) {
        if (isMode2) {
            // Aktifkan Mode 2 (Hijau Neon)
            htmlRoot.setAttribute('data-theme', 'mode2');
            mode1View.style.display = 'none';
            mode2View.style.display = 'block';
            labelText.innerText = 'Mode 2 (Hijau)';
            localStorage.setItem('ketick_theme', 'mode2');
        } else {
            // Aktifkan Mode 1 (Ungu Lalai)
            htmlRoot.removeAttribute('data-theme');
            mode2View.style.display = 'none';
            mode1View.style.display = 'block';
            labelText.innerText = 'Mode 1 (Ungu)';
            localStorage.setItem('ketick_theme', 'mode1');
        }
    }

    // Semak jika pengguna pernah pilih tema sebelum ini bila page direfresh
    const savedTheme = localStorage.getItem('ketick_theme');
    
    if (savedTheme === 'mode2') {
        toggleSwitch.checked = true;
        switchMode(true);
    } else {
        toggleSwitch.checked = false;
        switchMode(false);
    }

    // Dengar arahan apabila suis ditekan
    toggleSwitch.addEventListener('change', (event) => {
        switchMode(event.target.checked);
    });

});
