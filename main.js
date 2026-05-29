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
 * }} ProjectSection
 * @typedef {{ type: 'image' | 'video' | 'embed'; src: string; alt?: string; caption?: string; youtubeShowControls?: boolean; youtubeAutoplay?: boolean; youtubeLoop?: boolean }} ProjectGalleryItem
 * @typedef {{ title: string; sections: ProjectSection[]; imageSrc?: string; imageAlt?: string; images?: ProjectImage[]; gallery?: ProjectGalleryItem[]; noMedia?: boolean }} ProjectDetail
 */

/** @type {Record<string, ProjectDetail>} */
const PROJECTS = {
  "chip-design": {
    title: "Chip_design.TXT — NOTEPAD.EXE",
    images: [
      { src: "images/chip_one.JPG", alt: "Chip design photo 1" },
      { src: "images/chip_two.JPG", alt: "Chip design photo 2" },
      { src: "images/unnamed.png", alt: "Chip design photo 3" },
    ],
    sections: [
      {
        heading: "",
        body: "On Cornell's all-undergrad analog team, we taped out a 4.44 MS/s 8-bit differential SAR ADC in TSMC 180nm. No one was going to hand us the design files, so we figured it out ourselves working through Cadence Virtuoso and a lot of shared notes. One of the only undergraduate teams in the country doing this, it works!",
      },
      {
        heading: "",
        body: "From there we've been exploring two side projects: a novel adiabatic Flash ADC that hits ~80 µW total power (~30× lower than our SAR) using charge-recovery logic, and an asynchronous SAR ADC that self-times between bit decisions instead of waiting on a clock.",
      },
      {
        heading: "Links",
        bullets: [
          "GitHub: https://github.com/cornell-c2s2",
          "More about Cornell Custom Silicon Systems: https://www.c2s2.dev",
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
        body: "GitHub: https://github.com/cornellmotionstudio",
      },
    ],
  },
  "brokaw-bandgap-ptat": {
    title: "Tiny_Tapeout.TXT — NOTEPAD.EXE",
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
          "GitHub: https://github.com/rcyaon/bandgap-ptat",
          "GDS viewer: https://rcyaon.github.io/bandgap-ptat/ ",
        ],
      },
    ],
  },

  setlist: {
    title: "SETLIST.TXT — NOTEPAD.EXE",
    noMedia: true,
    sections: [
      {
        body: 'Here\'s my "setlist," including some things I find awesome, catching live music, and writing about whatever piques my interest.',
      },
      {
        isHtml: true,
        body: `<ul class="project-modal__bullet-list">
  <li><a href="#" onclick="openProjectModal('favorites'); return false;">List of favorites</a></li>
  <li>Substack
    <ul class="project-modal__sub-bullet-list">
      <li><a href="https://substack.com/@lenaphobia/p-189677998" target="_blank" rel="noopener">The epitome of coolness</a></li>
      <li><a href="https://substack.com/home/post/p-191226474" target="_blank" rel="noopener">Against clarity</a></li>
    </ul>
  </li>
  <li><a href="#" onclick="openProjectModal('concert-archive'); return false;">Photos of live music</a></li>
</ul>`,
      },
    ],
  },

  favorites: {
    title: "Terminal.EXE",
    noMedia: true,
    sections: [
      {
        body: "echo \"A few of my favorites!\"",
      },
      {
        isHtml: true,
        body: `<div class="project-modal__experience-panel-body project-modal__experience-panel-body--tree">
  <div class="project-modal__tree-row">
    <span class="project-modal__tree-tc">&#9500;&#9472;&#9472; </span>
    <span class="project-modal__tree-ht">film</span>
  </div>
  <div class="project-modal__tree-row">
    <span class="project-modal__tree-pipe"></span>
    <span class="project-modal__tree-tc">  &#9492;&#9472;&#9472; </span>
    <p><a href="https://letterboxd.com/film/mr-klein/" target="_blank" rel="noopener">Mr. Klein</a>, where existentialist dread meets film noir cool (HM: <a href="https://letterboxd.com/film/blackberry/" target="_blank" rel="noopener">Blackberry</a>, <a href="https://letterboxd.com/film/taste-of-cherry/" target="_blank" rel="noopener">Taste of Cherry</a>)
</p>
  </div>
  <div class="project-modal__tree-row">
    <span class="project-modal__tree-tc">&#9500;&#9472;&#9472; </span>
    <span class="project-modal__tree-ht">book</span>
  </div>
  <div class="project-modal__tree-row">
    <span class="project-modal__tree-pipe"></span>
    <span class="project-modal__tree-tc">  &#9492;&#9472;&#9472; </span>
    <p>I could never shut up about <a href="https://archive.org/details/heartschoolboysj00deam" target="_blank" rel="noopener">Heart</a> by Edmundo de Amicis, though <a href="https://archive.org/stream/american-psycho-BEE/American%20Psycho%20(Bret%20Easton%20Ellis)%20(z-lib.org)_djvu.txt" target="_blank" rel="noopener">American Psycho</a> by Bret Easton Ellis is a close second. Honestly I'm more of an essays, Greek drama, and short stories (recently finished <a href="https://pmpress.org/index.php?l=product_detail&p=427" target="_blank" rel="noopener">We, the Children of Cats</a>!) person, with some philosophy like Kierkegaard thrown in.
</p>
  </div>
  <div class="project-modal__tree-row">
    <span class="project-modal__tree-tc">&#9492;&#9472;&#9472; </span>
    <span class="project-modal__tree-ht">album of 2025</span>
  </div>
  <div class="project-modal__tree-row">
    <span class="project-modal__tree-pipe project-modal__tree-pipe--last"></span>
    <span class="project-modal__tree-tc">  &#9492;&#9472;&#9472; </span>
    <p><a href="https://caroline.bandcamp.com/album/caroline-2" target="_blank" rel="noopener">caroline 2</a> by caroline rewired how I hear music and cracked open a whole world of indie music</p>
  </div>
</div>`,
      },
    ],
    afterMedia: `<br><p class="favorites-return"><a href="#" onclick="openProjectModal('setlist'); return false;">&#x21B5; Return</a></p>`,
  },

  "concert-archive": {
    title: "Photo_Viewer.EXE",
    sections: [
      {
        heading: "",
        body: "A photo dump of some of the concerts I've gone to!",
      },
    ],

    gallery: [
      {
        type: "image",
        src: "images/concerts/100_1304.JPG",
        caption: "Julie in Buffalo",
      },
      {
        type: "image",
        src: "images/concerts/100_1272.JPG",
        caption: "Midrift in Buffalo",
      },
      {
        type: "image",
        src: "images/concerts/100_1285.JPG",
        caption: "Julie in Buffalo",
      },
      {
        type: "image",
        src: "images/concerts/IMG_6861.jpeg",
        caption: "Julie in Seattle",
      },
      {
        type: "image",
        src: "images/concerts/IMG_6898.jpeg",
        caption: "The Marías in Seattle",
      },
      {
        type: "image",
        src: "images/concerts/IMG_6922.jpeg",
        caption: "The Marías in Seattle",
      },
      {
        type: "image",
        src: "images/concerts/IMG_6972.jpeg",
        caption: "The Marías in Seattle",
      },
      {
        type: "image",
        src: "images/concerts/IMG_0469.jpeg",
        caption: "Zzzahara in Houston",
      },
      {
        type: "image",
        src: "images/concerts/100_0569_Original.jpeg",
        caption: "Panchiko in Seattle",
      },
      {
        type: "image",
        src: "images/concerts/IMG_6365.jpeg",
        caption: "Panchiko in Seattle",
      },
      {
        type: "image",
        src: "images/concerts/IMG_7449.jpeg",
        caption: "Fleshwater in Buffalo",
      },
    ],
    afterMedia: `<p class="favorites-return"><a href="#" onclick="openProjectModal('setlist'); return false;">&#x21B5; Return</a></p>`,
  },
  "more-work": {
    title: "TERMINAL.EXE",
    sections: [
      {
        variant: "panel",
        panelHeadingStyle: "band",
        treeBlocks: true,
        heading: "‎ Programs",
        blocks: [
          {
            heading: "Google Code Next",
            body: "Paid to learn to code! Exploring creative coding and digital music through algorithmic composition and audio synthesis in JavaScript taught by Google engineers.",
          },
          {
            heading: "MATLAB Ambassador",
            body: "Paid work delivering hands-on MATLAB and Simulink workshops while evaluating pre-release features.",
          },
          {
            heading:
              "MIT Introduction to Technology, Engineering, and Science (MITES)",
            body: "Built autonomous robots and explored the intersection of biomimicry and train physics. Now an ambassador helping grow my favorite network! ",
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
        heading: "‎ MISCELLANEOUS",
        blocks: [{}],
      },
      {
        heading: "5-Stage Pipelined RISC-V Processor (TinyRV1)",
        body: "Architected a 5-stage pipelined RISC-V processor in Verilog, implementing full forwarding, hazard detection, and branch prediction with a branch target buffer; validated timing and control flow end-to-end in ModelSim and on a Cyclone V FPGA.",
        image: {
          src: "images/rv1.png",
          alt: "Processor preview",
        },
      },
      {
        heading: "Organizing Hackathons",
        body: "Introduced K-12 students to the world of hardware through beginner-friendly workshops covering PCB design, JavaScript-based drawing, and CNC machines, hosted at FUTO in Austin and Amazon in Seattle.",
        bullets: ["More at: https://daysofservice.hackclub.com/"],
        image: {
          src: "images/blot.JPG",
        },
      },
      {
        variant: "panel",
        panelHeadingStyle: "band",
        treeBlocks: true,
        heading: `‎ Awards`,
        blocks: [
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
              "Built Canary, a real-time mine hazard detection system with Raspberry Pi, gas sensors, and depth cameras. 3rd in Societal Impact and 4th in Hardware out of 700+ participants.",
              "Devpost: https://devpost.com/software/canary-axf7o2",
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
      projectId === "more-work",
    );
  }

  titleEl.textContent = data.title;

  const useSectionImages =
    data.noMedia !== true &&
    !(data.gallery && data.gallery.length > 0) &&
    data.sections.some((s) => s.image);

  if (useSectionImages) {
    const splitSideImages = projectId === "more-work";
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
    projectId === "more-work",
  );

  if (data.gallery && data.gallery.length > 0) {
    const galleryRoot = bodyEl.querySelector(".project-modal__gallery");
    if (galleryRoot) wireProjectGallery(modal, galleryRoot, data.gallery);
  }

  bodyEl.scrollTop = 0;
  modal.hidden = false;
  document.body.classList.add("modal-open");

  const closeBtn = modal.querySelector(".project-modal__close");
  closeBtn?.focus();
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

function renderProjectPanelTreeBlocks(blocks) {
  const filtered = blocks.filter((b) => b.heading && String(b.heading).trim());
  if (filtered.length === 0) return "";
  return filtered
    .map((b, i) => {
      const isLast = i === filtered.length - 1;
      const branchChar = isLast ? "\u2514\u2500\u2500 " : "\u251c\u2500\u2500 ";
      const lines = [];
      if (b.body && String(b.body).trim()) lines.push(String(b.body).trim());
      if (b.bullets && b.bullets.length > 0) {
        b.bullets.forEach((item) => {
          if (item && String(item).trim()) lines.push(String(item).trim());
        });
      }
      let html =
        `<div class="project-modal__tree-row">` +
        `<span class="project-modal__tree-tc">${branchChar}</span>` +
        `<span class="project-modal__tree-ht">${escapeHtml(b.heading)}</span>` +
        `</div>`;
      lines.forEach((line, lineIndex) => {
        const isLastLine = lineIndex === lines.length - 1;
        const hidePipe = lineIndex === 0 && lines.length > 1;
        const pipeClass = hidePipe
          ? "project-modal__tree-pipe project-modal__tree-pipe--last"
          : isLast && isLastLine
            ? "project-modal__tree-pipe project-modal__tree-pipe--last"
            : "project-modal__tree-pipe";
        html +=
          `<div class="project-modal__tree-row">` +
          `<span class="${pipeClass}"></span>` +
          `<span class="project-modal__tree-tc">  \u2514\u2500\u2500 </span>` +
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
    `<button type="button" class="project-modal__gallery-nav project-modal__gallery-nav--prev" data-gallery-prev aria-label="Previous item">←</button>` +
    `<div class="project-modal__gallery-center">` +
    `<div class="project-modal__gallery-frame" data-gallery-frame></div>` +
    `<p class="project-modal__gallery-counter" data-gallery-counter></p>` +
    `<p class="project-modal__gallery-caption" data-gallery-caption></p>` +
    `</div>` +
    `<button type="button" class="project-modal__gallery-nav project-modal__gallery-nav--next" data-gallery-next aria-label="Next item">→</button>` +
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
  const bodyEl = document.getElementById("projectModalBody");
  if (bodyEl) {
    bodyEl.innerHTML = "";
    bodyEl.classList.remove("project-modal__body--more-work");
  }
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
}

function wireSpotifyNowPlaying() {
  const statusEl = document.getElementById("spotifyStatusText");
  const artworkEl = document.getElementById("spotifyArtwork");
  const trackEl = document.getElementById("spotifyTrackText");
  const artistEl = document.getElementById("spotifyArtistText");
  const linkEl = document.getElementById("spotifyTrackLink");
  if (!statusEl || !artworkEl || !trackEl || !artistEl) return;

  const NOW_PLAYING_API_URL = "/api/now-playing";
  let refreshTimer = null;
  let hasLoadedAtLeastOnce = false;
  let hasTrackData = false;

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function clearTrack() {
    trackEl.textContent = "";
    artistEl.textContent = "";
    artworkEl.hidden = true;
    if (linkEl) linkEl.hidden = true;
    hasTrackData = false;
  }

  function setTrack(data) {
    trackEl.textContent = data.title || "";
    artistEl.textContent = data.artist || "";

    if (data.albumImageUrl) {
      artworkEl.src = data.albumImageUrl;
      artworkEl.hidden = false;
    } else {
      artworkEl.hidden = true;
    }

    if (linkEl && data.songUrl) {
      linkEl.href = data.songUrl;
      linkEl.hidden = false;
    } else if (linkEl) {
      linkEl.hidden = true;
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
        if (hasTrackData) {
          setStatus(`${baseMessage}${rateLimitHint} Showing last known track.`);
        } else {
          setStatus(`${baseMessage}${rateLimitHint}`.trim());
          clearTrack();
        }
        hasLoadedAtLeastOnce = true;
        return;
      }
      if (!data?.ok) {
        const message = data?.message || "Spotify status unavailable.";
        if (hasTrackData) setStatus(`${message} Showing last known track.`);
        else {
          setStatus(message);
          clearTrack();
        }
        hasLoadedAtLeastOnce = true;
        return;
      }
      if (data.title || data.artist || data.albumImageUrl) {
        setStatus(data?.isPlaying ? "Now playing" : "Last played");
        setTrack(data);
      } else {
        const message = data?.message || "No recent Spotify activity.";
        if (hasTrackData) setStatus(`${message} Showing last known track.`);
        else {
          setStatus(message);
          clearTrack();
        }
      }
      hasLoadedAtLeastOnce = true;
    } catch (_) {
      if (hasTrackData)
        setStatus(
          "Network error while contacting Spotify. Showing last known track.",
        );
      else {
        setStatus("Network error while contacting Spotify.");
        clearTrack();
      }
      hasLoadedAtLeastOnce = true;
    }
  }

  function startAutoRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = setInterval(loadNowPlaying, 20000);
  }

  loadNowPlaying();
  startAutoRefresh();
}

function wireLinkSparkles() {
  const GLYPHS = [
    "\u2726",
    "\u2727",
    "\u2726",
    "+",
    "\u00d7",
    "*",
    "\u00b7",
    "\u2726",
  ];
  const COLORS = [
    "#1a1a1a",
    "#6f6f6f",
    "#6f6f6f",
    "#9a9a9a",
    "#1a1a1a",
    "#6f6f6f",
  ];
  let lastTime = 0;

  function isLink(el) {
    return !!el?.closest("a") && !!el?.closest("#notepad");
  }

  function spawn(x, y) {
    // occasionally drop 2 at once for a burstier feel
    const count = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "link-sparkle";
      el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      el.style.left = x + (Math.random() - 0.5) * 22 + "px";
      el.style.top = y + (Math.random() - 0.5) * 22 + "px";
      el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      el.style.fontSize = 8 + Math.floor(Math.random() * 8) + "px";
      el.style.setProperty("--sx", (Math.random() - 0.5) * 22 + "px");
      el.style.setProperty("--sy", -(10 + Math.random() * 20) + "px");
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }
  }

  document.addEventListener("mousemove", (e) => {
    if (!isLink(e.target)) return;
    const now = Date.now();
    if (now - lastTime < 75) return;
    lastTime = now;
    spawn(e.clientX, e.clientY);
  });
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
  const defaultMobileWindow = document.getElementById("notepad");
  initWindows();
  wireLauncher();
  wireWindowFocus();
  wireProjectIcons();
  wireProjectModal();
  wireSpotifyNowPlaying();
  wireLinkSparkles();
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

  const notepadWin = document.getElementById("notepad");
  if (
    notepadWin &&
    !notepadWin.classList.contains("is-closed") &&
    !notepadWin.classList.contains("is-minimized")
  ) {
    bringToFront(notepadWin);
    setActiveLauncher(notepadWin);
  }
  syncDesktopLayoutMode(defaultMobileWindow || notepadWin);
});
