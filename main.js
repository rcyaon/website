const STATUS_BAR_H = 24;
const LAUNCHER_H = 36;
const DESKTOP_CHROME_BOTTOM = STATUS_BAR_H + LAUNCHER_H;

const MIN_W = 220;
const MIN_H = 160;

/**
 * @typedef {{ heading: string; body: string; bullets?: string[] }} ProjectSection
 * @typedef {{ src: string; alt?: string; fit?: 'contain' | 'cover' | 'wide' }} ProjectImage
 * @typedef {{ title: string; sections: ProjectSection[]; imageSrc?: string; imageAlt?: string; images?: ProjectImage[] }} ProjectDetail
 */

/** @type {Record<string, ProjectDetail>} */
const PROJECTS = {
    'chip-design': {
        title: 'Chip_design.TXT',
        images: [
            { src: 'chip_one.JPG', alt: 'Chip design photo 1' },
            { src: 'chip_two.JPG', alt: 'Chip design photo 2' },
        ],
        sections: [
            {
                heading: '',
                body: "Worked on Cornell Custom Silicon Systems' (C2S2) Analog subteam toward a full-chip tapeout in TSMC 180 nm of a 4.44 MS/s 8-bit differential SAR ADC."
            },
            {
                heading: 'Links',
                body: 'More about C2S2: https://c2s2.engineering.cornell.edu/'
            },
        ],
    },
    drone: {
        title: 'Drone_development.TXT',
        images: [{ src: 'DylanV2.jpg', alt: 'Drone project', fit: 'cover' }],
        sections: [
            {
                heading: '',
                body: 'Designed a custom quadcopter flight controller on a 4-layer mixed-signal PCB, integrating sensing, motor control, and onboard power systems. Developed embedded firmware for stable 6-DOF flight and autonomous control, while improving IMU accuracy through noise characterization and hardware optimization.',
            },
            {
                heading: 'Links',
                body: 'GitHub: https://github.com/cornellmotionstudio'
            },
        ],
    },
    hackathons: {
        title: 'Hackathons.TXT',
        images: [
        { src: 'blot.JPG', alt: 'Hackathon organization' },
        { src: 'P1050057.JPG', alt: 'More hackathon photos', fit: 'wide' },
        ],
        sections: [
            {
                heading: '',
                body: 'Organized hackathons with Hack Club at Amazon and FUTO and led workshops teaching PCB design and generative art using JavaScript and CNC machines. Separately served as Logistics Team Lead for BigRed//Hacks, Cornell’s annual hackathon and makeathon.',
            },
            {
                heading: 'Awards — I also participate at Hackathons!',
                body: ' ',
                bullets: [
                    '3rd Place in Societal Impact Track @ YHack',
                    '4th in Hardware Track @ YHack',
                    'Most Nostalgic Hack @ Hack Club\'s Summit',
                ],
            },
            {
                heading: 'Links',
                bullets: [
                    'More about Days of Service: https://daysofservice.hackclub.com/',
                    'Built at YHack: https://devpost.com/software/canary-axf7o2',
                ],
            },
        ],
    },
    processor: {
        title: 'Single_Cycle_Processor.TXT',
        images: [{ src: 'processor.png', alt: 'Single cycle processor', fit: 'wide' }],
        sections: [
            {
                heading: 'FPGA-Based Single-Cycle RISC-V Processor (TinyRV1)',
                body: 'Final lab for Digital Logic & Computer Organization: designed a single-cycle microprocessor in Verilog (excluding instruction/data RAM), including the ALU, decoder, register file, program counter, and branch logic. Built in Quartus, tested with ModelSim, and deployed on a Cyclone V FPGA for validation.',
            },
        ],
    },
    /* embedded: {
        title: 'Embedded_systems.TXT',
        sections: [
            {
                heading: '',
                body: 'Project placeholder. Add your embedded systems project details here.',
            },
            {
                heading: 'Links',
                body: 'Repository: https://github.com/',
            },
        ],
    }, */
};

const windows = () => Array.from(document.querySelectorAll('.desktop > .window'));

let maxZIndex = 100;

function workAreaSize() {
    return {
        w: window.innerWidth,
        h: Math.max(MIN_H, window.innerHeight - DESKTOP_CHROME_BOTTOM),
    };
}

function bringToFront(clickedWindow) {
    const visible = windows().filter((w) => !w.classList.contains('is-closed') && !w.classList.contains('is-minimized'));
    let highestZ = maxZIndex;
    visible.forEach((w) => {
        const z = parseInt(w.style.zIndex || getComputedStyle(w).zIndex || '10', 10);
        if (z > highestZ) highestZ = z;
    });
    clickedWindow.style.zIndex = String(highestZ + 1);
    maxZIndex = highestZ + 1;
    visible.forEach((w) => {
        if (w !== clickedWindow) {
            const baseZ = parseInt(getComputedStyle(w).zIndex || '10', 10);
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

function useCssFluidWidth() {
    return window.matchMedia('(max-width: 900px)').matches;
}

function useSingleWindowMobileMode() {
    return (
        window.matchMedia('(max-width: 900px)').matches ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches
    );
}

function enforceSingleOpenWindowOnMobile(preferredWindow = null) {
    if (!useSingleWindowMobileMode()) return;

    const visible = windows().filter((w) => !w.classList.contains('is-closed') && !w.classList.contains('is-minimized'));
    if (visible.length <= 1 && !preferredWindow) return;

    const target =
        (preferredWindow && !preferredWindow.classList.contains('is-closed') && !preferredWindow.classList.contains('is-minimized')
            ? preferredWindow
            : visible[visible.length - 1]) || null;
    if (!target) return;

    windows().forEach((win) => {
        if (win === target) return;
        if (!win.classList.contains('is-closed') && !win.classList.contains('is-minimized')) {
            win.classList.add('is-minimized');
        }
    });
}

function clampWindowToViewport(win) {
    if (win.classList.contains('is-closed') || win.classList.contains('is-minimized')) return;
    if (win.classList.contains('is-maximized')) return;

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
        win.style.right = 'auto';
        win.style.bottom = 'auto';
        win.style.width = `${width}px`;
        win.style.height = `${height}px`;
    } else {
        win.style.width = '';
        win.style.height = '';
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
    win.classList.remove('is-minimized');
    win.classList.remove('is-maximized');
    win.classList.add('is-closed');
    updateLauncherState();
}

function minimizeWindow(win) {
    win.classList.remove('is-closed');
    win.classList.remove('is-maximized');
    win.classList.add('is-minimized');
    updateLauncherState();
}

function restoreWindow(win) {
    win.classList.remove('is-closed', 'is-minimized');
    enforceSingleOpenWindowOnMobile(win);
    if (win.classList.contains('is-maximized')) {
        /* keep maximized */
    } else {
        clampWindowToViewport(win);
    }
    bringToFront(win);
    updateLauncherState();
}

function toggleMaximize(win) {
    if (win.classList.contains('is-maximized')) {
        win.classList.remove('is-maximized');
        restoreBounds(win);
        clampWindowToViewport(win);
    } else {
        saveBounds(win);
        win.classList.add('is-maximized');
        win.style.right = 'auto';
        win.style.bottom = 'auto';
    }
    updateLauncherState();
}

function wireWindowControls(win) {
    const controls = win.querySelectorAll('.window-control[data-action]');
    controls.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.getAttribute('data-action');
            if (action === 'close') closeWindow(win);
            else if (action === 'minimize') minimizeWindow(win);
            else if (action === 'maximize') toggleMaximize(win);
        });
    });
}

function wireResize(win) {
    const handles = win.querySelectorAll('.resize-handle[data-dir]');
    handles.forEach((handle) => {
        handle.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            if (win.classList.contains('is-maximized')) return;
            e.preventDefault();
            e.stopPropagation();
            bringToFront(win);

            const dir = handle.getAttribute('data-dir') || '';
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

                if (dir.includes('e')) width = startW + dx;
                if (dir.includes('s')) height = startH + dy;
                if (dir.includes('w')) {
                    width = startW - dx;
                    left = startLeft + dx;
                }
                if (dir.includes('n')) {
                    height = startH - dy;
                    top = startTop + dy;
                }

                width = Math.max(MIN_W, width);
                height = Math.max(MIN_H, height);

                if (dir.includes('w')) {
                    const maxLeft = startLeft + startW - MIN_W;
                    left = Math.min(Math.max(0, left), maxLeft);
                    width = Math.min(width, startLeft + startW - left);
                }
                if (dir.includes('n')) {
                    const maxTop = startTop + startH - MIN_H;
                    top = Math.min(Math.max(0, top), maxTop);
                    height = Math.min(height, startTop + startH - top);
                }

                if (left + width > vw) width = vw - left;
                if (top + height > vh) height = vh - top;
                if (width < MIN_W) {
                    width = MIN_W;
                    if (dir.includes('w')) left = startLeft + startW - MIN_W;
                }
                if (height < MIN_H) {
                    height = MIN_H;
                    if (dir.includes('n')) top = startTop + startH - MIN_H;
                }

                win.style.left = `${Math.round(left)}px`;
                win.style.top = `${Math.round(top)}px`;
                win.style.width = `${Math.round(width)}px`;
                win.style.height = `${Math.round(height)}px`;
                win.style.right = 'auto';
                win.style.bottom = 'auto';
            }

            function onUp() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
            }

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });
    });
}

function wireDrag(win) {
    const titleBar = win.querySelector('.title-bar');
    if (!titleBar) return;

    let isDragging = false;
    let initialX = 0;
    let initialY = 0;

    const windowControls = win.querySelector('.window-controls');
    if (windowControls) {
        windowControls.addEventListener('mousedown', (e) => e.stopPropagation());
    }

    titleBar.addEventListener('mousedown', dragStart);

    function dragStart(e) {
        if (e.target.closest('.window-controls')) return;
        if (e.button !== 0) return;
        bringToFront(win);
        if (win.classList.contains('is-maximized')) return;

        const rect = win.getBoundingClientRect();
        if (!useCssFluidWidth()) {
            win.style.right = 'auto';
            win.style.bottom = 'auto';
            win.style.width = `${rect.width}px`;
            win.style.height = `${rect.height}px`;
        }
        win.style.left = `${rect.left}px`;
        win.style.top = `${rect.top}px`;

        initialX = e.clientX - rect.left;
        initialY = e.clientY - rect.top;
        isDragging = true;
        win.classList.add('active');
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
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
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
    }
}

function updateLauncherState() {
    const buttons = document.querySelectorAll('.launcher-btn[data-launch]');
    buttons.forEach((btn) => {
        const id = btn.getAttribute('data-launch');
        const win = document.getElementById(id);
        if (!win) return;
        const hidden = win.classList.contains('is-closed') || win.classList.contains('is-minimized');
        btn.classList.toggle('is-window-hidden', hidden);
        if (hidden) btn.classList.remove('is-window-active');
    });
}

function setActiveLauncher(win) {
    document.querySelectorAll('.launcher-btn').forEach((b) => b.classList.remove('is-window-active'));
    const btn = document.querySelector(`.launcher-btn[data-launch="${win.id}"]`);
    if (btn) btn.classList.add('is-window-active');
}

function wireLauncher() {
    document.querySelectorAll('.launcher-btn[data-launch]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-launch');
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
        win.addEventListener('mousedown', (e) => {
            if (e.target.closest('.title-bar')) return;
            if (win.classList.contains('is-closed') || win.classList.contains('is-minimized')) return;
            enforceSingleOpenWindowOnMobile(win);
            bringToFront(win);
            setActiveLauncher(win);
        });
    });
}

function applyDefaultDimensions(win) {
    const dw = win.getAttribute('data-default-width');
    const dh = win.getAttribute('data-default-height');
    if (!win.style.width && dw) win.style.width = `${dw}px`;
    if (!win.style.height && dh) win.style.height = `${dh}px`;
}

function openProjectModal(projectId) {
    const data = PROJECTS[projectId];
    const modal = document.getElementById('projectModal');
    const titleEl = document.getElementById('projectModalTitle');
    const bodyEl = document.getElementById('projectModalBody');
    if (!data || !modal || !titleEl || !bodyEl) return;

    titleEl.textContent = data.title;
    const sectionsHtml = data.sections.map(renderProjectSection).join('');
    bodyEl.innerHTML = sectionsHtml + renderProjectImageBlock(data);

    modal.hidden = false;
    document.body.classList.add('modal-open');

    const closeBtn = modal.querySelector('.project-modal__close');
    closeBtn?.focus();
}

function renderProjectSection(s) {
    let html = '';
    if (s.heading && String(s.heading).trim()) {
        html += `<h3>${escapeHtml(s.heading)}</h3>`;
    }
    if (s.body && String(s.body).trim()) {
        html += s.body
            .split(/\n+/)
            .filter((p) => p.trim())
            .map((p) => `<p>${linkifyText(p)}</p>`)
            .join('');
    }
    if (s.bullets && s.bullets.length > 0) {
        html +=
            '<ul class="project-modal__bullet-list">' +
            s.bullets.map((item) => `<li>${linkifyText(item)}</li>`).join('') +
            '</ul>';
    }
    return html;
}

function linkifyText(str) {
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    let lastIndex = 0;
    let result = '';
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
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function renderProjectImageBlock(data) {
    const figures = [];

    if (data.images && data.images.length > 0) {
        data.images.forEach((img, i) => {
            const alt = img.alt || `Project image ${i + 1}`;
            let fitClass = '';
            if (img.fit === 'cover') fitClass = ' project-modal__image--cover';
            else if (img.fit === 'wide') fitClass = ' project-modal__image--wide';
            figures.push(
                `<figure class="project-modal__figure">` +
                    `<img class="project-modal__image${fitClass}" src="${escapeAttr(img.src)}" alt="${escapeHtml(alt)}" loading="lazy">` +
                `</figure>`
            );
        });
    } else if (data.imageSrc) {
        const alt = data.imageAlt || 'Project image';
        figures.push(
            `<figure class="project-modal__figure">` +
                `<img class="project-modal__image" src="${escapeAttr(data.imageSrc)}" alt="${escapeHtml(alt)}" loading="lazy">` +
            `</figure>`
        );
    }

    const headingText = figures.length > 1 ? 'Project images' : 'Project image';
    const heading = `<h3 class="project-modal__media-heading">${headingText}</h3>`;

    if (figures.length > 0) {
        return `<div class="project-modal__media">${heading}${figures.join('')}</div>`;
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
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    const bodyEl = document.getElementById('projectModalBody');
    if (bodyEl) bodyEl.innerHTML = '';
}

function layoutProjectIconCluster() {
    const surface = document.getElementById('projectIconsSurface');
    if (!surface) return;
    const explorer = document.getElementById('fileExplorer');
    if (
        explorer &&
        (explorer.classList.contains('is-closed') || explorer.classList.contains('is-minimized'))
    ) {
        return;
    }

    const icons = [...surface.querySelectorAll('.project-icon-btn[data-project-id]')];
    if (icons.length === 0) return;

    const gap = 28;
    const rowGap = 20;
    const surfW = surface.clientWidth;
    const surfH = surface.clientHeight;
    if (surfW < 48 || surfH < 48) return;

    const colsPerRow = 2;
    const rows = [];
    for (let i = 0; i < icons.length; i += colsPerRow) {
        rows.push(icons.slice(i, i + colsPerRow));
    }

    const rowHeights = rows.map((row) => Math.max(...row.map((b) => b.offsetHeight)));
    const totalClusterHeight =
        rowHeights.reduce((sum, h) => sum + h, 0) + rowGap * Math.max(0, rows.length - 1);
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
            btn.style.position = 'absolute';
            btn.style.left = `${Math.max(0, left)}px`;
            btn.style.top = `${y}px`;
            left += btn.offsetWidth + gap;
        });

        y += rowHeight + rowGap;
    });
}

function wireProjectIcons() {
    const surface = document.getElementById('projectIconsSurface');
    if (!surface) return;

    layoutProjectIconCluster();

    surface.querySelectorAll('.project-icon-btn[data-project-id]').forEach((btn) => {
        btn.addEventListener('mousedown', (e) => {
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
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                if (!moveThresholdMet) {
                    const id = btn.getAttribute('data-project-id');
                    if (id) openProjectModal(id);
                }
            }

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });

        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const id = btn.getAttribute('data-project-id');
                if (id) openProjectModal(id);
            }
        });
    });
}

function wireProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    modal.querySelectorAll('[data-modal-dismiss]').forEach((el) => {
        el.addEventListener('click', () => closeProjectModal());
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !document.getElementById('projectModal')?.hidden) {
            closeProjectModal();
        }
    });
}

function wireSpotifyNowPlaying() {
    const connectBtn = document.getElementById('spotifyConnectBtn');
    const disconnectBtn = document.getElementById('spotifyDisconnectBtn');
    const refreshBtn = document.getElementById('spotifyRefreshBtn');
    const statusEl = document.getElementById('spotifyStatusText');
    const artworkEl = document.getElementById('spotifyArtwork');
    const trackEl = document.getElementById('spotifyTrackText');
    const artistEl = document.getElementById('spotifyArtistText');
    const linkEl = document.getElementById('spotifyTrackLink');
    const redirectUriText = document.getElementById('spotifyRedirectUriText');
    if (!connectBtn || !disconnectBtn || !refreshBtn || !statusEl || !artworkEl || !trackEl || !artistEl || !linkEl || !redirectUriText) return;

    // Set this to your Spotify app client ID.
    const SPOTIFY_CLIENT_ID = 'ea80f652f9f245c3a60473df72a07829';
    const SPOTIFY_SCOPES = 'user-read-currently-playing user-read-playback-state';
    const REDIRECT_URI = `${window.location.origin}${window.location.pathname}`;
    const LS = {
        access: 'spotify_access_token',
        refresh: 'spotify_refresh_token',
        expiresAt: 'spotify_token_expires_at',
        verifier: 'spotify_pkce_verifier',
        state: 'spotify_oauth_state',
    };
    let refreshTimer = null;

    redirectUriText.textContent = REDIRECT_URI;

    function setStatus(text) {
        statusEl.textContent = text;
    }

    function clearTrack() {
        trackEl.textContent = '';
        artistEl.textContent = '';
        artworkEl.hidden = true;
        linkEl.hidden = true;
    }

    function isConfigured() {
        return Boolean(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_ID.trim());
    }

    function randomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const bytes = new Uint8Array(length);
        crypto.getRandomValues(bytes);
        for (let i = 0; i < length; i += 1) result += chars[bytes[i] % chars.length];
        return result;
    }

    async function sha256(plain) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return crypto.subtle.digest('SHA-256', data);
    }

    function base64UrlEncode(buffer) {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/g, '');
    }

    async function exchangeCodeForTokens(code) {
        const verifier = localStorage.getItem(LS.verifier);
        if (!verifier) throw new Error('Missing PKCE verifier');

        const body = new URLSearchParams({
            client_id: SPOTIFY_CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: verifier,
        });

        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });
        if (!res.ok) throw new Error('Could not exchange code for token');
        return res.json();
    }

    async function refreshAccessToken() {
        const refreshToken = localStorage.getItem(LS.refresh);
        if (!refreshToken) return null;

        const body = new URLSearchParams({
            client_id: SPOTIFY_CLIENT_ID,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });
        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });
        if (!res.ok) return null;
        return res.json();
    }

    function saveTokens(tokenResponse) {
        if (tokenResponse.access_token) {
            localStorage.setItem(LS.access, tokenResponse.access_token);
        }
        if (tokenResponse.refresh_token) {
            localStorage.setItem(LS.refresh, tokenResponse.refresh_token);
        }
        if (tokenResponse.expires_in) {
            const expiresAt = Date.now() + tokenResponse.expires_in * 1000;
            localStorage.setItem(LS.expiresAt, String(expiresAt));
        }
    }

    async function ensureValidAccessToken() {
        const accessToken = localStorage.getItem(LS.access);
        const expiresAt = Number(localStorage.getItem(LS.expiresAt) || '0');
        const hasFreshToken = accessToken && expiresAt > Date.now() + 60000;
        if (hasFreshToken) return accessToken;

        const refreshed = await refreshAccessToken();
        if (!refreshed || !refreshed.access_token) return null;
        saveTokens(refreshed);
        return refreshed.access_token;
    }

    async function loadNowPlaying() {
        if (!isConfigured()) {
            setStatus('Set SPOTIFY_CLIENT_ID in main.js first.');
            clearTrack();
            return;
        }

        const token = await ensureValidAccessToken();
        if (!token) {
            setStatus('Connect Spotify to auto-load your music.');
            clearTrack();
            return;
        }

        setStatus('Loading now playing...');
        try {
            const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 204) {
                setStatus('Nothing playing right now.');
                clearTrack();
                return;
            }
            if (res.status === 401) {
                localStorage.removeItem(LS.access);
                setStatus('Session expired, reconnect Spotify.');
                clearTrack();
                return;
            }
            if (!res.ok) {
                setStatus('Could not fetch Spotify status.');
                clearTrack();
                return;
            }

            const data = await res.json();
            const item = data?.item;
            if (!item) {
                setStatus('Nothing playing right now.');
                clearTrack();
                return;
            }

            const artistNames = (item.artists || []).map((a) => a.name).join(', ');
            const image = item.album?.images?.[1]?.url || item.album?.images?.[0]?.url || '';
            const externalUrl = item.external_urls?.spotify || '';

            setStatus(data?.is_playing ? 'Now playing' : 'Last played');
            trackEl.textContent = item.name || '';
            artistEl.textContent = artistNames || '';

            if (image) {
                artworkEl.src = image;
                artworkEl.hidden = false;
            } else {
                artworkEl.hidden = true;
            }

            if (externalUrl) {
                linkEl.href = externalUrl;
                linkEl.hidden = false;
            } else {
                linkEl.hidden = true;
            }
        } catch (_) {
            setStatus('Network error while contacting Spotify.');
            clearTrack();
        }
    }

    async function connectSpotify() {
        if (!isConfigured()) {
            setStatus('Set SPOTIFY_CLIENT_ID in main.js first.');
            return;
        }
        const state = randomString(16);
        const verifier = randomString(64);
        const challenge = base64UrlEncode(await sha256(verifier));
        localStorage.setItem(LS.state, state);
        localStorage.setItem(LS.verifier, verifier);

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: SPOTIFY_CLIENT_ID,
            scope: SPOTIFY_SCOPES,
            redirect_uri: REDIRECT_URI,
            state,
            code_challenge_method: 'S256',
            code_challenge: challenge,
        });
        window.location.assign(`https://accounts.spotify.com/authorize?${params.toString()}`);
    }

    async function handleOAuthRedirect() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const error = params.get('error');
        if (error) {
            setStatus(`Spotify auth error: ${error}`);
            return;
        }
        if (!code) return;

        const expectedState = localStorage.getItem(LS.state);
        if (!state || !expectedState || state !== expectedState) {
            setStatus('Spotify auth state mismatch.');
            return;
        }

        try {
            const tokenResponse = await exchangeCodeForTokens(code);
            saveTokens(tokenResponse);
            setStatus('Spotify connected.');
        } catch (_) {
            setStatus('Failed to complete Spotify login.');
        } finally {
            localStorage.removeItem(LS.state);
            localStorage.removeItem(LS.verifier);
            const clean = `${window.location.origin}${window.location.pathname}`;
            window.history.replaceState({}, document.title, clean);
        }
    }

    function disconnectSpotify() {
        localStorage.removeItem(LS.access);
        localStorage.removeItem(LS.refresh);
        localStorage.removeItem(LS.expiresAt);
        localStorage.removeItem(LS.state);
        localStorage.removeItem(LS.verifier);
        setStatus('Disconnected from Spotify.');
        clearTrack();
    }

    function startAutoRefresh() {
        if (refreshTimer) clearInterval(refreshTimer);
        refreshTimer = setInterval(loadNowPlaying, 20000);
    }

    connectBtn.addEventListener('click', connectSpotify);
    disconnectBtn.addEventListener('click', disconnectSpotify);
    refreshBtn.addEventListener('click', loadNowPlaying);

    handleOAuthRedirect().then(() => loadNowPlaying());
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

window.addEventListener('resize', () => {
    enforceSingleOpenWindowOnMobile();
    windows().forEach((win) => {
        if (!useCssFluidWidth() && !win.style.width) {
            applyDefaultDimensions(win);
        }
        clampWindowToViewport(win);
    });
    layoutProjectIconCluster();
});

document.addEventListener('DOMContentLoaded', () => {
    windows().forEach(applyDefaultDimensions);
    const defaultMobileWindow = document.getElementById('notepad');
    enforceSingleOpenWindowOnMobile(defaultMobileWindow);
    initWindows();
    wireLauncher();
    wireWindowFocus();
    wireProjectIcons();
    wireProjectModal();
    wireSpotifyNowPlaying();
    updateLauncherState();

    requestAnimationFrame(() => {
        requestAnimationFrame(layoutProjectIconCluster);
    });

    const topWin = windows().find((w) => !w.classList.contains('is-closed') && !w.classList.contains('is-minimized'));
    if (topWin) {
        setActiveLauncher(topWin);
        enforceSingleOpenWindowOnMobile(defaultMobileWindow || topWin);
    }
});
