(() => {
    // Konfigurace
    const config = {
        // Za jak dlouho po načtení stránky se má pop-up objevit.
        delaySeconds: 2,
        // Kolik dní po zavření pop-upu se může znovu objevit.
        shownCookieDurationDays: 90,
        shownCookieName: 'kurz_poup_shown',
        backdropId: 'online-course-backdrop',
        modalId: 'online-course-modal',
    };

    // Funkce pro získání cookie
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? match[2] : null;
    };

    // Funkce pro nastavení cookie
    const setCookie = (name, value, days) => {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires={date.toUTCString()}`;
        }
        document.cookie = `${name}=${value}${expires}; path=/`;
    };

    // Vytvoření DOM prvků
    const createElements = () => {
        const $backdrop = $(`<div id="${config.backdropId}" class="modal-backdrop fade"></div>`);
        const $modal = $(`
<div id="${config.modalId}" class="modal fade" tabindex="-1" role="dialog" aria-label="" aria-hidden="true" style="display: block;">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
      <div class="modal-body">
        <h2>Přihlašte se <br>do online kurzu <br>Dekarbonizujeme Česko</h2>
        <p>V online kurzu se podíváme na to, jak konkrétně snižovat emise ČR. A pomůžeme vám najít, jak se můžete zapojit právě vy.</p>
        <div class="icons-container">
          <div>
            <img src="/assets-local/img/icoBigHodiny.svg"><br>
            <span class="big-number">10</span><br>hodin studia
          </div>
          <div>
            <img src="/assets-local/img/icoBigLekce.svg"><br>
            <span class="big-number">11</span><br>interaktivních lekcí
          </div>
          <div>
            <img src="/assets-local/img/icoBigExperts.svg"><br>
            <span class="big-number">20</span><br>odborných autorek a autorů
          </div>
        </div>
        <a id="online-course" class="ext-link ext-link nav-link no-ext-link-icon btn btn-white" href="https://dekarbonizujemecesko.cz/" target="_blank" rel="noopener noreferrer">
          <i class="fa-solid fa-hand"></i> Chci se přihlásit
        </a>
      </div>
    </div>
  </div>
</div>
        `);

        $backdrop.hide();
        $modal.hide();

        $backdrop.appendTo(document.body);
        $modal.appendTo(document.body);
    };

    const setupMainDialogListeners = () => {
        const $closeBtn = $(`#${config.modalId} .close`);

        $closeBtn.click(() => {
            $(`#${config.backdropId}`).hide();
            $(`#${config.modalId}`).hide();

            // Po zavření okna ho už příště nezobrazujeme.
            setCookie(config.shownCookieName, 'true', config.shownCookieDurationDays);
        });
    };

    // Inicializace
    const init = () => {
        // Pokud dotazník byl dokončen, nic nezobrazujeme.
        if (getCookie(config.shownCookieName)) {
            return;
        }

        // První návštěva -- zobrazíme modální okno/pop-up.
        createElements();
        setupMainDialogListeners();

        // Zobrazení pop-up okna po nastaveném zpoždění
        setTimeout(function() {
            $(`#${config.backdropId}`).show().addClass("show");
            $(`#${config.modalId}`).show().addClass("show");
        }, 1000 * config.delaySeconds);
    };

    // Spuštění inicializace po načtení DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOMContentLoaded již proběhl
        init();
    }
})();
