const STATUS_BAR_H = 24;
const LAUNCHER_H = 36;
const DESKTOP_CHROME_BOTTOM = STATUS_BAR_H + LAUNCHER_H;

const MIN_W = 220;
const MIN_H = 160;

/**
 * @typedef {{ src: string; alt?: string; fit?: 'contain' | 'cover' | 'wide' }} ProjectImage
 * @typedef {{ heading?: string; body?: string; bullets?: string[] }} ProjectPanelBlock
 * @typedef {{
 *   heading: string;
 *   body?: string;
 *   bullets?: string[];
 *   image?: ProjectImage;
 *   variant?: 'divider' | 'panel';
 *   blocks?: ProjectPanelBlock[];
 *   panelHeadingStyle?: 'band';
 *   treeBlocks?: boolean;
 * }} ProjectSection
 * @typedef {{ type: 'image' | 'video' | 'embed'; src: string; alt?: string; caption?: string; youtubeShowControls?: boolean; youtubeAutoplay?: boolean; youtubeLoop?: boolean }} ProjectGalleryItem
 * @typedef {{ title: string; sections: ProjectSection[]; imageSrc?: string; imageAlt?: string; images?: ProjectImage[]; gallery?: ProjectGalleryItem[]; noMedia?: boolean }} ProjectDetail
 */

/** Projects rendered with the terminal layout (wide panel, ls bands, tree rows). */
const TERMINAL_PROJECTS = new Set(["more-work", "work-exp"]);

/** @type {Record<string, ProjectDetail>} */
const PROJECTS = {
  "chip-design": {
    title: "Chip_design.TXT — NOTEPAD.EXE",
    images: [
      { src: "images/IMG_9642.JPG", alt: "Chip design photo 1" },
      { src: "images/IMG_9643.JPG", alt: "Chip design photo 2" },
      { src: "images/firstRender.png", alt: "Chip design photo 3" },
    ],
    sections: [
      {
        heading: "",
        body: "On Cornell's all-undergrad analog team, we taped out a 4.44 MS/s 8-bit differential SAR ADC in TSMC 180nm. No one was going to hand us the design files, so we figured it out ourselves, working through Cadence Virtuoso and a lot of shared notes. One of the only undergraduate teams in the country doing this, and it worked.",
      },
      {
        heading: "",
        body: "From there we explored two side projects: a novel adiabatic Flash ADC that hit ~80 µW total power (~30× lower than our SAR) using charge-recovery logic, and an asynchronous SAR ADC that self-timed between bit decisions instead of waiting on a clock.",
      },
      {
        heading: "Links",
        bullets: [
          "<a href='https://github.com/cornell-c2s2'>GitHub</a>",
          "<a href='https://www.c2s2.dev'>Team site</a>",
        ],
      },
    ],
  },
  drone: {
    title: "Drone_development.TXT — NOTEPAD.EXE",
    images: [{ src: "images/DylanV2.jpg", alt: "Drone project", fit: "cover" }],
    sections: [
      {
        heading: "",
        body: "Designed a 4-layer mixed-signal PCB for a quadcopter flight controller (sensing, motor control, power delivery, the whole thing), then wrote the firmware to actually fly it. Spent an embarrassing amount of time on IMU noise characterization. It now flies stably in 6-DOF, which felt like magic the first time and still kind of does.",
      },
      {
        heading: "Links",
        bullets: [
          "<a href='https://github.com/cornellmotionstudio'>GitHub</a>",
        ],
      },
    ],
  },

  "brokaw-bandgap-ptat": {
    title: "TINY_TAPEOUT.TXT — NOTEPAD.EXE",
    images: [{ src: "images/chip.png", alt: "Bandgap design photo 1" }],
    sections: [
      {
        heading: "",
        body: "Built a bandgap voltage reference (a circuit that holds a stable ~1.2V output across temperature, process, and supply variation) on the SKY130 PDK for Tiny Tapeout. The Brokaw topology works by balancing two effects that cancel: a voltage that falls with temperature against a current that rises with it. Then, a summing amplifier mixes them together.",
      },
      {
        heading: "",
        body: "Getting that to work off a 1.8V supply with limited headroom ruled out the usual circuit tricks, so the feedback amplifier runs self-biased with a startup circuit to keep it from just... staying off. Designed, simulated, and laid out in a mix of Cadence, xschem, and Magic VLSI.",
      },
      {
        heading: "Links",
        bullets: [
          "<a href='https://github.com/rcyaon/brokaw-bandgap'>GitHub</a>",
          "<a href='https://rcyaon.github.io/brokaw-bandgap/'>GDS viewer</a>",
        ],
      },
    ],
  },

  "ieee-chipathon": {
    title: "IEEE_CHIPATHON.TXT — NOTEPAD.EXE",
    noMedia: true,
    sections: [
      {
        heading: "In Progress: 2-Channel Time-Interleaved ADC",
        body: "This project is a 2-channel time-interleaved ADC I'm building with my team (Aevulog) for the IEEE Chipathon, on GF180MCU. We run two 8-bit SAR ADCs side by side, each sampling at 25 MS/s, and stagger their timing to hit 50 MS/s combined.",
      },
      {
        heading: "",
        body: "Through the Chipathon I'm building on my analog design background by diving deeper into full-chip integration, specifically how digital calibration logic has to work with analog blocks in real time.",
      },
      {
        isHtml: true,
        heading: "Links",
        bullets: [
          "<a href='https://github.com/rcyaon/chipathon-2026-ti-adc'>GitHub</a>",
        ],
      },
    ],
  },

  favorites: {
    title: "FAVORITES.TXT — NOTEPAD.EXE",
    noMedia: true,
    sections: [
      {
        isHtml: true,
        body: `<p><i>(In no order)</i></p>
        <h3>Film</h3>

<p>Alice Rohrwacher, La Chimera</p>
<img src="https://live-production.wcms.abc-cdn.net.au/958e48b10996283cef81d6fc724c8628?impolicy=wcms_crop_resize&cropH=1841&cropW=2762&xPos=656&yPos=319&width=862&height=575" width="300" style="border: 1px solid #6f6f6f;" alt="">
<br>

<p>Ken Loach, Kes</p>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS53CcnHsUQzDJWp05O7_KhDtGPdBU5v9xFNQ4iN3SsUd-RJ65AsHXu_4l&s=10" width="300" style="border: 1px solid #6f6f6f;" alt=""> 
<br>

<p>Joseph Losey, Mr. Klein</p>
<img src="https://criterion-production.s3.amazonaws.com/carousel-files/9PKdE5EHSiVAZekr3z4As2CdNlV7Enu5SWDZgoPm.jpeg" width="300" style="border: 1px solid #6f6f6f;" alt="">
<br>

<p>Abbas Kiarostami, طعم گيلاس</p>
<img src="https://d1nslcd7m2225b.cloudfront.net/Pictures/1024x536/4/7/1/1231471_taste-of-cherry-still.jpg" width="300" style="border: 1px solid #6f6f6f;" alt="">
<br>

<p>Robert Bresson, Le Diable probablement</p>
<img src ="https://cinemapublic.ca/wp-content/uploads/2025/06/le_diable_probablement_10.jpeg" width="300" style="border: 1px solid #6f6f6f;" alt="">
<br>

<p>Matt Johnson, BlackBerry</p>
<img src="https://www.hollywoodreporter.com/wp-content/uploads/2023/01/202310362_1-H-2023.jpg?w=1296&h=730&crop=1" width="300" style="border: 1px solid #6f6f6f;" alt="">
<br>

<h3>Music</h3>

<p>caroline, caroline 2</p>
<img src="https://cdn.sonemic.net/i/600/w/443661b587a1cda3992eb689d25cc0c7/13248275/caroline-caroline-2-Cover-Art.jpg" width="200" height="200" style="border: 1px solid #6f6f6f;" alt=""> 
<br>

<p>what is your name?, beyond old names; everyone's song.</p>
<img src ="https://cdn.sonemic.net/i/600/s/cf12a7608b264c4a66ae3ca42d768c7e/12080760/what-is-your-name-beyond-old-names-everyones-song-Cover-Art.jpg" width="200" height="200" style="border: 1px solid #6f6f6f;" alt=""> 
<br>

<p>she's green, wisteria</p>
<img src="https://cdn.sonemic.net/i/600/w/1406882e68da33a72be76b2b2fdd96e1/13277208/shes-green-wisteria-Cover-Art.jpg" width="200" height="200" style="border: 1px solid #6f6f6f;" alt="">  
<br>

<p> Black Country, New Road, For the First Time</p>
<img src="https://cdn.sonemic.net/i/600/s/6bd10c3d453bd5516e1472dca97d7fee/8538705/black-country-new-road-for-the-first-time-Cover-Art.jpg" width="200" height="200" style="border: 1px solid #6f6f6f;" alt="">  
<br>

<p>Her New Knife, chrome is lullaby</p>
<img src="https://cdn.sonemic.net/i/600/s/83cc8c6c2efa8df79bb40be2172a3d66/12587676/her-new-knife-chrome-is-lullaby-Cover-Art.jpg" width="200" height="200" style="border: 1px solid #6f6f6f;" alt=""> 

<p>Cocteau Twins and Harold Budd, The Moon and the Melodies</p>
<img src="https://cdn.sonemic.net/i/600/s/11933c15df434e27c222809d2f782d76/14433302/harold-budd-elizabeth-fraser-robin-guthrie-and-simon-raymonde-the-moon-and-the-melodies-Cover-Art.jpg" width="200" height="200" style="border: 1px solid #6f6f6f;" alt="">  
<br>
`,
      },
    ],
  },

  "work-exp": {
    title: "TERMINAL.EXE",
    noMedia: true,
    sections: [
      {
        variant: "panel",
        panelHeadingStyle: "band",
        treeBlocks: true,
        heading: "‎ amazon",
        blocks: [
          {
            heading: "Software Engineering Intern (summer 2025)",
            bullets: [
              "Built OfferAnalytics, a service that watches cross-border offers for anomalies, on AWS with Lambda, Kotlin, and DynamoDB.",
              "Real-time pipelines from the data warehouse and DynamoDB into CloudWatch and S3 brought detection latency down from 8 days to under 24 hours.",
              "Reworking cross-region alert escalation took mean incident resolution from 7 days to 6 hours across distributed service teams.",
              "Made it plugin-based, so new metrics can be added without touching the core service.",
            ],
          },
        ],
      },
      {
        variant: "panel",
        panelHeadingStyle: "band",
        treeBlocks: true,
        heading: "‎ globalfoundries",
        blocks: [
          {
            heading: "Device Engineering Intern (summer 2026)",
            bullets: [
              "Spent the summer at GlobalFoundries Dresden building test silicon infrastructure for emerging memory: a pulse-write eNVM test IP on 22FDX, with one configurable path routing programmable write pulses or analog bias to any BL/WL/SL in the array.",
              "Scaled it from a single device to an addressable 1-kbit array with 1/2/4/8-line parallel programming, chasing voltage droop through drivers, pass switches, and routing until the write current actually arrived.",
              "Ran multi-temperature Id-Vd sweeps on 12LP access transistor candidates, trading write current against leakage to pick devices worth using as access transistors for MRAM and RRAM.",
              "Wrote the handoff doc. Platform is being taped out post-internship and extended to new memory technologies.",
            ],
          },
        ],
      },
    ],
  },

  "more-work": {
    title: "TERMINAL.EXE",
    sections: [
      {
        isHtml: true,
        variant: "panel",
        panelHeadingStyle: "band",
        treeBlocks: true,
        heading: "‎ programs/technical",
        blocks: [
          {
            heading: "Google Code Next",
            body: "Selected for Google's creative coding program: algorithmic composition and audio synthesis in JavaScript, taught by Google engineers.",
          },
          {
            heading: "MATLAB Ambassador",
            body: "Paid work delivering hands-on MATLAB and Simulink workshops while evaluating pre-release features.",
          },
          {
            heading: "MIT Introduction to Technology, Engineering, and Science (MITES)",
            body: "Built autonomous robots and wrote about biomimicry in train design. Now an ambassador for my favorite network, <a href='https://mites.mit.edu/discover-mites/apply-to-mites/prepare-your-application-mites-summer-and-mites-semester/'>apply to MITES</a>!",
          },
          {
            heading:
              "SureStart Virtual AI Learning Program with an Applied Deep Learning Focus",
            body: "Deep learning fundamentals: neural networks, CNNs, GANs, optimization, and model evaluation with Python and TensorFlow.",
          },
        ],
      },
      {
        variant: "panel",
        panelHeadingStyle: "band",
        treeBlocks: true,
        heading: "‎ programs/venture",
        blocks: [
          {
            heading: "Dorm Room Fund Blueprint Investor Track",
            body: "Selected as 1 of 15 nationwide for a fellowship on evaluating early-stage startups from an investor's lens.",
          },
          {
            heading: "Girls Into VC externship",
            body: "Externed with the CEO of upskill (\"the horizontal people-search layer for agents\") doing market research and helping out with client hiring work.",
          },
        ],
      },
      {
        isHtml: true,
        variant: "panel",
        panelHeadingStyle: "band",
        heading: "‎ MISCELLANEOUS",
        blocks: [{}],
      },
      {
        heading: "5-Stage Pipelined RISC-V Processor (TinyRV1)",
        body: "Architected a 5-stage pipelined RISC-V processor in Verilog, implementing full forwarding, hazard detection, and branch prediction (BTB). Validated in ModelSim and on a Cyclone V FPGA. Extended baseline with custom accumulate accelerator, achieving 4x cycle reduction (31 vs. 126 cycles).",
        image: {
          src: "images/rv1.png",
          alt: "Processor preview",
        },
      },
      {
        heading: "Organizing Hackathons",
        body: "Taught K-12 students hardware basics through workshops on PCB design, JavaScript drawing, and CNC machining. Hosted at FUTO Austin and Amazon Seattle through <a href='https://daysofservice.hackclub.com/'>Hack Club's Days of Service</a>. Also ran logistics for <a href=\"https://www.bigredhacks.com/\">BigRed//Hacks</a>, Cornell's largest hackathon.",
        image: {
          src: "images/blot.JPG",
        },
      },
      {
        isHtml: true,
        variant: "panel",
        panelHeadingStyle: "band",
        treeBlocks: true,
        heading: `‎ Awards`,
        blocks: [
          {
            heading: "Samsung Solve for Tomorrow National Winner",
            body: "Built Pathfinder, a public safety system that uses a mesh network of light and sound-sensing devices to guide crowds during emergencies. Won $100k, featured on CNET. Returned as an alumna to mentor teams building accessibility tech.",
          },
          {
            heading: "LyondellBasell Cybersecurity Challenge National Winner",
            body: "Awarded $1,000. Solved CTF-style problems with Burp Suite, Wireshark, Nmap, Metasploit, and SQLmap.",
          },
          {
            heading:
              "Most Nostalgic Hack at hack club's leadership Summit in sf",
          },
          {
            heading: "Societal Impact and Hardware Winner at YHack",
            bullets: [
              "Built Canary, a real-time mine hazard detector using a Raspberry Pi, gas sensors, and depth cameras. Placed 3rd in Societal Impact and 4th in Hardware out of 700+ participants. <a href=\"https://devpost.com/software/canary-axf7o2\">Learn more on Devpost</a>.",
            ],
          },
          {
            heading: "$500 GripTape Grant",
            bullets: [
              "ML race-strategy project using synthetic sensor data and 3D-printed model cars.",
            ],
          },
        ],
      },
    ],
  },
};

const windows = () =>
  Array.from(document.querySelectorAll(".desktop > .window"));

let maxZIndex = 100;

function workAreaSize() {
  return {
    w: window.innerWidth,
    h: Math.max(MIN_H, window.innerHeight - DESKTOP_CHROME_BOTTOM),
  };
}

function bringToFront(clickedWindow) {
  const visible = windows().filter(
    (w) =>
      !w.classList.contains("is-closed") &&
      !w.classList.contains("is-minimized"),
  );
  let highestZ = maxZIndex;
  visible.forEach((w) => {
    const z = parseInt(
      w.style.zIndex || getComputedStyle(w).zIndex || "10",
      10,
    );
    if (z > highestZ) highestZ = z;
  });
  clickedWindow.style.zIndex = String(highestZ + 1);
  maxZIndex = highestZ + 1;
  visible.forEach((w) => {
    if (w !== clickedWindow) {
      const baseZ = parseInt(getComputedStyle(w).zIndex || "10", 10);
      const currentZ = parseInt(w.style.zIndex || String(baseZ), 10);
      if (currentZ > baseZ) w.style.zIndex = String(baseZ);
    }
  });
}

function parsePx(val, fallback) {
  const n = parseFloat(val);
  return Number.isFinite(n) ? n : fallback;
}

function getWindowBox(win) {
  const rect = win.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

function getLayoutMobileMaxPx() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--layout-mobile-max")
    .trim();
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : 768;
}

function layoutMobileMediaQuery() {
  return window.matchMedia(`(max-width: ${getLayoutMobileMaxPx()}px)`);
}

function useCssFluidWidth() {
  return layoutMobileMediaQuery().matches;
}

function useSingleWindowMobileMode() {
  return layoutMobileMediaQuery().matches;
}

function exitDesktopWindowLayout() {
  windows().forEach((win) => {
    if (
      win.classList.contains("is-closed") ||
      win.classList.contains("is-minimized")
    ) {
      return;
    }
    if (win.classList.contains("is-maximized")) {
      win.classList.remove("is-maximized");
      restoreBounds(win);
    }
    if (!win.style.width) {
      applyDefaultDimensions(win);
    }
    clampWindowToViewport(win);
  });
}

/** Toggle mobile tab layout vs free-floating resizable windows. */
function syncDesktopLayoutMode(preferredWindow = null) {
  const desktop = document.getElementById("desktop");
  const mobile = useSingleWindowMobileMode();
  if (desktop) {
    desktop.classList.toggle("desktop--mobile", mobile);
  }
  if (mobile) {
    enforceSingleOpenWindowOnMobile(preferredWindow);
  } else {
    exitDesktopWindowLayout();
  }
}

function enforceSingleOpenWindowOnMobile(preferredWindow = null) {
  if (!useSingleWindowMobileMode()) return;

  const visible = windows().filter(
    (w) =>
      !w.classList.contains("is-closed") &&
      !w.classList.contains("is-minimized"),
  );
  if (visible.length <= 1 && !preferredWindow) return;

  const target =
    (preferredWindow &&
    !preferredWindow.classList.contains("is-closed") &&
    !preferredWindow.classList.contains("is-minimized")
      ? preferredWindow
      : visible[visible.length - 1]) || null;
  if (!target) return;

  windows().forEach((win) => {
    if (win === target) return;
    if (
      !win.classList.contains("is-closed") &&
      !win.classList.contains("is-minimized")
    ) {
      win.classList.remove("is-maximized");
      win.classList.add("is-minimized");
    }
  });

  target.classList.add("is-maximized");
  target.style.top = "0px";
  target.style.left = "0px";
  target.style.right = "auto";
  target.style.bottom = "auto";
}

function clampWindowToViewport(win) {
  if (
    win.classList.contains("is-closed") ||
    win.classList.contains("is-minimized")
  )
    return;
  if (win.classList.contains("is-maximized")) return;

  const { w: vw, h: vh } = workAreaSize();
  const rect = win.getBoundingClientRect();
  let left = parsePx(win.style.left, rect.left);
  let top = parsePx(win.style.top, rect.top);
  let width = parsePx(win.style.width, rect.width) || MIN_W;
  let height = parsePx(win.style.height, rect.height) || MIN_H;

  const fluid = useCssFluidWidth();
  if (!fluid) {
    width = Math.min(Math.max(width, MIN_W), vw);
  }
  height = Math.min(Math.max(height, MIN_H), vh);
  const effW = fluid ? rect.width : width;
  const effH = fluid ? rect.height : height;
  left = Math.max(0, Math.min(left, vw - Math.min(effW, vw)));
  top = Math.max(0, Math.min(top, vh - Math.min(effH, vh)));

  win.style.left = `${left}px`;
  win.style.top = `${top}px`;
  if (!fluid) {
    win.style.right = "auto";
    win.style.bottom = "auto";
    win.style.width = `${width}px`;
    win.style.height = `${height}px`;
  } else {
    win.style.width = "";
    win.style.height = "";
  }
}

function saveBounds(win) {
  const b = getWindowBox(win);
  win.dataset.boundsLeft = String(Math.round(b.left));
  win.dataset.boundsTop = String(Math.round(b.top));
  win.dataset.boundsWidth = String(Math.round(b.width));
  win.dataset.boundsHeight = String(Math.round(b.height));
}

function restoreBounds(win) {
  const l = win.dataset.boundsLeft;
  const t = win.dataset.boundsTop;
  const wi = win.dataset.boundsWidth;
  const h = win.dataset.boundsHeight;
  if (l) win.style.left = `${l}px`;
  if (t) win.style.top = `${t}px`;
  if (wi) win.style.width = `${wi}px`;
  if (h) win.style.height = `${h}px`;
}

function closeWindow(win) {
  win.classList.remove("is-minimized");
  win.classList.remove("is-maximized");
  win.classList.add("is-closed");
  updateLauncherState();
}

function minimizeWindow(win) {
  if (useSingleWindowMobileMode()) {
    // Mobile keeps one tab active at all times.
    restoreWindow(win);
    return;
  }
  win.classList.remove("is-closed");
  win.classList.remove("is-maximized");
  win.classList.add("is-minimized");
  updateLauncherState();
}

function restoreWindow(win) {
  win.classList.remove("is-closed", "is-minimized");
  syncDesktopLayoutMode(win);
  if (win.classList.contains("is-maximized")) {
    /* keep maximized */
  } else {
    clampWindowToViewport(win);
  }
  bringToFront(win);
  updateLauncherState();
}

function toggleMaximize(win) {
  if (useSingleWindowMobileMode()) {
    win.classList.add("is-maximized");
    updateLauncherState();
    return;
  }
  if (win.classList.contains("is-maximized")) {
    win.classList.remove("is-maximized");
    restoreBounds(win);
    clampWindowToViewport(win);
  } else {
    saveBounds(win);
    win.classList.add("is-maximized");
    win.style.right = "auto";
    win.style.bottom = "auto";
  }
  updateLauncherState();
}

function wireWindowControls(win) {
  const controls = win.querySelectorAll(".window-control[data-action]");
  controls.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const action = btn.getAttribute("data-action");
      if (action === "close") closeWindow(win);
      else if (action === "minimize") minimizeWindow(win);
      else if (action === "maximize") toggleMaximize(win);
    });
  });
}

function wireResize(win) {
  const handles = win.querySelectorAll(".resize-handle[data-dir]");
  handles.forEach((handle) => {
    handle.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      if (win.classList.contains("is-maximized")) return;
      e.preventDefault();
      e.stopPropagation();
      bringToFront(win);

      const dir = handle.getAttribute("data-dir") || "";
      const startX = e.clientX;
      const startY = e.clientY;
      const box = getWindowBox(win);
      const startLeft = box.left;
      const startTop = box.top;
      const startW = box.width;
      const startH = box.height;
      const { w: vw, h: vh } = workAreaSize();

      function onMove(ev) {
        let left = startLeft;
        let top = startTop;
        let width = startW;
        let height = startH;
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;

        if (dir.includes("e")) width = startW + dx;
        if (dir.includes("s")) height = startH + dy;
        if (dir.includes("w")) {
          width = startW - dx;
          left = startLeft + dx;
        }
        if (dir.includes("n")) {
          height = startH - dy;
          top = startTop + dy;
        }

        width = Math.max(MIN_W, width);
        height = Math.max(MIN_H, height);

        if (dir.includes("w")) {
          const maxLeft = startLeft + startW - MIN_W;
          left = Math.min(Math.max(0, left), maxLeft);
          width = Math.min(width, startLeft + startW - left);
        }
        if (dir.includes("n")) {
          const maxTop = startTop + startH - MIN_H;
          top = Math.min(Math.max(0, top), maxTop);
          height = Math.min(height, startTop + startH - top);
        }

        if (left + width > vw) width = vw - left;
        if (top + height > vh) height = vh - top;
        if (width < MIN_W) {
          width = MIN_W;
          if (dir.includes("w")) left = startLeft + startW - MIN_W;
        }
        if (height < MIN_H) {
          height = MIN_H;
          if (dir.includes("n")) top = startTop + startH - MIN_H;
        }

        win.style.left = `${Math.round(left)}px`;
        win.style.top = `${Math.round(top)}px`;
        win.style.width = `${Math.round(width)}px`;
        win.style.height = `${Math.round(height)}px`;
        win.style.right = "auto";
        win.style.bottom = "auto";
      }

      function onUp() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      }

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });
  });
}

function wireDrag(win) {
  const titleBar = win.querySelector(".title-bar");
  if (!titleBar) return;

  let isDragging = false;
  let initialX = 0;
  let initialY = 0;

  const windowControls = win.querySelector(".window-controls");
  if (windowControls) {
    windowControls.addEventListener("mousedown", (e) => e.stopPropagation());
  }

  titleBar.addEventListener("mousedown", dragStart);

  function dragStart(e) {
    if (e.target.closest(".window-controls")) return;
    if (e.button !== 0) return;
    if (useSingleWindowMobileMode()) return;
    bringToFront(win);
    setActiveLauncher(win);
    if (win.classList.contains("is-maximized")) return;

    const rect = win.getBoundingClientRect();
    if (!useCssFluidWidth()) {
      win.style.right = "auto";
      win.style.bottom = "auto";
      win.style.width = `${rect.width}px`;
      win.style.height = `${rect.height}px`;
    }
    win.style.left = `${rect.left}px`;
    win.style.top = `${rect.top}px`;

    initialX = e.clientX - rect.left;
    initialY = e.clientY - rect.top;
    isDragging = true;
    win.classList.add("active");
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);
    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    const { w: vw, h: vh } = workAreaSize();
    const winRect = win.getBoundingClientRect();
    let currentX = e.clientX - initialX;
    let currentY = e.clientY - initialY;
    const winWidth = winRect.width;
    const winHeight = winRect.height;
    const maxX = vw - winWidth;
    const maxY = vh - winHeight;
    currentX = Math.max(0, Math.min(currentX, maxX));
    currentY = Math.max(0, Math.min(currentY, maxY));
    win.style.left = `${currentX}px`;
    win.style.top = `${currentY}px`;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", dragEnd);
  }
}

function updateLauncherState() {
  const buttons = document.querySelectorAll(".launcher-btn[data-launch]");
  buttons.forEach((btn) => {
    const id = btn.getAttribute("data-launch");
    const win = document.getElementById(id);
    if (!win) return;
    const hidden =
      win.classList.contains("is-closed") ||
      win.classList.contains("is-minimized");
    btn.classList.toggle("is-window-hidden", hidden);
    btn.setAttribute("aria-expanded", String(!hidden));
    if (hidden) btn.classList.remove("is-window-active");
  });
}

function setActiveLauncher(win) {
  document
    .querySelectorAll(".launcher-btn")
    .forEach((b) => b.classList.remove("is-window-active"));
  const btn = document.querySelector(`.launcher-btn[data-launch="${win.id}"]`);
  if (btn) btn.classList.add("is-window-active");
}

function wireLauncher() {
  document.querySelectorAll(".launcher-btn[data-launch]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-launch");
      const win = document.getElementById(id);
      if (!win) return;
      restoreWindow(win);
      setActiveLauncher(win);
      requestAnimationFrame(layoutProjectIconCluster);
    });
  });
}

function wireWindowFocus() {
  windows().forEach((win) => {
    win.addEventListener("mousedown", (e) => {
      if (e.target.closest(".title-bar")) return;
      if (
        win.classList.contains("is-closed") ||
        win.classList.contains("is-minimized")
      )
        return;
      syncDesktopLayoutMode(win);
      bringToFront(win);
      setActiveLauncher(win);
    });
  });
}

function applyDefaultDimensions(win) {
  const dw = win.getAttribute("data-default-width");
  const dh = win.getAttribute("data-default-height");
  if (!win.style.width && dw) win.style.width = `${dw}px`;
  if (!win.style.height && dh) win.style.height = `${dh}px`;
}

function openProjectModal(projectId) {
  const data = PROJECTS[projectId];
  const modal = document.getElementById("projectModal");
  const titleEl = document.getElementById("projectModalTitle");
  const bodyEl = document.getElementById("projectModalBody");
  const panel = modal?.querySelector(".project-modal__panel");
  if (!data || !modal || !titleEl || !bodyEl) return;

  // Clean up any previous gallery state before replacing content.
  destroyGalleryYtPlayer(modal);
  if (modal._galleryKeydown) {
    document.removeEventListener("keydown", modal._galleryKeydown);
    delete modal._galleryKeydown;
  }

  if (panel) {
    if (data.gallery && data.gallery.length > 0)
      panel.classList.add("project-modal__panel--gallery");
    else panel.classList.remove("project-modal__panel--gallery");
    panel.classList.toggle(
      "project-modal__panel--more-work",
      TERMINAL_PROJECTS.has(projectId),
    );
  }

  titleEl.textContent = data.title;

  const useSectionImages =
    data.noMedia !== true &&
    !(data.gallery && data.gallery.length > 0) &&
    data.sections.some((s) => s.image);

  if (useSectionImages) {
    const splitSideImages = TERMINAL_PROJECTS.has(projectId);
    bodyEl.innerHTML = data.sections
      .map((s) => {
        if (splitSideImages && s.image) {
          return renderSectionWithSideImage(s);
        }
        return (
          renderProjectSection(s) +
          (s.image ? renderSectionImageBlock(s.image) : "")
        );
      })
      .join("");
  } else {
    const sectionsHtml = data.sections.map(renderProjectSection).join("");
    const mediaHtml =
      data.noMedia === true
        ? ""
        : data.gallery && data.gallery.length > 0
          ? renderProjectGalleryBlock()
          : renderProjectImageBlock(data);
    const afterMediaHtml = data.afterMedia ? data.afterMedia : "";
    bodyEl.innerHTML = sectionsHtml + mediaHtml + afterMediaHtml;
  }

  bodyEl.classList.toggle(
    "project-modal__body--more-work",
    TERMINAL_PROJECTS.has(projectId),
  );

  if (data.gallery && data.gallery.length > 0) {
    const galleryRoot = bodyEl.querySelector(".project-modal__gallery");
    if (galleryRoot) wireProjectGallery(modal, galleryRoot, data.gallery);
  }

  bodyEl.scrollTop = 0;
  // Return focus to whatever opened the modal once it closes.
  modal._returnFocusTo =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  setBackgroundInert(true);

  const closeBtn = modal.querySelector(".project-modal__close");
  closeBtn?.focus();
}

/** Hide the desktop behind the modal from keyboard and screen-reader users. */
function setBackgroundInert(inert) {
  const targets = [...windows(), document.getElementById("windowLauncher")];
  targets.forEach((el) => {
    if (!el) return;
    if (inert) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  });
}

function renderProjectPanelBlock(b) {
  let html = "";
  if (b.heading && String(b.heading).trim()) {
    html += `<h3>${escapeHtml(b.heading)}</h3>`;
  }
  if (b.body && String(b.body).trim()) {
    html += b.body
      .split(/\n+/)
      .filter((p) => p.trim())
      .map((p) => `<p>${linkifyText(p)}</p>`)
      .join("");
  }
  if (b.bullets && b.bullets.length > 0) {
    html +=
      '<ul class="project-modal__bullet-list">' +
      b.bullets.map((item) => `<li>${linkifyText(item)}</li>`).join("") +
      "</ul>";
  }
  if (!html.trim()) return "";
  return `<div class="project-modal__experience-block">${html}</div>`;
}

const TREE_TEE = "\u251c\u2500\u2500 "; // "\u251c\u2500\u2500 ", an entry with siblings after it
const TREE_ELBOW = "\u2514\u2500\u2500 "; // "\u2514\u2500\u2500 ", the last entry at its level

/**
 * Branch glyph for one entry. Non-last entries also carry their bar down
 * through wrapped text (see the ::before rule in styles.css).
 */
function renderTreeBranch(isLast) {
  const cls = isLast
    ? "project-modal__tree-branch project-modal__tree-branch--end"
    : "project-modal__tree-branch";
  return `<span class="${cls}">${isLast ? TREE_ELBOW : TREE_TEE}</span>`;
}

/** Blocks as `tree` output: heading is a directory, its lines are children. */
function renderProjectPanelTreeBlocks(blocks) {
  const filtered = blocks.filter((b) => b.heading && String(b.heading).trim());
  if (filtered.length === 0) return "";
  return filtered
    .map((b, i) => {
      const blockIsLast = i === filtered.length - 1;
      const lines = [];
      if (b.body && String(b.body).trim()) lines.push(String(b.body).trim());
      if (b.bullets && b.bullets.length > 0) {
        b.bullets.forEach((item) => {
          if (item && String(item).trim()) lines.push(String(item).trim());
        });
      }
      let html =
        `<div class="project-modal__tree-row">` +
        renderTreeBranch(blockIsLast) +
        `<span class="project-modal__tree-ht">${escapeHtml(b.heading)}</span>` +
        `</div>`;
      // Children indent one level: the parent's column keeps its bar only
      // while more entries follow it, exactly like real `tree` output.
      const gutterClass = blockIsLast
        ? "project-modal__tree-gutter"
        : "project-modal__tree-gutter project-modal__tree-gutter--bar";
      lines.forEach((line, lineIndex) => {
        html +=
          `<div class="project-modal__tree-row">` +
          `<span class="${gutterClass}"></span>` +
          renderTreeBranch(lineIndex === lines.length - 1) +
          `<p>${linkifyText(line)}</p>` +
          `</div>`;
      });
      return html;
    })
    .join("");
}

function renderProjectPanel(s) {
  const label = s.heading && String(s.heading).trim() ? s.heading : "";
  if (!label || !s.blocks || s.blocks.length === 0) return "";
  const headingClass =
    s.panelHeadingStyle === "band"
      ? "project-modal__panel-heading project-modal__panel-heading--band"
      : "project-modal__panel-heading";
  const title = `<h3 class="${headingClass}">${escapeHtml(label)}</h3>`;
  const bodyInner = s.treeBlocks
    ? renderProjectPanelTreeBlocks(s.blocks)
    : s.blocks.map(renderProjectPanelBlock).join("");
  const titleOnly = bodyInner.trim().length === 0;
  const wrapClass = titleOnly
    ? "project-modal__experience-panel project-modal__experience-panel--title-only"
    : "project-modal__experience-panel";
  const bodyClass = s.treeBlocks
    ? "project-modal__experience-panel-body project-modal__experience-panel-body--tree"
    : "project-modal__experience-panel-body";
  return (
    `<div class="${wrapClass}">` +
    title +
    `<div class="${bodyClass}">${bodyInner}</div>` +
    `</div>`
  );
}

function renderProjectSection(s) {
  if (s.variant === "panel") {
    return renderProjectPanel(s);
  }
  if (s.variant === "divider") {
    const label = s.heading && String(s.heading).trim() ? s.heading : "";
    if (!label) return "";
    return (
      `<div class="project-modal__section-divider" role="presentation">` +
      `<span class="project-modal__section-divider-text">${escapeHtml(label)}</span>` +
      `</div>`
    );
  }

  let html = "";

  if (s.heading && String(s.heading).trim()) {
    html += `<h3>${escapeHtml(s.heading)}</h3>`;
  }
  if (s.body && String(s.body).trim()) {
    if (s.isHtml) {
      html += s.body;
    } else {
      html += s.body
        .split(/\n+/)
        .filter((p) => p.trim())
        .map((p) => `<p>${linkifyText(p)}</p>`)
        .join("");
    }
  }
  if (s.bullets && s.bullets.length > 0) {
    html +=
      '<ul class="project-modal__bullet-list">' +
      s.bullets.map((item) => `<li>${linkifyText(item)}</li>`).join("") +
      "</ul>";
  }

  return html;
}

/** Section copy (heading, body, bullets) beside image — More work layout only. */
function renderSectionWithSideImage(s) {
  const copyHtml = renderProjectSection(s);
  const mediaHtml = s.image ? renderSectionImageBlock(s.image) : "";
  return (
    `<div class="project-modal__section-split">` +
    `<div class="project-modal__section-split-copy">${copyHtml}</div>` +
    `<div class="project-modal__section-split-media">${mediaHtml}</div>` +
    `</div>`
  );
}

function linkifyText(str) {
  // Let hand-written <a> tags through (sanitized); escape + auto-link the rest.
  const anchorRegex = /<a\s[^>]*>[\s\S]*?<\/a>/gi;
  let lastIndex = 0;
  let result = "";
  let match;

  while ((match = anchorRegex.exec(str)) !== null) {
    result += linkifyPlainText(str.slice(lastIndex, match.index));
    result += sanitizeAnchor(match[0]);
    lastIndex = match.index + match[0].length;
  }

  result += linkifyPlainText(str.slice(lastIndex));
  return result;
}

function sanitizeAnchor(tag) {
  const hrefMatch = tag.match(/href\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
  const href = hrefMatch ? (hrefMatch[1] ?? hrefMatch[2] ?? "") : "";
  const text = tag.replace(/<\/?a\b[^>]*>/gi, "");
  if (!/^(https?:\/\/|mailto:|#|\/)/i.test(href)) return escapeHtml(text);
  const external = /^https?:\/\//i.test(href);
  return (
    `<a href="${escapeAttr(href)}"` +
    (external ? ` target="_blank" rel="noopener noreferrer"` : "") +
    `>${escapeHtml(text)}</a>`
  );
}

function linkifyPlainText(str) {
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  let lastIndex = 0;
  let result = "";
  let match;

  while ((match = urlRegex.exec(str)) !== null) {
    const url = match[0];
    const start = match.index;
    result += escapeHtml(str.slice(lastIndex, start));
    result += `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>`;
    lastIndex = start + url.length;
  }

  result += escapeHtml(str.slice(lastIndex));
  return result;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/** @param {HTMLElement} modal */
function destroyGalleryYtPlayer(modal) {
  if (!modal || !modal._galleryYtPlayer) return;
  try {
    modal._galleryYtPlayer.destroy();
  } catch (_) {}
  modal._galleryYtPlayer = null;
}

function renderProjectGalleryBlock() {
  return (
    `<div class="project-modal__media project-modal__media--gallery">` +
    `<div class="project-modal__gallery" role="region" aria-label="Media gallery">` +
    `<div class="project-modal__gallery-stage">` +
    `<button type="button" class="project-modal__gallery-nav project-modal__gallery-nav--prev" data-gallery-prev aria-label="Previous item"></button>` +
    `<div class="project-modal__gallery-center">` +
    `<div class="project-modal__gallery-frame" data-gallery-frame></div>` +
    `<p class="project-modal__gallery-counter" data-gallery-counter></p>` +
    `<p class="project-modal__gallery-caption" data-gallery-caption></p>` +
    `</div>` +
    `<button type="button" class="project-modal__gallery-nav project-modal__gallery-nav--next" data-gallery-next aria-label="Next item"></button>` +
    `</div>` +
    `</div></div>`
  );
}

/**
 * @param {HTMLElement} modal
 * @param {HTMLElement} root
 * @param {ProjectGalleryItem[]} items
 */
function wireProjectGallery(modal, root, items) {
  const frame = root.querySelector("[data-gallery-frame]");
  const prev = root.querySelector("[data-gallery-prev]");
  const next = root.querySelector("[data-gallery-next]");
  const counter = root.querySelector("[data-gallery-counter]");
  const captionEl = root.querySelector("[data-gallery-caption]");
  if (!frame || !prev || !next || !counter || !captionEl || items.length === 0)
    return;

  if (modal._galleryKeydown) {
    document.removeEventListener("keydown", modal._galleryKeydown);
    delete modal._galleryKeydown;
  }

  let index = 0;

  function updateNavState() {
    const n = items.length;
    prev.disabled = index <= 0;
    next.disabled = index >= n - 1;
  }

  function renderSlide() {
    destroyGalleryYtPlayer(modal);
    const prevVideo = frame.querySelector("video");
    if (prevVideo) {
      prevVideo.pause();
    }

    frame.innerHTML = "";
    frame.classList.remove("project-modal__gallery-frame--yt");
    const item = items[index];
    if (item.type === "video") {
      const mat = document.createElement("div");
      mat.className = "project-modal__gallery-mat";
      const v = document.createElement("video");
      v.className = "project-modal__gallery-video";
      v.src = item.src;
      v.controls = true;
      v.playsInline = true;
      v.setAttribute("preload", "metadata");
      if (item.alt) v.setAttribute("aria-label", item.alt);
      mat.appendChild(v);
      frame.appendChild(mat);
    } else if (item.type === "embed") {
      const videoId = extractYouTubeVideoIdFromSrc(item.src);
      const useChromelessYt = videoId && item.youtubeShowControls !== true;

      if (useChromelessYt) {
        frame.classList.add("project-modal__gallery-frame--yt");
        const hostId = `galleryYtHost_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        const host = document.createElement("div");
        host.id = hostId;
        host.className = "project-modal__gallery-yt-host";
        frame.appendChild(host);

        const slideIndex = index;
        const mount = () => {
          if (slideIndex !== index) return;
          const w = Math.max(200, Math.floor(frame.clientWidth));
          const maxH = Math.min(520, Math.floor(window.innerHeight * 0.7));
          const h = Math.min(maxH, Math.max(160, Math.round((w * 9) / 16)));
          void loadYouTubeIframeAPI().then(() => {
            if (slideIndex !== index) return;
            const pv = {
              playsinline: 1,
              rel: 0,
              modestbranding: 1,
              controls: 0,
              fs: 0,
              iv_load_policy: 3,
              disablekb: 1,
              origin: window.location.origin,
            };
            if (item.youtubeAutoplay === true) {
              pv.autoplay = 1;
              pv.mute = 1;
            }
            if (item.youtubeLoop === true) {
              pv.loop = 1;
              pv.playlist = videoId;
            }
            modal._galleryYtPlayer = new window.YT.Player(hostId, {
              width: w,
              height: h,
              videoId,
              playerVars: pv,
            });
          });
        };
        requestAnimationFrame(() => requestAnimationFrame(mount));
      } else {
        const iframe = document.createElement("iframe");
        iframe.className = "project-modal__gallery-embed";
        iframe.src = applyYouTubeEmbedParams(item.src, item);
        iframe.loading = "lazy";
        iframe.title = item.alt || "YouTube video player";
        iframe.setAttribute(
          "referrerpolicy",
          "strict-origin-when-cross-origin",
        );
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",
        );
        frame.appendChild(iframe);
      }
    } else {
      const mat = document.createElement("div");
      mat.className = "project-modal__gallery-mat";
      const img = document.createElement("img");
      img.className = "project-modal__gallery-image";
      img.src = item.src;
      img.alt = item.alt || "";
      img.loading = index === 0 ? "eager" : "lazy";
      mat.appendChild(img);
      frame.appendChild(mat);
    }

    counter.textContent = `${index + 1} / ${items.length}`;
    captionEl.textContent = item.caption ? item.caption : "";
    updateNavState();
  }

  function step(delta) {
    const n = items.length;
    const nextIndex = index + delta;
    if (nextIndex < 0 || nextIndex >= n) return;
    index = nextIndex;
    renderSlide();
  }

  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));

  /** @param {KeyboardEvent} e */
  function onKeydown(e) {
    if (modal.hidden) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  }

  document.addEventListener("keydown", onKeydown);
  modal._galleryKeydown = onKeydown;

  renderSlide();
}

/**
 * @param {ProjectImage[]} images
 * @returns {string}
 */
function renderProjectFigureHtmlFromImages(images) {
  if (!images || images.length === 0) return "";
  return images
    .map((img, i) => {
      const alt = img.alt || `Project image ${i + 1}`;
      let fitClass = "";
      if (img.fit === "cover") fitClass = " project-modal__image--cover";
      else if (img.fit === "wide") fitClass = " project-modal__image--wide";
      return (
        `<figure class="project-modal__figure">` +
        `<img class="project-modal__image${fitClass}" src="${escapeAttr(img.src)}" alt="${escapeHtml(alt)}" loading="lazy">` +
        `</figure>`
      );
    })
    .join("");
}

/**
 * @param {ProjectImage} image
 * @returns {string}
 */
function renderSectionImageBlock(image) {
  const figures = renderProjectFigureHtmlFromImages([image]);
  if (!figures) return "";
  return `<div class="project-modal__media project-modal__media--section">${figures}</div>`;
}

function renderProjectImageBlock(data) {
  let figuresHtml = "";

  if (data.images && data.images.length > 0) {
    figuresHtml = renderProjectFigureHtmlFromImages(data.images);
  } else if (data.imageSrc) {
    figuresHtml = renderProjectFigureHtmlFromImages([
      { src: data.imageSrc, alt: data.imageAlt || "Project image" },
    ]);
  }

  const headingText =
    data.images && data.images.length > 1 ? "Project images" : "Project image";
  const heading = `<h3 class="project-modal__media-heading">${headingText}</h3>`;

  if (figuresHtml) {
    return `<div class="project-modal__media">${heading}${figuresHtml}</div>`;
  }

  return (
    `<div class="project-modal__media">` +
    `<h3 class="project-modal__media-heading">Project image</h3>` +
    `<div class="project-modal__image-placeholder" role="img" aria-label="No project image yet">` +
    `<span class="project-modal__image-placeholder-icon" aria-hidden="true">▣</span>` +
    `<span class="project-modal__image-placeholder-text">Image placeholder</span>` +
    `<span class="project-modal__image-placeholder-hint">Add an <code>images</code> array or <code>imageSrc</code> for this project in main.js</span>` +
    `</div></div>`
  );
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  destroyGalleryYtPlayer(modal);
  if (modal._galleryKeydown) {
    document.removeEventListener("keydown", modal._galleryKeydown);
    delete modal._galleryKeydown;
  }
  const modalPanel = modal.querySelector(".project-modal__panel");
  modalPanel?.classList.remove("project-modal__panel--gallery");
  modalPanel?.classList.remove("project-modal__panel--more-work");
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  setBackgroundInert(false);
  const bodyEl = document.getElementById("projectModalBody");
  if (bodyEl) {
    bodyEl.innerHTML = "";
    bodyEl.classList.remove("project-modal__body--more-work");
  }
  const returnTo = modal._returnFocusTo;
  delete modal._returnFocusTo;
  if (returnTo && document.contains(returnTo)) returnTo.focus();
}

function layoutProjectIconCluster() {
  const surface = document.getElementById("projectIconsSurface");
  if (!surface) return;
  const explorer = document.getElementById("fileExplorer");
  if (
    explorer &&
    (explorer.classList.contains("is-closed") ||
      explorer.classList.contains("is-minimized"))
  ) {
    return;
  }

  const icons = [
    ...surface.querySelectorAll(".project-icon-btn[data-project-id]"),
  ];
  if (icons.length === 0) return;

  const gap = 22;
  const rowGap = 22;
  const surfW = surface.clientWidth;
  const surfH = surface.clientHeight;
  if (surfW < 48 || surfH < 48) return;

  const cellW = 112;
  let colsPerRow = 3;
  if (surfW < cellW * 3 + gap * 2 + 8) colsPerRow = 2;
  const rows = [];
  for (let i = 0; i < icons.length; i += colsPerRow) {
    rows.push(icons.slice(i, i + colsPerRow));
  }

  const rowHeights = rows.map((row) =>
    Math.max(...row.map((b) => b.offsetHeight)),
  );
  const totalClusterHeight =
    rowHeights.reduce((sum, h) => sum + h, 0) +
    rowGap * Math.max(0, rows.length - 1);
  const topPad = 10;
  let y = Math.max(topPad, Math.floor((surfH - totalClusterHeight) / 2));

  rows.forEach((row, rowIndex) => {
    let totalW = 0;
    row.forEach((btn, i) => {
      totalW += btn.offsetWidth;
      if (i < row.length - 1) totalW += gap;
    });
    let left = Math.floor((surfW - totalW) / 2);
    const rowHeight = rowHeights[rowIndex];

    row.forEach((btn) => {
      btn.style.position = "absolute";
      btn.style.left = `${Math.max(0, left)}px`;
      btn.style.top = `${y}px`;
      left += btn.offsetWidth + gap;
    });

    y += rowHeight + rowGap;
  });
}

function wireProjectIcons() {
  const surface = document.getElementById("projectIconsSurface");
  if (!surface) return;

  layoutProjectIconCluster();

  surface
    .querySelectorAll(".project-icon-btn[data-project-id]")
    .forEach((btn) => {
      btn.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        let moveThresholdMet = false;
        const startX = e.clientX;
        const startY = e.clientY;
        const startLeft = btn.offsetLeft;
        const startTop = btn.offsetTop;

        function onMove(ev) {
          const dist = Math.hypot(ev.clientX - startX, ev.clientY - startY);
          if (dist > 4) moveThresholdMet = true;
          if (!moveThresholdMet) return;
          ev.preventDefault();
          const dx = ev.clientX - startX;
          const dy = ev.clientY - startY;
          let nl = startLeft + dx;
          let nt = startTop + dy;
          const maxL = Math.max(0, surface.clientWidth - btn.offsetWidth);
          const maxT = Math.max(0, surface.clientHeight - btn.offsetHeight);
          nl = Math.max(0, Math.min(nl, maxL));
          nt = Math.max(0, Math.min(nt, maxT));
          btn.style.left = `${Math.round(nl)}px`;
          btn.style.top = `${Math.round(nt)}px`;
        }

        function onUp() {
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseup", onUp);
          if (!moveThresholdMet) {
            const id = btn.getAttribute("data-project-id");
            if (id) openProjectModal(id);
          }
        }

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
      });

      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const id = btn.getAttribute("data-project-id");
          if (id) openProjectModal(id);
        }
      });
    });
}

function wireProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  modal.querySelectorAll("[data-modal-dismiss]").forEach((el) => {
    el.addEventListener("click", () => closeProjectModal());
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      !document.getElementById("projectModal")?.hidden
    ) {
      closeProjectModal();
    }
  });

  // Keep Tab inside the dialog while it is open.
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || modal.hidden) return;
    const panel = modal.querySelector(".project-modal__panel");
    if (!panel) return;
    const focusable = [
      ...panel.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/** Skip link jumps to the About window, restoring it if it was closed. */
function wireSkipLink() {
  const link = document.querySelector(".skip-link");
  const target = document.getElementById("notepad");
  if (!link || !target) return;
  link.addEventListener("click", (e) => {
    e.preventDefault();
    restoreWindow(target);
    setActiveLauncher(target);
    target.focus();
  });
}

/** In-page buttons (outside the file explorer) that open a project window. */
function wireProjectOpeners() {
  document.querySelectorAll("[data-open-project]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-open-project");
      if (id) openProjectModal(id);
    });
  });
}

function wireSpotifyNowPlaying() {
  const statusEl = document.getElementById("spotifyStatusText");
  const artworkEl = document.getElementById("spotifyArtwork");
  const trackEl = document.getElementById("spotifyTrackText");
  const artistEl = document.getElementById("spotifyArtistText");
  if (!statusEl || !artworkEl || !trackEl || !artistEl) return;

  const NOW_PLAYING_API_URL = "/api/now-playing";
  const CACHE_KEY = "spotify:last-played";
  let refreshTimer = null;
  let hasLoadedAtLeastOnce = false;
  let hasTrackData = false;

  /** Last track we successfully rendered, kept so errors never blank the panel. */
  function readCachedTrack() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return data && (data.title || data.artist) ? data : null;
    } catch (_) {
      return null;
    }
  }

  function writeCachedTrack(data) {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          title: data.title || "",
          artist: data.artist || "",
          albumImageUrl: data.albumImageUrl || "",
        }),
      );
    } catch (_) {
      /* private mode / quota — cache is best effort */
    }
  }

  function setStatus(text) {
    statusEl.textContent = text;
  }

  /** Fall back to the cached track instead of showing an empty panel. */
  function showFallback(message) {
    const cached = hasTrackData ? null : readCachedTrack();
    if (cached) setTrack(cached);
    if (hasTrackData) setStatus("Last played");
    else setStatus(message);
  }

  function setTrack(data) {
    trackEl.textContent = data.title || "";
    artistEl.textContent = data.artist || "";

    if (data.albumImageUrl) {
      artworkEl.src = data.albumImageUrl;
      artworkEl.alt = data.title
        ? `Album artwork for ${data.title}`
        : "Album artwork";
      artworkEl.hidden = false;
    } else {
      artworkEl.hidden = true;
    }

    hasTrackData = Boolean(data.title || data.artist || data.albumImageUrl);
  }

  async function loadNowPlaying() {
    if (!hasLoadedAtLeastOnce && !hasTrackData) {
      setStatus("Loading now playing...");
    }
    try {
      const res = await fetch(NOW_PLAYING_API_URL);
      const data = await res.json();
      if (!res.ok) {
        const baseMessage = data?.message || "Could not fetch Spotify status.";
        const rateLimitHint =
          data?.retryAfterSeconds &&
          Number.isFinite(Number(data.retryAfterSeconds))
            ? ` Retry in ~${Number(data.retryAfterSeconds)}s.`
            : "";
        showFallback(`${baseMessage}${rateLimitHint}`.trim());
        hasLoadedAtLeastOnce = true;
        return;
      }
      if (!data?.ok) {
        showFallback(data?.message || "Spotify status unavailable.");
        hasLoadedAtLeastOnce = true;
        return;
      }
      if (data.title || data.artist || data.albumImageUrl) {
        setStatus(data?.isPlaying ? "Now playing" : "Last played");
        setTrack(data);
        writeCachedTrack(data);
      } else {
        showFallback(data?.message || "No recent Spotify activity.");
      }
      hasLoadedAtLeastOnce = true;
    } catch (_) {
      showFallback("Network error while contacting Spotify.");
      hasLoadedAtLeastOnce = true;
    }
  }

  function startAutoRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = setInterval(loadNowPlaying, 20000);
  }

  // Paint the cached track first so the panel is never empty while loading.
  const cached = readCachedTrack();
  if (cached) {
    setTrack(cached);
    setStatus("Last played");
  }

  loadNowPlaying();
  startAutoRefresh();
}

function initWindows() {
  windows().forEach((win) => {
    wireWindowControls(win);
    wireResize(win);
    wireDrag(win);
    clampWindowToViewport(win);
  });
}

window.addEventListener("resize", () => {
  syncDesktopLayoutMode();
  windows().forEach((win) => {
    if (!useCssFluidWidth() && !win.style.width) {
      applyDefaultDimensions(win);
    }
    clampWindowToViewport(win);
  });
  layoutProjectIconCluster();
});

document.addEventListener("DOMContentLoaded", () => {
  windows().forEach(applyDefaultDimensions);
  const notepadWin = document.getElementById("notepad");
  initWindows();
  wireLauncher();
  wireWindowFocus();
  wireProjectIcons();
  wireProjectModal();
  wireProjectOpeners();
  wireSkipLink();
  wireSpotifyNowPlaying();
  updateLauncherState();

  const spotifyWin = document
    .getElementById("spotifyStatusText")
    ?.closest(".window");
  if (spotifyWin && !useSingleWindowMobileMode()) {
    minimizeWindow(spotifyWin);
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(layoutProjectIconCluster);
  });

  if (
    notepadWin &&
    !notepadWin.classList.contains("is-closed") &&
    !notepadWin.classList.contains("is-minimized")
  ) {
    bringToFront(notepadWin);
    setActiveLauncher(notepadWin);
  }
  syncDesktopLayoutMode(notepadWin);
});
