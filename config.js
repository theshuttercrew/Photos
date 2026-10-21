// ============================================================
//  YOUR STUDIO SETTINGS — this is the only file you need to edit
//  to make the app look and feel like YOUR brand.
// ============================================================
window.STUDIO = {
  name: "The Shutter Crew",              // shown at the top of the page
  tagline: "Creating Memories For Life Time", // small line under the name
  welcome: "Upload a selfie and we'll find every photo you're in.",
  logoUrl: "logo.png",                            // optional: link to your logo image (e.g. "logo.png")

  // Colours (any CSS colour). Change these to match your logo.
  accent: "#ffdf58",
  accentText: "#111111",                  // text colour on yellow buttons (dark so it's readable)
  background: "#ffffff",
  text: "#111111",

  // Contact buttons shown after photos are found (leave "" to hide)
  whatsapp: "919182109919",                           // e.g. "919876543210" (country code + number, no + or spaces)
  instagram: "theshuttercrewphotography",                          // e.g. "yourstudio"

  // How strict the face match is. Lower = stricter (fewer wrong photos,
  // might miss some). 0.45 strict, 0.5 balanced (default), 0.55 lenient.
  matchThreshold: 0.5,

  // Name of the index file you upload next to these pages
  indexFile: "index.json",

  // Show a small "Download all" hint and per-photo download buttons
  allowDownload: true
};
