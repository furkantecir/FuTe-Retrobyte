// ==============================================================================
// FuTe Retrobyte - Theme Engine v8.2 (Ultimate Cyberdeck, Reactive Audio & Wallpapers)
// "Old hardware. New sound."
// Features: Dynamic Reactive Color, Cyber Wallpapers, Cassette/Vinyl/CD Decks,
//           Retro Pixel Snake, Cyber Terminal, CRT Scanlines, Hi-Fi VU Meter
// ==============================================================================

(function FuTeRetrobyteEngine() {
  // 1. INJECT GOOGLE FONTS
  function injectFonts() {
    if (!document.getElementById("fute-retrobyte-fonts")) {
      const link = document.createElement("link");
      link.id = "fute-retrobyte-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&family=Share+Tech+Mono&family=Space+Grotesk:wght@500;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap";
      document.head.appendChild(link);
    }
  }
  injectFonts();

  const SCHEMES = {
    "Crimson-Red": {
      name: "Crimson-Red",
      slot: "CH-01",
      badge: "FUTE CYBERDECK",
      desc: "FuTe Signature: Laser Red + Electric Cyan + Purple Glow on Deep Obsidian",
      colors: {
        "--spice-text": "#ffffff",
        "--spice-subtext": "#8a93a5",
        "--spice-main": "#050508",
        "--spice-main-elevated": "#0a0a0f",
        "--spice-highlight": "#120e1a",
        "--spice-highlight-elevated": "#170d24",
        "--spice-sidebar": "#060609",
        "--spice-player": "#060609",
        "--spice-card": "#09090e",
        "--spice-shadow": "#000000",
        "--spice-selected-row": "#ff1a40",
        "--spice-button": "#ff1a40",
        "--spice-button-active": "#ff4d6d",
        "--spice-button-disabled": "#33141c",
        "--spice-tab-active": "#00f0ff",
        "--spice-notification": "#ff1a40",
        "--spice-notification-error": "#ff0033",
        "--spice-misc": "#b5179e"
      }
    },
    "Neon-Outrun": {
      name: "Neon-Outrun",
      slot: "CH-02",
      badge: "SYNTHWAVE",
      desc: "Hot Magenta Pink & Electric Cyan on Midnight Violet",
      colors: {
        "--spice-text": "#ffffff",
        "--spice-subtext": "#c0a9e2",
        "--spice-main": "#090514",
        "--spice-main-elevated": "#140b2b",
        "--spice-highlight": "#221245",
        "--spice-highlight-elevated": "#311a61",
        "--spice-sidebar": "#0d071d",
        "--spice-player": "#07040f",
        "--spice-card": "#170d32",
        "--spice-shadow": "#000000",
        "--spice-selected-row": "#ff007f",
        "--spice-button": "#ff007f",
        "--spice-button-active": "#ff4da6",
        "--spice-button-disabled": "#38102a",
        "--spice-tab-active": "#00f0ff",
        "--spice-notification": "#00f0ff",
        "--spice-notification-error": "#ff0055",
        "--spice-misc": "#b5179e"
      }
    },
    "Toxic-Matrix": {
      name: "Toxic-Matrix",
      slot: "CH-03",
      badge: "RADIOACTIVE",
      desc: "High-Voltage Radioactive Lime & Matrix Emerald",
      colors: {
        "--spice-text": "#e6ffed",
        "--spice-subtext": "#69a377",
        "--spice-main": "#040b06",
        "--spice-main-elevated": "#08170c",
        "--spice-highlight": "#0e2413",
        "--spice-highlight-elevated": "#15361d",
        "--spice-sidebar": "#050e08",
        "--spice-player": "#020804",
        "--spice-card": "#0a1b0f",
        "--spice-shadow": "#000000",
        "--spice-selected-row": "#00ff66",
        "--spice-button": "#00ff66",
        "--spice-button-active": "#5cff9d",
        "--spice-button-disabled": "#0d2b16",
        "--spice-tab-active": "#00f5d4",
        "--spice-notification": "#00ff66",
        "--spice-notification-error": "#ff3366",
        "--spice-misc": "#39ff14"
      }
    },
    "Cyberdeck": {
      name: "Cyberdeck",
      slot: "CH-04",
      badge: "LASER CYAN",
      desc: "Ultra Electric Cyan & Neon Violet on Deep Obsidian",
      colors: {
        "--spice-text": "#f0faff",
        "--spice-subtext": "#8aa3b8",
        "--spice-main": "#050811",
        "--spice-main-elevated": "#0c1122",
        "--spice-highlight": "#131b33",
        "--spice-highlight-elevated": "#1c2747",
        "--spice-sidebar": "#070b16",
        "--spice-player": "#04060d",
        "--spice-card": "#0e1426",
        "--spice-shadow": "#000000",
        "--spice-selected-row": "#00f0ff",
        "--spice-button": "#00f0ff",
        "--spice-button-active": "#66f5ff",
        "--spice-button-disabled": "#132c38",
        "--spice-tab-active": "#d946ef",
        "--spice-notification": "#00f0ff",
        "--spice-notification-error": "#ff0055",
        "--spice-misc": "#a855f7"
      }
    },
    "Retrobyte": {
      name: "Retrobyte",
      slot: "CH-05",
      badge: "AMBER / BLUE",
      desc: "Classic Obsidian CRT + Amber Phosphor & Cyber Blue",
      colors: {
        "--spice-text": "#f4f7fa",
        "--spice-subtext": "#95a0b8",
        "--spice-main": "#090b10",
        "--spice-main-elevated": "#121622",
        "--spice-highlight": "#1a2030",
        "--spice-highlight-elevated": "#242c42",
        "--spice-sidebar": "#0c0e14",
        "--spice-player": "#07080d",
        "--spice-card": "#111520",
        "--spice-shadow": "#000000",
        "--spice-selected-row": "#ff9d2e",
        "--spice-button": "#ff9d2e",
        "--spice-button-active": "#ffb85c",
        "--spice-button-disabled": "#332415",
        "--spice-tab-active": "#00c2ff",
        "--spice-notification": "#00c2ff",
        "--spice-notification-error": "#ff3366",
        "--spice-misc": "#ff4081"
      }
    }
  };

  let currentSchemeKey = localStorage.getItem("fute-retrobyte-scheme") || "Crimson-Red";
  if (!SCHEMES[currentSchemeKey]) currentSchemeKey = "Crimson-Red";

  let sfxEnabled = localStorage.getItem("fute-retrobyte-sfx") === "true";
  let crtEnabled = localStorage.getItem("fute-retrobyte-crt") !== "false";
  let currentDeckMode = localStorage.getItem("fute-deck-mode") || "cassette"; // cassette | vinyl | cd | off
  let dynamicColorEnabled = localStorage.getItem("fute-dynamic-color") === "true";
  let currentWallpaper = localStorage.getItem("fute-wallpaper") || "off"; // off | grid | city | matrix | custom
  let customWallpaperUrl = localStorage.getItem("fute-wallpaper-custom-url") || "";

  // --- 2. 8-BIT RETRO AUDIO SFX ---
  let audioCtx = null;
  function playTactileClick(freq = 520, decay = 0.03) {
    if (!sfxEnabled) return;
    try {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
      }
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + decay);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + decay);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + decay);
    } catch (e) {}
  }

  // --- 3. CRT TOGGLE CONTROLLER ---
  function setCRT(enabled) {
    crtEnabled = enabled;
    localStorage.setItem("fute-retrobyte-crt", enabled);
    if (enabled) {
      document.body.classList.remove("fute-crt-disabled");
    } else {
      document.body.classList.add("fute-crt-disabled");
    }
    const crtBtn = document.getElementById("retrobyte-crt-status");
    if (crtBtn) crtBtn.textContent = enabled ? "ON" : "OFF";
  }

  // --- 4. APPLY SCHEME ---
  function applyScheme(schemeKey) {
    if (!SCHEMES[schemeKey]) return;
    currentSchemeKey = schemeKey;
    localStorage.setItem("fute-retrobyte-scheme", schemeKey);

    const scheme = SCHEMES[schemeKey];
    const root = document.documentElement;

    for (const [prop, val] of Object.entries(scheme.colors)) {
      root.style.setProperty(prop, val);
    }

    document.querySelectorAll(".retrobyte-osd-item").forEach(item => {
      const key = item.getAttribute("data-scheme-key");
      if (key === schemeKey) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // --- 5. DYNAMIC COVER REACTIVE COLOR ENGINE ---
  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("");
  }

  function adjustColor(r, g, b, factor) {
    return {
      r: Math.min(255, Math.max(0, r * factor)),
      g: Math.min(255, Math.max(0, g * factor)),
      b: Math.min(255, Math.max(0, b * factor))
    };
  }

  function extractAndApplyCoverColor() {
    if (!dynamicColorEnabled) return;
    if (!window.Spicetify || !Spicetify.Player || !Spicetify.Player.data) return;

    const data = Spicetify.Player.data;
    if (!data.item || !data.item.metadata) return;

    const meta = data.item.metadata;
    const imgUrl = meta.image_xlarge_url || meta.image_url || meta.image_large_url;
    if (!imgUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 32, 32);
        const imgData = ctx.getImageData(0, 0, 32, 32).data;

        let bestColor = { r: 255, g: 26, b: 64 };
        let maxScore = -1;

        for (let i = 0; i < imgData.length; i += 16) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const delta = max - min;
          const lum = (max + min) / 2;

          // Prefer saturated, vivid colors (not too dark, not too bright white)
          if (lum > 40 && lum < 220 && delta > 30) {
            const score = delta * 1.5 + (128 - Math.abs(lum - 128));
            if (score > maxScore) {
              maxScore = score;
              bestColor = { r, g, b };
            }
          }
        }

        const baseHex = rgbToHex(bestColor.r, bestColor.g, bestColor.b);
        const active = adjustColor(bestColor.r, bestColor.g, bestColor.b, 1.25);
        const activeHex = rgbToHex(active.r, active.g, active.b);
        const disabled = adjustColor(bestColor.r, bestColor.g, bestColor.b, 0.25);
        const disabledHex = rgbToHex(disabled.r, disabled.g, disabled.b);

        const root = document.documentElement;
        root.style.setProperty("--spice-button", baseHex);
        root.style.setProperty("--spice-selected-row", baseHex);
        root.style.setProperty("--spice-tab-active", activeHex);
        root.style.setProperty("--spice-notification", baseHex);
        root.style.setProperty("--spice-misc", baseHex);
        root.style.setProperty("--spice-button-active", activeHex);
        root.style.setProperty("--spice-button-disabled", disabledHex);
      } catch (e) {}
    };
    img.src = imgUrl;
  }

  function setDynamicColor(enabled) {
    dynamicColorEnabled = enabled;
    localStorage.setItem("fute-dynamic-color", enabled);
    const btn = document.getElementById("retrobyte-dynamic-status");
    if (btn) btn.textContent = enabled ? "ON" : "OFF";

    if (enabled) {
      extractAndApplyCoverColor();
    } else {
      applyScheme(currentSchemeKey);
    }
  }

  // --- 6. RETRO CYBER WALLPAPER CONTROLLER ---
  function setWallpaper(mode, customUrl = null) {
    const validModes = ["off", "grid", "city", "matrix", "custom"];
    if (!validModes.includes(mode)) mode = "off";
    currentWallpaper = mode;
    localStorage.setItem("fute-wallpaper", mode);

    if (customUrl) {
      customWallpaperUrl = customUrl;
      localStorage.setItem("fute-wallpaper-custom-url", customUrl);
    }

    document.body.classList.remove("fute-bg-grid", "fute-bg-city", "fute-bg-matrix", "fute-bg-custom");

    if (mode === "grid") {
      document.body.classList.add("fute-bg-grid");
    } else if (mode === "city") {
      document.body.classList.add("fute-bg-city");
    } else if (mode === "matrix") {
      document.body.classList.add("fute-bg-matrix");
    } else if (mode === "custom") {
      document.body.classList.add("fute-bg-custom");
      if (customWallpaperUrl) {
        document.documentElement.style.setProperty("--fute-custom-wallpaper-url", `url('${customWallpaperUrl}')`);
      }
    }

    const btn = document.getElementById("retrobyte-wallpaper-status");
    if (btn) btn.textContent = mode.toUpperCase();
  }

  function cycleWallpaper() {
    const modes = ["off", "grid", "city", "matrix", "custom"];
    let nextIdx = (modes.indexOf(currentWallpaper) + 1) % modes.length;
    const nextMode = modes[nextIdx];
    if (nextMode === "custom" && !customWallpaperUrl) {
      const url = prompt("Enter Cyber Wallpaper Image URL:");
      if (url && url.trim()) {
        setWallpaper("custom", url.trim());
        return;
      }
    }
    setWallpaper(nextMode);
  }

  // --- 7. MEDIA DECK CONTROLLER (Cassette / Vinyl / CD / Off) ---
  function setDeckMode(mode) {
    const validModes = ["cassette", "vinyl", "cd", "off"];
    if (!validModes.includes(mode)) mode = "cassette";
    currentDeckMode = mode;
    localStorage.setItem("fute-deck-mode", mode);

    const overlay = document.getElementById("fute-deck-overlay");
    if (overlay) overlay.remove();

    const deckBtn = document.getElementById("retrobyte-deck-status");
    if (deckBtn) deckBtn.textContent = mode.toUpperCase();

    updateRightSidebarDeck();
  }

  function cycleDeckMode() {
    const modes = ["cassette", "vinyl", "cd", "off"];
    let nextIdx = (modes.indexOf(currentDeckMode) + 1) % modes.length;
    setDeckMode(modes[nextIdx]);
  }

  function updateRightSidebarDeck() {
    const coverArtContainer = document.querySelector(".main-nowPlayingView-coverArtContainer");
    if (coverArtContainer && currentDeckMode !== "off") {
      let overlay = document.getElementById("fute-deck-overlay");
      if (!overlay || overlay.getAttribute("data-deck-mode") !== currentDeckMode) {
        if (overlay) overlay.remove();
        overlay = document.createElement("div");
        overlay.id = "fute-deck-overlay";
        overlay.setAttribute("data-deck-mode", currentDeckMode);

        if (currentDeckMode === "cassette") {
          overlay.className = "retro-deck-overlay retro-cassette-overlay";
          overlay.innerHTML = `
            <div class="cassette-tape-header">
              <span class="tape-badge">A-SIDE // HI-FI 44.1kHz</span>
              <span class="tape-rec-led">● REC</span>
            </div>
            <div class="cassette-window">
              <div class="cassette-reel left-reel"><div class="reel-spokes"></div></div>
              <div class="cassette-tape-bridge"></div>
              <div class="cassette-reel right-reel"><div class="reel-spokes"></div></div>
            </div>
          `;
        } else if (currentDeckMode === "vinyl") {
          overlay.className = "retro-deck-overlay retro-vinyl-overlay";
          overlay.innerHTML = `
            <div class="vinyl-record">
              <div class="vinyl-grooves"></div>
              <div class="vinyl-center-label">
                <span class="vinyl-speed">33⅓ RPM</span>
              </div>
            </div>
            <div class="vinyl-tonearm">
              <div class="tonearm-head"></div>
            </div>
          `;
        } else if (currentDeckMode === "cd") {
          overlay.className = "retro-deck-overlay retro-cd-overlay";
          overlay.innerHTML = `
            <div class="cd-disc">
              <div class="cd-hologram"></div>
              <div class="cd-inner-ring">
                <div class="cd-spindle-hole"></div>
              </div>
            </div>
            <div class="cd-lens-laser"></div>
          `;
        }
        coverArtContainer.appendChild(overlay);
      }
    } else if (coverArtContainer && currentDeckMode === "off") {
      const overlay = document.getElementById("fute-deck-overlay");
      if (overlay) overlay.remove();
    }

    // VU Meter underneath cover art
    const nowPlayingView = document.querySelector(".main-nowPlayingView-nowPlayingWidget") || 
                           document.querySelector(".main-nowPlayingView-contentWrapper");
    if (nowPlayingView && !document.getElementById("fute-right-vumeter")) {
      const vuMeter = document.createElement("div");
      vuMeter.id = "fute-right-vumeter";
      vuMeter.className = "retro-hifi-vumeter";
      vuMeter.innerHTML = `
        <div class="vumeter-header">
          <span>STEREO PEAK LEVEL</span>
          <span class="vu-db-text">[VU METER - dB]</span>
        </div>
        <div class="vumeter-channels">
          <div class="vu-channel">
            <span class="ch-label">L</span>
            <div class="vu-led-strip left-strip">
              <span class="led g"></span><span class="led g"></span><span class="led g"></span>
              <span class="led y"></span><span class="led y"></span>
              <span class="led r"></span><span class="led r"></span>
            </div>
          </div>
          <div class="vu-channel">
            <span class="ch-label">R</span>
            <div class="vu-led-strip right-strip">
              <span class="led g"></span><span class="led g"></span><span class="led g"></span>
              <span class="led y"></span><span class="led y"></span>
              <span class="led r"></span><span class="led r"></span>
            </div>
          </div>
        </div>
      `;
      const targetSec = nowPlayingView.querySelector(".main-nowPlayingView-section") || nowPlayingView;
      if (targetSec.parentNode) {
        targetSec.parentNode.insertBefore(vuMeter, targetSec);
      }
    }

    // Sync play state to Deck Overlay & VU Meter
    const isPlaying = window.Spicetify && Spicetify.Player && Spicetify.Player.isPlaying();
    const overlayElem = document.getElementById("fute-deck-overlay");
    const vumeter = document.getElementById("fute-right-vumeter");
    if (overlayElem) {
      if (isPlaying) overlayElem.classList.add("is-playing");
      else overlayElem.classList.remove("is-playing");
    }
    if (vumeter) {
      if (isPlaying) vumeter.classList.add("is-playing");
      else vumeter.classList.remove("is-playing");
    }
  }

  // --- 8. RETRO ARCADE (PIXEL SNAKE MINI GAME) ---
  const RetroArcade = {
    modal: null,
    canvas: null,
    ctx: null,
    gameInterval: null,
    snakeState: null,

    initModal() {
      if (this.modal) return;
      this.modal = document.createElement("div");
      this.modal.id = "fute-retro-arcade-modal";
      this.modal.className = "retro-arcade-backdrop";
      this.modal.tabIndex = 0;
      this.modal.innerHTML = `
        <div class="retro-arcade-window">
          <div class="arcade-titlebar">
            <span class="arcade-title">👾 PIXEL SNAKE ARCADE</span>
            <button class="arcade-close" id="arcade-close-btn">[X]</button>
          </div>
          <div class="arcade-screen-container">
            <canvas id="fute-arcade-canvas" width="400" height="400" tabindex="1"></canvas>
            <div class="arcade-hud" id="arcade-hud">
              <span id="arcade-score-display">SCORE: 0000 | HI: 0000</span>
              <button class="arcade-restart-btn" id="arcade-restart-btn">[RESTART (SPACE)]</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(this.modal);

      this.canvas = this.modal.querySelector("#fute-arcade-canvas");
      this.ctx = this.canvas.getContext("2d");

      this.modal.querySelector("#arcade-close-btn").addEventListener("click", () => this.close());
      this.modal.querySelector("#arcade-restart-btn").addEventListener("click", () => {
        this.resetSnake();
        if (this.canvas) this.canvas.focus();
      });

      this.canvas.addEventListener("click", () => {
        if (this.snakeState && this.snakeState.gameOver) {
          this.resetSnake();
        }
      });

      const handleSnakeKeys = (e) => {
        if (!this.modal || !this.modal.classList.contains("open")) return;
        
        const isSpace = e.code === "Space" || e.key === " " || e.key === "Spacebar" || e.keyCode === 32;
        if (isSpace) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          if (this.snakeState) {
            this.resetSnake();
          }
          return;
        }

        if (e.key === "Escape") {
          e.preventDefault();
          this.close();
          return;
        }

        if (this.snakeState && !this.snakeState.gameOver) {
          const key = e.key.toLowerCase();
          const d = this.snakeState.dir;
          if ((key === "arrowup" || key === "w") && d.y === 0) { 
            e.preventDefault(); e.stopPropagation(); 
            this.snakeState.nextDir = { x: 0, y: -1 }; 
          }
          if ((key === "arrowdown" || key === "s") && d.y === 0) { 
            e.preventDefault(); e.stopPropagation(); 
            this.snakeState.nextDir = { x: 0, y: 1 }; 
          }
          if ((key === "arrowleft" || key === "a") && d.x === 0) { 
            e.preventDefault(); e.stopPropagation(); 
            this.snakeState.nextDir = { x: -1, y: 0 }; 
          }
          if ((key === "arrowright" || key === "d") && d.x === 0) { 
            e.preventDefault(); e.stopPropagation(); 
            this.snakeState.nextDir = { x: 1, y: 0 }; 
          }
        }
      };

      window.addEventListener("keydown", handleSnakeKeys, true);
    },

    open() {
      this.initModal();
      this.modal.classList.add("open");
      this.startSnake();
      setTimeout(() => {
        if (this.canvas) this.canvas.focus();
      }, 100);
    },

    close() {
      if (this.modal) this.modal.classList.remove("open");
      this.stop();
    },

    stop() {
      if (this.gameInterval) clearInterval(this.gameInterval);
      this.gameInterval = null;
    },

    // --- SNAKE GAME LOGIC ---
    resetSnake() {
      const hiScore = parseInt(localStorage.getItem("fute-snake-hi") || "0", 10);
      this.snakeState = {
        gridSize: 20,
        tileCount: 20,
        snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }],
        dir: { x: 0, y: -1 },
        nextDir: { x: 0, y: -1 },
        food: { x: 5, y: 5 },
        score: 0,
        hiScore: hiScore,
        gameOver: false
      };
      this.spawnFood();
      this.updateScoreHud();
      this.renderSnake();
    },

    spawnFood() {
      const tc = this.snakeState.tileCount;
      let newFood;
      while (true) {
        newFood = {
          x: Math.floor(Math.random() * tc),
          y: Math.floor(Math.random() * tc)
        };
        const collision = this.snakeState.snake.some(s => s.x === newFood.x && s.y === newFood.y);
        if (!collision) break;
      }
      this.snakeState.food = newFood;
    },

    updateScoreHud() {
      const s = this.snakeState;
      const scoreTxt = `SCORE: ${String(s.score).padStart(4, "0")} | HI: ${String(s.hiScore).padStart(4, "0")}`;
      const disp = this.modal.querySelector("#arcade-score-display");
      if (disp) disp.textContent = scoreTxt;
    },

    startSnake() {
      this.stop();
      this.resetSnake();
      this.gameInterval = setInterval(() => {
        this.stepSnake();
        this.renderSnake();
      }, 110);
    },

    stepSnake() {
      const s = this.snakeState;
      if (!s || s.gameOver) return;

      s.dir = s.nextDir;
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

      // Wall collision
      if (head.x < 0 || head.x >= s.tileCount || head.y < 0 || head.y >= s.tileCount) {
        s.gameOver = true;
        playTactileClick(150, 0.2);
        return;
      }

      // Self collision
      if (s.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        s.gameOver = true;
        playTactileClick(150, 0.2);
        return;
      }

      s.snake.unshift(head);

      // Eat Food
      if (head.x === s.food.x && head.y === s.food.y) {
        s.score += 10;
        if (s.score > s.hiScore) {
          s.hiScore = s.score;
          localStorage.setItem("fute-snake-hi", s.hiScore);
        }
        this.updateScoreHud();
        playTactileClick(800, 0.05);
        this.spawnFood();
      } else {
        s.snake.pop();
      }
    },

    renderSnake() {
      if (!this.ctx || !this.snakeState) return;
      const ctx = this.ctx;
      const s = this.snakeState;
      const w = this.canvas.width;
      const h = this.canvas.height;
      const ts = s.gridSize;

      // Dark background
      ctx.fillStyle = "#05080c";
      ctx.fillRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += ts) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += ts) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Food (Neon Red / Apple Pixel)
      ctx.fillStyle = "#ff1a40";
      ctx.shadowColor = "#ff1a40";
      ctx.shadowBlur = 8;
      ctx.fillRect(s.food.x * ts + 2, s.food.y * ts + 2, ts - 4, ts - 4);

      // Snake Body
      s.snake.forEach((seg, idx) => {
        if (idx === 0) {
          ctx.fillStyle = "#00ff66";
          ctx.shadowColor = "#00ff66";
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "#00cc55";
          ctx.shadowBlur = 0;
        }
        ctx.fillRect(seg.x * ts + 1, seg.y * ts + 1, ts - 2, ts - 2);
      });
      ctx.shadowBlur = 0;

      // Game Over Overlay
      if (s.gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#ff1a40";
        ctx.font = "800 22px 'Press Start 2P', monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", w / 2, h / 2 - 20);

        ctx.fillStyle = "#00ff66";
        ctx.font = "800 13px 'JetBrains Mono', monospace";
        ctx.fillText("PRESS [SPACE] OR CLICK TO RESTART", w / 2, h / 2 + 25);
      }
    }
  };

  // --- 9. CYBER COMMAND TERMINAL (HACKER CONSOLE) ---
  function showCyberTerminal() {
    let terminal = document.getElementById("retrobyte-cyber-terminal");
    if (!terminal) {
      terminal = document.createElement("div");
      terminal.id = "retrobyte-cyber-terminal";
      terminal.className = "retro-cyber-terminal-backdrop";
      terminal.innerHTML = `
        <div class="retro-cyber-terminal-window">
          <div class="terminal-titlebar">
            <span class="terminal-title">▶ FUTE CYBER COMMAND TERMINAL v8.2 ◀</span>
            <button class="terminal-close" id="fute-terminal-close">[X]</button>
          </div>
          <div class="terminal-output" id="fute-terminal-output">
            <div class="term-line welcome">=====================================================</div>
            <div class="term-line welcome"> FUTE RETROBYTE WORKSTATION OS (TYPE 'help' FOR COMMANDS)</div>
            <div class="term-line welcome">=====================================================</div>
            <div class="term-line info"> SYSTEM READY. 44.1kHz PCM DECK ONLINE.</div>
          </div>
          <div class="terminal-input-row">
            <span class="prompt">FUTE@DECK:~$</span>
            <input type="text" id="fute-terminal-input" autocomplete="off" spellcheck="false" placeholder="type command...">
          </div>
        </div>
      `;
      document.body.appendChild(terminal);

      terminal.querySelector("#fute-terminal-close").addEventListener("click", () => {
        terminal.classList.remove("open");
      });

      const termInput = terminal.querySelector("#fute-terminal-input");
      const termOutput = terminal.querySelector("#fute-terminal-output");

      function printLine(text, type = "normal") {
        const line = document.createElement("div");
        line.className = `term-line ${type}`;
        line.textContent = text;
        termOutput.appendChild(line);
        termOutput.scrollTop = termOutput.scrollHeight;
      }

      function executeCommand(cmdStr) {
        const parts = cmdStr.trim().split(" ");
        const cmd = parts[0].toLowerCase();
        const arg = parts.slice(1).join(" ").toLowerCase();

        printLine(`FUTE@DECK:~$ ${cmdStr}`, "cmd");

        switch (cmd) {
          case "help":
            printLine(" AVAILABLE COMMANDS:", "info");
            printLine("  play / pause / toggle : Controls audio playback");
            printLine("  next / prev           : Skip tracks");
            printLine("  vol <0-100>           : Set volume (e.g. vol 75)");
            printLine("  deck <cassette|vinyl|cd|off> : Switch media deck overlay");
            printLine("  dynamic <on|off>      : Toggle dynamic album reactive color");
            printLine("  wallpaper <off|grid|city|matrix|url> : Set background wallpaper");
            printLine("  game / snake          : Open Retro Pixel Snake arcade game");
            printLine("  theme <name>          : crimson, outrun, matrix, cyberdeck, retrobyte");
            printLine("  crt <on|off>          : Toggle CRT scanline overlay");
            printLine("  sfx <on|off>          : Toggle 8-bit click sounds");
            printLine("  status                : Show current track & system telemetry");
            printLine("  clear                 : Clear terminal log");
            printLine("  exit                  : Close terminal");
            break;

          case "play":
            if (Spicetify.Player) Spicetify.Player.play();
            printLine(" [EXEC] Playback started.", "success");
            break;

          case "pause":
            if (Spicetify.Player) Spicetify.Player.pause();
            printLine(" [EXEC] Playback paused.", "success");
            break;

          case "toggle":
            if (Spicetify.Player) Spicetify.Player.togglePlay();
            printLine(" [EXEC] Playback toggled.", "success");
            break;

          case "next":
            if (Spicetify.Player) Spicetify.Player.next();
            printLine(" [EXEC] Track skipped to NEXT.", "success");
            break;

          case "prev":
          case "previous":
            if (Spicetify.Player) Spicetify.Player.previous();
            printLine(" [EXEC] Track skipped to PREVIOUS.", "success");
            break;

          case "vol":
          case "volume":
            const num = parseInt(arg, 10);
            if (!isNaN(num) && num >= 0 && num <= 100) {
              if (Spicetify.Player) Spicetify.Player.setVolume(num / 100);
              printLine(` [EXEC] Volume set to ${num}%.`, "success");
            } else {
              printLine(" [ERROR] Invalid volume. Usage: vol 0-100", "error");
            }
            break;

          case "deck":
            if (["cassette", "vinyl", "cd", "off"].includes(arg)) {
              setDeckMode(arg);
              printLine(` [EXEC] Deck mode switched to: ${arg.toUpperCase()}`, "success");
            } else {
              printLine(" [ERROR] Usage: deck cassette | deck vinyl | deck cd | deck off", "error");
            }
            break;

          case "dynamic":
            if (arg === "on" || arg === "1") {
              setDynamicColor(true);
              printLine(" [EXEC] Dynamic reactive color ENABLED.", "success");
            } else if (arg === "off" || arg === "0") {
              setDynamicColor(false);
              printLine(" [EXEC] Dynamic reactive color DISABLED.", "success");
            } else {
              printLine(" [ERROR] Usage: dynamic on / dynamic off", "error");
            }
            break;

          case "wallpaper":
          case "bg":
            if (["off", "grid", "city", "matrix"].includes(arg)) {
              setWallpaper(arg);
              printLine(` [EXEC] Wallpaper set to: ${arg.toUpperCase()}`, "success");
            } else if (arg.startsWith("http://") || arg.startsWith("https://")) {
              setWallpaper("custom", arg);
              printLine(" [EXEC] Custom wallpaper applied.", "success");
            } else {
              printLine(" [ERROR] Usage: wallpaper off | grid | city | matrix | <url>", "error");
            }
            break;

          case "game":
          case "snake":
            terminal.classList.remove("open");
            RetroArcade.open();
            break;

          case "theme":
            const matched = Object.keys(SCHEMES).find(k => k.toLowerCase().includes(arg) || arg.includes(k.toLowerCase()));
            if (matched) {
              setDynamicColor(false);
              applyScheme(matched);
              printLine(` [EXEC] Theme changed to: ${matched}`, "success");
            } else {
              printLine(` [ERROR] Theme not found. Available: ${Object.keys(SCHEMES).join(", ")}`, "error");
            }
            break;

          case "crt":
            if (arg === "on" || arg === "1") {
              setCRT(true);
              printLine(" [EXEC] CRT scanlines enabled.", "success");
            } else if (arg === "off" || arg === "0") {
              setCRT(false);
              printLine(" [EXEC] CRT scanlines disabled.", "success");
            } else {
              printLine(" [ERROR] Usage: crt on / crt off", "error");
            }
            break;

          case "sfx":
            if (arg === "on" || arg === "1") {
              sfxEnabled = true;
              localStorage.setItem("fute-retrobyte-sfx", "true");
              printLine(" [EXEC] 8-Bit SFX enabled.", "success");
            } else if (arg === "off" || arg === "0") {
              sfxEnabled = false;
              localStorage.setItem("fute-retrobyte-sfx", "false");
              printLine(" [EXEC] 8-Bit SFX disabled.", "success");
            } else {
              printLine(" [ERROR] Usage: sfx on / sfx off", "error");
            }
            break;

          case "status":
            if (Spicetify.Player) {
              const data = Spicetify.Player.data || {};
              const track = data.item ? data.item.metadata : {};
              printLine(" --- TELEMETRY STATUS ---", "info");
              printLine(` TRACK    : ${track.title || "Unknown"}`);
              printLine(` ARTIST   : ${track.artist_name || "Unknown"}`);
              printLine(` ALBUM    : ${track.album_title || "Unknown"}`);
              printLine(` STATE    : ${Spicetify.Player.isPlaying() ? "PLAYING ▶" : "PAUSED ❚❚"}`);
              printLine(` VOLUME   : ${Math.round(Spicetify.Player.getVolume() * 100)}%`);
              printLine(` DECK     : ${currentDeckMode.toUpperCase()}`);
              printLine(` DYNAMIC  : ${dynamicColorEnabled ? "ACTIVE" : "INACTIVE"}`);
              printLine(` WALLPAPER: ${currentWallpaper.toUpperCase()}`);
              printLine(` THEME    : ${currentSchemeKey}`);
              printLine(` CRT      : ${crtEnabled ? "ACTIVE" : "INACTIVE"}`);
            }
            break;

          case "clear":
          case "cls":
            termOutput.innerHTML = "";
            break;

          case "exit":
          case "quit":
            terminal.classList.remove("open");
            break;

          case "":
            break;

          default:
            printLine(` [ERROR] Command '${cmd}' not recognized. Type 'help' for available commands.`, "error");
            break;
        }
      }

      termInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const val = termInput.value;
          if (val.trim()) {
            executeCommand(val);
            termInput.value = "";
          }
        }
      });
    }

    terminal.classList.add("open");
    setTimeout(() => {
      const input = terminal.querySelector("#fute-terminal-input");
      if (input) input.focus();
    }, 100);
  }

  // --- 10. HARDWARE PRESET SWITCHER MODAL ---
  function showSchemeSwitcherModal() {
    let modal = document.getElementById("retrobyte-scheme-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "retrobyte-scheme-modal";
      modal.className = "retrobyte-modal-backdrop";
      
      let itemsHtml = `
        <div class="retrobyte-modal-window">
          <div class="retrobyte-modal-header">
            <span class="retro-title">▶ HARDWARE PRESET SELECTOR ◀</span>
            <button class="retro-close-btn" id="retrobyte-modal-close">[X]</button>
          </div>
          <div class="retrobyte-modal-body">
            <div class="retrobyte-osd-list">
      `;

      for (const [key, val] of Object.entries(SCHEMES)) {
        const isActive = key === currentSchemeKey ? "active" : "";
        itemsHtml += `
          <div class="retrobyte-osd-item ${isActive}" data-scheme-key="${key}">
            <div class="osd-slot-badge">[${val.slot}]</div>
            <div class="osd-text-box">
              <div class="osd-title-row">
                <span class="osd-title">${val.name}</span>
                <span class="osd-badge">${val.badge}</span>
              </div>
              <span class="osd-desc">${val.desc}</span>
            </div>
          </div>
        `;
      }

      itemsHtml += `
            </div>
          </div>
          <div class="retrobyte-modal-footer">
            <div class="modal-toggles">
              <button class="retrobyte-toggle-btn" id="retrobyte-deck-btn">
                <span>DECK: </span>
                <strong id="retrobyte-deck-status">${currentDeckMode.toUpperCase()}</strong>
              </button>
              <button class="retrobyte-toggle-btn" id="retrobyte-dynamic-btn">
                <span>DYNAMIC COLOR: </span>
                <strong id="retrobyte-dynamic-status">${dynamicColorEnabled ? "ON" : "OFF"}</strong>
              </button>
              <button class="retrobyte-toggle-btn" id="retrobyte-wallpaper-btn">
                <span>WALLPAPER: </span>
                <strong id="retrobyte-wallpaper-status">${currentWallpaper.toUpperCase()}</strong>
              </button>
              <button class="retrobyte-toggle-btn" id="retrobyte-crt-btn">
                <span>CRT SCANLINE: </span>
                <strong id="retrobyte-crt-status">${crtEnabled ? "ON" : "OFF"}</strong>
              </button>
              <button class="retrobyte-toggle-btn" id="retrobyte-sfx-btn">
                <span>8-BIT SFX: </span>
                <strong id="retrobyte-sfx-status">${sfxEnabled ? "ON" : "OFF"}</strong>
              </button>
              <button class="retrobyte-toggle-btn" id="retrobyte-open-arcade-btn">
                <span>👾 ARCADE (Ctrl+Shift+S)</span>
              </button>
              <button class="retrobyte-toggle-btn term-open-btn" id="retrobyte-open-term-btn">
                <span>⌨ TERMINAL (Ctrl+Shift+T)</span>
              </button>
            </div>
          </div>
        </div>
      `;

      modal.innerHTML = itemsHtml;
      document.body.appendChild(modal);

      modal.querySelector("#retrobyte-modal-close").addEventListener("click", () => {
        modal.classList.remove("open");
      });

      modal.querySelector("#retrobyte-deck-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        cycleDeckMode();
        playTactileClick();
      });

      modal.querySelector("#retrobyte-dynamic-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        setDynamicColor(!dynamicColorEnabled);
        playTactileClick();
      });

      modal.querySelector("#retrobyte-wallpaper-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        cycleWallpaper();
        playTactileClick();
      });

      modal.querySelector("#retrobyte-crt-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        setCRT(!crtEnabled);
        if (sfxEnabled) playTactileClick();
      });

      modal.querySelector("#retrobyte-sfx-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        sfxEnabled = !sfxEnabled;
        localStorage.setItem("fute-retrobyte-sfx", sfxEnabled);
        document.getElementById("retrobyte-sfx-status").textContent = sfxEnabled ? "ON" : "OFF";
        if (sfxEnabled) playTactileClick();
      });

      modal.querySelector("#retrobyte-open-arcade-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        modal.classList.remove("open");
        RetroArcade.open();
      });

      modal.querySelector("#retrobyte-open-term-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        modal.classList.remove("open");
        showCyberTerminal();
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
        }
        const item = e.target.closest(".retrobyte-osd-item");
        if (item) {
          const key = item.getAttribute("data-scheme-key");
          setDynamicColor(false);
          applyScheme(key);
          if (sfxEnabled) playTactileClick();
          setTimeout(() => {
            modal.classList.remove("open");
          }, 100);
        }
      });
    }

    modal.classList.add("open");
  }

  // --- 11. SPICETIFY TOPBAR & CONTEXT MENU INTEGRATION ---
  function registerSpicetifyIntegrations() {
    if (!window.Spicetify) return;

    if (Spicetify.Topbar && Spicetify.Topbar.Button) {
      try {
        new Spicetify.Topbar.Button(
          "FuTe Presets",
          `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/></svg>`,
          () => {
            playTactileClick();
            showSchemeSwitcherModal();
          }
        );

        new Spicetify.Topbar.Button(
          "Cyber Terminal",
          `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3.5-3.5L8 8l1.4-1.4 4.9 4.9-4.9 4.9L8 15zm7 0h5v2h-5v-2z"/></svg>`,
          () => {
            playTactileClick();
            showCyberTerminal();
          }
        );

        new Spicetify.Topbar.Button(
          "Retro Arcade",
          `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
          () => {
            playTactileClick();
            RetroArcade.open();
          }
        );
      } catch (e) {}
    }

    if (Spicetify.Menu && Spicetify.Menu.Item) {
      try {
        new Spicetify.Menu.Item("/// FuTe Retrobyte Presets ///", false, () => {
          playTactileClick();
          showSchemeSwitcherModal();
        }).register();

        new Spicetify.Menu.Item("/// Cyber Command Terminal ///", false, () => {
          playTactileClick();
          showCyberTerminal();
        }).register();

        new Spicetify.Menu.Item("/// Retro Arcade Game ///", false, () => {
          playTactileClick();
          RetroArcade.open();
        }).register();
      } catch (e) {}
    }
  }

  // --- 12. INITIALIZATION & OBSERVERS ---
  function init() {
    injectFonts();
    applyScheme(currentSchemeKey);
    setCRT(crtEnabled);
    setWallpaper(currentWallpaper, customWallpaperUrl);

    if (dynamicColorEnabled) {
      setTimeout(extractAndApplyCoverColor, 1000);
    }

    // Watcher for Right Sidebar Deck & VU Meter
    setInterval(() => {
      updateRightSidebarDeck();
    }, 1000);

    const checkSpicetify = setInterval(() => {
      if (window.Spicetify && Spicetify.Player) {
        Spicetify.Player.addEventListener("songchange", () => {
          if (dynamicColorEnabled) extractAndApplyCoverColor();
        });
        if (Spicetify.Topbar || Spicetify.Menu) {
          registerSpicetifyIntegrations();
        }
        clearInterval(checkSpicetify);
      }
    }, 500);

    // Global keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      // Ctrl+Shift+P: Hardware Presets
      if (e.ctrlKey && e.shiftKey && (e.key === "P" || e.key === "p")) {
        e.preventDefault();
        playTactileClick();
        showSchemeSwitcherModal();
      }
      // Ctrl+Shift+T or ~: Cyber Terminal
      if ((e.ctrlKey && e.shiftKey && (e.key === "T" || e.key === "t")) || (e.key === "~" && !e.target.matches("input, textarea"))) {
        e.preventDefault();
        playTactileClick();
        showCyberTerminal();
      }
      // Ctrl+Shift+S: Retro Arcade Mini Game
      if (e.ctrlKey && e.shiftKey && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
        playTactileClick();
        RetroArcade.open();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
