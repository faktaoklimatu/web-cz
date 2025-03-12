/**
 * Survio Pop-up Script
 * Vylepšený skript pro vytvoření pop-up okna s formulářem Survio
 * - Detekce dokončení pomocí časovače
 * - Systém více cookies pro různé stavy
 */
(function() {
    // Konfigurace
    const config = {
        surveyUrl: "https://www.survio.com/survey/d/U1W4V6F5A5K9W0L3B",
        delay: 3000, // 3 sekundy po načtení stránky, za které se zobrazí okno
        cookieDuration: 3, // 3 dny - pro sv_form_dismissed - okno se nezobrazí 3 dny po zavření
        completedCookieDuration: 30, // 30 dní - pro sv_form_completed - po dokončení dotazníku se již nic nezobrazí po tento počet dnů
        shownCookieDuration: 3, // 3 dny - pro sv_form_shown - při opakované návštěvě se zobrazí jen malé okno, pokud není zavřeno
        completionTime: 1.5 * 60 * 1000, // 1.5 minuty v milisekundách - čas po kterém se vyplňování dotazníku považuje za dokončené a okno se po zavření už nezobrazí
        cookieName: 'sv_form_dismissed',
        completedCookieName: 'sv_form_completed',
        shownCookieName: 'sv_form_shown'
    };

    // Funkce pro nastavení cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    // Funkce pro získání cookie
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    // Vytvoření CSS
    function injectStyles() {
        const styles = `
            .survio-backdrop {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 1000;
            }

            .survio-dialog {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
                max-width: 800px;
                height: 92%;
                background-color: white;
                border-radius: 5px 5px 5px 5px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
                z-index: 1001;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            .survio-close-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                background: white;
                border: none;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                z-index: 10;
                transition: color 0.3s, background-color 0.3s;
                line-height: 1;
                padding: 0;
            }

            .survio-close-btn:hover {
                color: #000;
                background-color: #f0f0f0;
            }

            .survio-popup-content {
                flex-grow: 1;
                overflow: auto;
                padding: 0;
                width: 100%;
                height: 100%;
            }

            .survio-popup-content iframe {
                width: 100%;
                height: 100%;
                border: none;
            }

            .survio-cookie-info {
                width: 100%;
                text-align: center;
                padding: 8px;
                font-size: 11px;
                color: #777;
                background-color: #f9f9f9;
                border-top: 1px solid #eee;
                border-radius: 0 0 5px 5px;
            }

            .survio-second-modal {
                display: none;
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 85%;
                background-color: white;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
                z-index: 1002;
                text-align: center;
                font-family: "Source Sans Pro", sans-serif !important;
                color: #3a3a45;
                font-size: 0.9rem;
                background: #f7f7f7;
                transition: all 0.3s ease;
                left: 50%;
                transform: translateX(-50%);
            }

            .survio-second-modal p {
                margin: 5px 0 10px 0;
                line-height: 1.4;
            }

            .survio-button-container {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-bottom: 5px;
            }

            .survio-modal-btn {
                padding: 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
                transition: background-color 0.3s;
                font-size: 1rem;
            }

            .survio-open-btn {
                background-color: #a2c0ff;
                color: #000;
            }

            .survio-open-btn:hover {
                background-color: #45a049;
            }

            .survio-close-modal-btn {
                background-color: #f1f1f1;
                color: #333;
            }

            .survio-close-modal-btn:hover {
                background-color: #e0e0e0;
            }

            @media (min-width: 768px) {
                .survio-dialog {
                    height: 80%;
                }

                .survio-second-modal {
                    width: 300px;
                    left: auto;
                    transform: none;
                }

                .survio-modal-btn {
                    padding: 8px 12px;
                    font-size: 0.8rem;
                }
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    // Vytvoření DOM prvků
    function createElements() {
        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'survio-backdrop';
        overlay.id = 'survioBackdrop';

        // Hlavní popup
        const popup = document.createElement('div');
        popup.className = 'survio-dialog';
        popup.id = 'survioDialog';

        // Tlačítko pro zavření
        const closeBtn = document.createElement('button');
        closeBtn.className = 'survio-close-btn';
        closeBtn.id = 'survioCloseBtn';
        closeBtn.innerHTML = '✕';

        // Obsah popu-up
        const popupContent = document.createElement('div');
        popupContent.className = 'survio-popup-content';

        // iFrame
        const iframe = document.createElement('iframe');
        iframe.src = config.surveyUrl;
        iframe.title = 'Dotazník';
        iframe.id = 'survioIframe';

        // Info o cookies
        const cookieInfo = document.createElement('div');
        cookieInfo.className = 'survio-cookie-info';
        cookieInfo.textContent = 'Zavřením okna se vám uloží cookie, která zajistí, že se vám okno během 3 dnů nezobrazí';

        // Druhé modální okno
        const secondModal = document.createElement('div');
        secondModal.className = 'survio-second-modal';
        secondModal.id = 'survioSecondModal';

        // Text v druhém modálním okně
        const modalText = document.createElement('p');
        modalText.textContent = 'Chcete se k dotazníku vrátit později? Otevřete si jej v novém okně.';

        // Kontejner pro tlačítka
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'survio-button-container';

        // Tlačítko pro otevření v novém okně
        const openBtn = document.createElement('button');
        openBtn.className = 'survio-modal-btn survio-open-btn';
        openBtn.id = 'survioOpenNewWindow';
        openBtn.textContent = 'Otevřít v novém okně';

        // Tlačítko pro zavření
        const closeModalBtn = document.createElement('button');
        closeModalBtn.className = 'survio-modal-btn survio-close-modal-btn';
        closeModalBtn.id = 'survioCloseModal';
        closeModalBtn.textContent = 'Zavřít';

        // Sestavení struktury
        popupContent.appendChild(iframe);
        popup.appendChild(closeBtn);
        popup.appendChild(popupContent);
        popup.appendChild(cookieInfo);
        overlay.appendChild(popup);

        buttonContainer.appendChild(openBtn);
        buttonContainer.appendChild(closeModalBtn);
        secondModal.appendChild(modalText);
        secondModal.appendChild(buttonContainer);

        document.body.appendChild(overlay);
        document.body.appendChild(secondModal);
    }

    // Nová funkce pro detekci dokončení dotazníku podle času
    function setupCompletionDetection() {
        let completionTimer = null;
        let startTime = Date.now();
        let formCompleted = false;
        
        // Sledování aktivity v iframe
        document.getElementById('survioIframe').addEventListener('mouseenter', function() {
            // Reset časovače při interakci s iframe
            startTime = Date.now();
        });
        
        // Časovač pro kontrolu dokončení
        completionTimer = setInterval(function() {
            const timeSpent = Date.now() - startTime;
            
            // Pokud uživatel strávil dostatečný čas vyplňováním dotazníku
            if (timeSpent >= config.completionTime && !formCompleted) {
                formCompleted = true;
                
                // Nastavení cookie pro dokončený dotazník (delší platnost)
                setCookie(config.completedCookieName, 'true', config.completedCookieDuration);
                
                console.log('Dotazník považován za dokončený na základě času');
                clearInterval(completionTimer);
            }
        }, 10000); // Kontrola každých 10 sekund
        
        // Vyčištění časovače při zavření
        document.getElementById('survioCloseBtn').addEventListener('click', function() {
            if (completionTimer) {
                clearInterval(completionTimer);
            }
            
            // Pokud byl formulář dokončen na základě času, nezobrazujeme malé okno
            if (formCompleted || getCookie(config.completedCookieName)) {
                document.getElementById('survioSecondModal').style.display = 'none';
                document.getElementById('survioBackdrop').style.display = 'none';
            }
        });
        
        return {
            isCompleted: function() {
                return formCompleted || getCookie(config.completedCookieName);
            },
            cleanup: function() {
                if (completionTimer) {
                    clearInterval(completionTimer);
                }
            }
        };
    }

    // Přidání event listenerů
    function setupEventListeners() {
        const overlay = document.getElementById('survioBackdrop');
        const closeBtn = document.getElementById('survioCloseBtn');
        const secondModal = document.getElementById('survioSecondModal');
        const openNewWindow = document.getElementById('survioOpenNewWindow');
        const closeModal = document.getElementById('survioCloseModal');
        
        // Inicializace detekce dokončení
        const completionDetector = setupCompletionDetection();

        // Zavření pop-up okna a zobrazení druhého modálního okna
        closeBtn.addEventListener('click', function() {
            document.getElementById('survioDialog').style.display = 'none';
            
            // Nastavení cookie sv_form_shown při zavření velkého okna
            setCookie(config.shownCookieName, 'true', config.shownCookieDuration);
            
            // Pokud formulář nebyl dokončen, zobrazíme malé okno
            if (!completionDetector.isCompleted()) {
                overlay.style.display = 'none'; // Skrytí tmavého pozadí
                secondModal.style.display = 'block';
            } else {
                // Formulář byl dokončen, nezobrazujeme malé okno
                overlay.style.display = 'none';
            }
        });

        // Otevření dotazníku v novém okně
        openNewWindow.addEventListener('click', function() {
            window.open(config.surveyUrl, '_blank');
            secondModal.style.display = 'none';
            overlay.style.display = 'none';
            // Nastavení cookie sv_form_dismissed při interakci s malým oknem
            setCookie(config.cookieName, 'true', config.cookieDuration);
        });

        // Zavření druhého modálního okna
        closeModal.addEventListener('click', function() {
            secondModal.style.display = 'none';
            overlay.style.display = 'none';
            // Nastavení cookie sv_form_dismissed při interakci s malým oknem
            setCookie(config.cookieName, 'true', config.cookieDuration);
        });
    }

    // Inicializace
    function init() {
        // Kontrola priorit cookie:
        // 1. sv_form_completed - Pokud dotazník byl dokončen, nic nezobrazujeme
        if (getCookie(config.completedCookieName)) {
            console.log('Dotazník již byl dokončen, nezobrazujeme nic');
            return;
        }
        
        // 2. sv_form_dismissed - Pokud uživatel aktivně interagoval s malým oknem, nic nezobrazujeme
        if (getCookie(config.cookieName)) {
            console.log('Uživatel již zavřel dotazník, nezobrazujeme nic');
            return;
        }
        
        // 3. sv_form_shown - Pokud velké okno již bylo zobrazeno, ale uživatel s ním neinteragoval
        if (getCookie(config.shownCookieName)) {
            console.log('Velké okno již bylo zobrazeno, zobrazíme jen malé okno');
            injectStyles();
            createElements();
            
            // Zobrazit jen malé okno
            document.getElementById('survioSecondModal').style.display = 'block';
            
            // Nastavit event listenery
            const openNewWindow = document.getElementById('survioOpenNewWindow');
            const closeModal = document.getElementById('survioCloseModal');
            
            openNewWindow.addEventListener('click', function() {
                window.open(config.surveyUrl, '_blank');
                document.getElementById('survioSecondModal').style.display = 'none';
                setCookie(config.cookieName, 'true', config.cookieDuration);
            });
            
            closeModal.addEventListener('click', function() {
                document.getElementById('survioSecondModal').style.display = 'none';
                setCookie(config.cookieName, 'true', config.cookieDuration);
            });
            
            return;
        }
        
        // 4. Žádná cookie není nastavena - zobrazíme velké okno
        console.log('První návštěva, zobrazíme velké okno');
        injectStyles();
        createElements();
        setupEventListeners();

        // Zobrazení pop-up okna po nastaveném zpoždění
        setTimeout(function() {
            document.getElementById('survioBackdrop').style.display = 'block';
        }, config.delay);
    }

    // Spuštění inicializace po načtení DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOMContentLoaded již proběhl
        init();
    }
})();
