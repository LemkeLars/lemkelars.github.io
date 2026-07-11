/* Theme + language handling for larslemke.github.io
   Loaded with `defer`; the inline bootstrap in <head> has already set
   data-theme / data-lang so there is no flash of wrong theme/language. */

(function () {
    "use strict";

    var root = document.documentElement;

    /* ---------- Theme ---------- */

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
    }

    var themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            applyTheme(next);
            try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
        });
    }

    // Follow live system changes as long as the user hasn't chosen manually.
    var media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", function (ev) {
        var stored = null;
        try { stored = localStorage.getItem("theme"); } catch (e) { /* ignore */ }
        if (!stored) { applyTheme(ev.matches ? "dark" : "light"); }
    });

    /* ---------- Language ---------- */

    function applyLang(lang) {
        root.setAttribute("data-lang", lang);
        root.setAttribute("lang", lang);
        var label = document.getElementById("lang-label");
        // Button shows the language you would switch TO.
        if (label) { label.textContent = lang === "de" ? "EN" : "DE"; }
    }

    var langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
        langToggle.addEventListener("click", function () {
            var next = root.getAttribute("data-lang") === "de" ? "en" : "de";
            applyLang(next);
            try { localStorage.setItem("lang", next); } catch (e) { /* ignore */ }
        });
    }

    // Sync the toggle label with whatever the bootstrap picked.
    applyLang(root.getAttribute("data-lang") || "en");
})();
