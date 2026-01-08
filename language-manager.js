document.addEventListener("DOMContentLoaded", function () {
    const storageKey = 'siteLanguagePreference';
    const savedLang = localStorage.getItem(storageKey);
    const currentPath = window.location.pathname;

    // Перевірка, чи це англійська версія (шукаємо '/en/' у шляху)
    const isEnglishPage = currentPath.includes('/en/') || currentPath.endsWith('/en');

    // 1. ЛОГІКА АВТОМАТИЧНОГО РЕДІРЕКТУ (тільки при першому вході)
    // Якщо збережено EN, але ми не на EN сторінці -> редірект
    if (savedLang === 'en' && !isEnglishPage) {
        redirectToEnglish();
    }
    // Якщо збережено UA, але ми на EN сторінці -> редірект на UA
    else if (savedLang === 'ua' && isEnglishPage) {
        redirectToUkrainian();
    }
    // Якщо вибору немає -> показуємо модалку
    else if (!savedLang && !isEnglishPage) {
        createAndShowModal();
    }

    // 2. ЛОГІКА КНОПКИ ПЕРЕМИКАННЯ МОВИ
    // Шукаємо кнопку за ID (вона має бути додана в HTML)
    const switchBtn = document.getElementById('lang-switch');
    if (switchBtn) {
        switchBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Щоб не спрацьовував стандартний перехід по посиланню
            
            if (isEnglishPage) {
                // Якщо ми на EN, перемикаємо на UA
                localStorage.setItem(storageKey, 'ua');
                redirectToUkrainian();
            } else {
                // Якщо ми на UA, перемикаємо на EN
                localStorage.setItem(storageKey, 'en');
                redirectToEnglish();
            }
        });
    }

    // --- ФУНКЦІЇ ---

    function createAndShowModal() {
        const overlay = document.createElement('div');
        overlay.className = 'lang-modal-overlay';
        
        const box = document.createElement('div');
        box.className = 'lang-modal-box';

        const title = document.createElement('div');
        title.className = 'lang-title';
        title.innerHTML = 'Будь ласка, оберіть мову<br>Please select your language';

        const btnContainer = document.createElement('div');
        btnContainer.className = 'lang-buttons';

        const btnUA = document.createElement('button');
        btnUA.className = 'lang-btn primary';
        btnUA.textContent = 'Українська';
        
        const btnEN = document.createElement('button');
        btnEN.className = 'lang-btn';
        btnEN.textContent = 'English';

        btnContainer.appendChild(btnUA);
        btnContainer.appendChild(btnEN);
        box.appendChild(title);
        box.appendChild(btnContainer);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.display = 'flex';
            requestAnimationFrame(() => {
                overlay.classList.add('show');
            });
        }, 100);

        btnUA.onclick = function() {
            localStorage.setItem(storageKey, 'ua');
            closeModal(overlay);
        };

        btnEN.onclick = function() {
            localStorage.setItem(storageKey, 'en');
            redirectToEnglish();
        };
    }

    function closeModal(element) {
        element.classList.remove('show');
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);
    }

    function redirectToEnglish() {
        let path = window.location.pathname;
        
        // Логіка додавання /en/ у шлях
        if (path.endsWith('index.html')) {
            // .../castle-hill/index.html -> .../castle-hill/en/index.html
            path = path.replace('index.html', 'en/index.html');
        } else if (path.endsWith('/')) {
            path = path + 'en/';
        } else {
            path = path + '/en/';
        }
        window.location.href = path;
    }

    function redirectToUkrainian() {
        let path = window.location.pathname;
        
        // Логіка видалення /en/ зі шляху
        // Наприклад: .../castle-hill/en/index.html -> .../castle-hill/index.html
        path = path.replace('/en/', '/');
        
        // Якщо раптом шлях закінчується просто на /en (без слеша), прибираємо і його
        if (path.endsWith('/en')) {
            path = path.substring(0, path.length - 3);
        }
        
        window.location.href = path;
    }
});