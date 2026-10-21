// Shared helpers used by both the client page and the admin page.
(function () {
  const FACEAPI_VERSION = "1.7.15";
  const BASE = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@" + FACEAPI_VERSION;
  const FALLBACK = "https://unpkg.com/@vladmandic/face-api@" + FACEAPI_VERSION;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Could not load " + src));
      document.head.appendChild(s);
    });
  }

  let modelsPromise = null;
  // Loads the face library + models once. onStatus(text) gets progress messages.
  window.loadFaceModels = function (onStatus) {
    if (modelsPromise) return modelsPromise;
    modelsPromise = (async () => {
      let root = BASE;
      onStatus && onStatus("Loading face recognition…");
      try {
        await loadScript(BASE + "/dist/face-api.js");
      } catch (e) {
        root = FALLBACK;
        await loadScript(FALLBACK + "/dist/face-api.js");
      }
      const url = root + "/model";
      await faceapi.nets.ssdMobilenetv1.loadFromUri(url);
      await faceapi.nets.faceLandmark68Net.loadFromUri(url);
      await faceapi.nets.faceRecognitionNet.loadFromUri(url);
      onStatus && onStatus("Ready");
    })();
    modelsPromise.catch(() => { modelsPromise = null; });
    return modelsPromise;
  };

  // Detect every face in an <img>/<canvas> and return 128-number descriptors.
  window.getDescriptors = async function (el) {
    const opts = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });
    const res = await faceapi.detectAllFaces(el, opts).withFaceLandmarks().withFaceDescriptors();
    return res.map(r => ({
      descriptor: Array.from(r.descriptor),
      box: r.detection.box,
      score: r.detection.score
    }));
  };

  window.euclid = function (a, b) {
    let s = 0;
    for (let i = 0; i < a.length; i++) { const d = a[i] - b[i]; s += d * d; }
    return Math.sqrt(s);
  };

  // Read a File (from <input>) into an <img> that has fully loaded.
  // Large phone photos are shrunk first so detection is fast.
  window.fileToImage = function (file, maxSide) {
    maxSide = maxSide || 1024;
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
        const c = document.createElement("canvas");
        c.width = Math.round(img.naturalWidth * scale);
        c.height = Math.round(img.naturalHeight * scale);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Could not read that image")); };
      img.src = url;
    });
  };

  // Pull a Drive folder ID out of a share link (or accept a bare ID).
  window.parseFolderId = function (text) {
    text = (text || "").trim();
    const m = text.match(/\/folders\/([a-zA-Z0-9_-]+)/) || text.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m) return m[1];
    return /^[a-zA-Z0-9_-]{15,}$/.test(text) ? text : null;
  };

  window.driveThumb = (id, size) => "https://drive.google.com/thumbnail?id=" + id + "&sz=w" + (size || 800);
  window.driveDownload = id => "https://drive.google.com/uc?export=download&id=" + id;
  window.driveView = id => "https://drive.google.com/file/d/" + id + "/view";

  // Apply the studio branding from config.js
  window.applyBranding = function () {
    const S = window.STUDIO || {};
    const r = document.documentElement.style;
    if (S.accent) r.setProperty("--accent", S.accent);
    if (S.accentText) r.setProperty("--on-accent", S.accentText);
    if (S.background) r.setProperty("--bg", S.background);
    if (S.text) r.setProperty("--text", S.text);
    document.querySelectorAll("[data-studio]").forEach(el => {
      const v = S[el.dataset.studio];
      if (v) el.textContent = v;
    });
    document.title = (S.name || "Photos") + " — Find your photos";
    const logo = document.getElementById("logo");
    if (logo) { if (S.logoUrl) { logo.src = S.logoUrl; logo.hidden = false; document.body.classList.add("has-logo"); } else logo.hidden = true; }
  };
})();
