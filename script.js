const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button, .equals, .clear');

function append(value) {
    if (display.value === 'Error') display.value = '';
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        // Replace × and ÷ with * and /
        let expr = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        display.value = eval(expr);
    } catch {
        display.value = 'Error';
    }
}

// Button click events
buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        const value = btn.getAttribute('data-value');
        if (btn.classList.contains('number') || btn.classList.contains('operator')) {
            append(value);
        } else if (btn.classList.contains('clear')) {
            clearDisplay();
        } else if (btn.classList.contains('equals')) {
            calculate();
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/^[0-9+\-*/.]$/.test(key)) {
        append(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// Custom cursor effect
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
        cursor.style.background = 'rgba(255,255,255,0.35)';
        cursor.style.borderColor = '#ffb347';
        cursor.style.boxShadow = '0 0 24px #ffb347, 0 0 8px #fff';
    });
    btn.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'rgba(255,255,255,0.18)';
        cursor.style.borderColor = '#43cea2';
        cursor.style.boxShadow = '0 0 16px #43cea2, 0 0 4px #fff';
    });
});

// Ripple effect for buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        circle.classList.add('ripple');
        const rect = btn.getBoundingClientRect();
        circle.style.left = (e.clientX - rect.left) + 'px';
        circle.style.top = (e.clientY - rect.top) + 'px';
        btn.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    });
});

// Audio elements
const bgMusic = document.getElementById('bg-music');
const clickSound = document.getElementById('click-sound');

// Ensure background music plays (handle browser autoplay restrictions)
window.addEventListener('DOMContentLoaded', () => {
    bgMusic.volume = 0.25;
    bgMusic.play().catch(() => {
        // Play on first user interaction if blocked
        const resumeAudio = () => {
            bgMusic.play();
            document.removeEventListener('click', resumeAudio);
        };
        document.addEventListener('click', resumeAudio);
    });
});

// Play click sound on button press
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});