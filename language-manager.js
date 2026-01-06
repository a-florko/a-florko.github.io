document.addEventListener("DOMContentLoaded", function () {
    const storageKey = 'siteLanguagePreference';
    const savedLang = localStorage.getItem(storageKey);
    const currentPath = window.location.pathname;

    const isEnglishPage = currentPath.includes('/en/') || currentPath.endsWith('/en');

    if (savedLang === 'en' && !isEnglishPage) {
        redirectToEnglish();
        return;
    }

    if (savedLang || isEnglishPage) {
        return;
    }

    createAndShowModal();

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
        btnUA.className = 'lang-btn';
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
        
        if (path.endsWith('index.html')) {
            path = path.substring(0, path.lastIndexOf('index.html'));
        }
        if (path.endsWith('/')) {
            path = path.substring(0, path.length - 1);
        }

        window.location.href = path + '/en/';
    }
});
