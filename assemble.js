(function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Gate all entrance styles behind this class so the page renders
    // normally if JS is off
    document.documentElement.classList.add("assemble");

    // Wrap each character of an element in an animated span
    function wrapLetters(el, startDelay, step) {
        var text = el.textContent;
        el.textContent = "";
        var delay = startDelay;
        Array.prototype.forEach.call(text, function (ch) {
            if (ch === " ") {
                el.appendChild(document.createTextNode(" "));
                return;
            }
            var s = document.createElement("span");
            s.className = "letter";
            s.textContent = ch;
            s.style.animationDelay = delay + "ms";
            s.style.setProperty("--rot", (Math.random() * 24 - 12).toFixed(1) + "deg");
            el.appendChild(s);
            delay += step;
        });
        return delay;
    }

    // Wrap every letter in a span with a RANDOM delay so the text pieces
    // itself together in no particular order. Each word sits in an
    // inline-block shell so lines still wrap at word boundaries.
    function wrapLettersRandom(el, windowStart, windowEnd) {
        var tokens = el.textContent.split(/(\s+)/);
        el.textContent = "";
        tokens.forEach(function (tok) {
            if (!tok.trim()) {
                el.appendChild(document.createTextNode(" "));
                return;
            }
            var shell = document.createElement("span");
            shell.className = "word-shell";
            Array.prototype.forEach.call(tok, function (ch) {
                var s = document.createElement("span");
                s.className = "letter";
                s.textContent = ch;
                s.style.animationDelay =
                    Math.round(windowStart + Math.random() * (windowEnd - windowStart)) + "ms";
                s.style.setProperty("--rot", (Math.random() * 20 - 10).toFixed(1) + "deg");
                s.style.setProperty("--dx", (Math.random() * 0.8 - 0.4).toFixed(2) + "em");
                s.style.setProperty("--dy", (Math.random() * 1.1 - 0.5).toFixed(2) + "em");
                shell.appendChild(s);
            });
            el.appendChild(shell);
        });
    }

    var name = document.querySelector("nav h1");
    if (name) wrapLetters(name, 90, 54);

    document.querySelectorAll("section p").forEach(function (p) {
        wrapLettersRandom(p, 360, 1850);
    });

    // Text and buttons both finish at ~2.3s; drop the class shortly after
    // so the intro styles stop competing with the hover animations
    setTimeout(function () {
        document.documentElement.classList.remove("assemble");
    }, 2600);
})();
