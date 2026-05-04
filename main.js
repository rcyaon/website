const STATUS_BAR_H = 24;
const LAUNCHER_H = 36;
const DESKTOP_CHROME_BOTTOM = STATUS_BAR_H + LAUNCHER_H;

const MIN_W = 220;
const MIN_H = 160;

/**
 * @typedef {{ heading: string; body: string; bullets?: string[] }} ProjectSection
 * @typedef {{ src: string; alt?: string; fit?: 'contain' | 'cover' | 'wide' }} ProjectImage
 * @typedef {{ type: 'image' | 'video' | 'embed'; src: string; alt?: string; caption?: string; youtubeShowControls?: boolean; youtubeAutoplay?: boolean; youtubeLoop?: boolean }} ProjectGalleryItem
 * @typedef {{ title: string; sections: ProjectSection[]; imageSrc?: string; imageAlt?: string; images?: ProjectImage[]; gallery?: ProjectGalleryItem[] }} ProjectDetail
 */

/** @type {Record<string, ProjectDetail>} */
const PROJECTS = {
    'chip-design': {
        title: 'Chip_design.TXT',
        images: [
            { src: 'images/chip_one.JPG', alt: 'Chip design photo 1' },
            { src: 'images/chip_two.JPG', alt: 'Chip design photo 2' },
            { src: 'images/unnamed.png', alt: 'Chip design photo 3' },
        ],
        sections: [
            {
                heading: '',
                body: "Spent a year on Cornell's all-undergrad analog team working toward a full-chip tapeout in TSMC 180nm - a 4.44 MS/s 8-bit differential SAR ADC. No one was going to hand us the design files, so we figured it out ourselves with Cadence Virtuoso manuals and a lot of shared notes. One of the only undergraduate teams in the country doing this. It works."
            },
            {
                heading: 'Links',
                body: 'More about C2S2: https://c2s2.engineering.cornell.edu/'
            },
        ],
    },
    drone: {
        title: 'Drone_development.TXT',
        images: [{ src: 'images/DylanV2.jpg', alt: 'Drone project', fit: 'cover' }],
        sections: [
            {
                heading: '',
                body: 'Designed a 4-layer mixed-signal PCB for a quadcopter flight controller (sensing, motor control, power delivery, the whole thing), then wrote the firmware to actually fly it. Spent an embarrassing amount of time on IMU noise characterization. It now flies stably in 6-DOF, which felt like magic the first time and still kind of does.',
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
        { src: 'images/blot.JPG', alt: 'Hackathon organization' },
        { src: 'images/P1050057.JPG', alt: 'More hackathon photos', fit: 'wide' },
        ],
        sections: [
            {
                heading: '',
                body: "Ran PCB workshops at Amazon HQ and FUTO, taught generative art with JavaScript and CNC machines to people who had never touched hardware before. Also did logistics for BigRed//Hacks, Cornell's annual hackathon.",
            },
            {
                heading: 'Links',
                body: 'More about Days of Service: https://daysofservice.hackclub.com/',            },
        ],
    },
    // Gallery: .MOV in <video> works best in Safari; Chrome/Firefox often need H.264 .mp4. For widest support use
    // { type: 'embed', src: 'https://www.youtube.com/embed/VIDEO_ID', ... } with an unlisted upload, or transcode (e.g. ffmpeg).
    // YouTube: chromeless IFrame API (tap video to play). Use youtubeShowControls: true for native YouTube UI.
    'concert-archive': {
        title: 'Photo_booth.EXE',
        sections: [
            {
                heading: '',
                body: 'A running archive capturing the concerts I\'ve gone to!',
            },
        ],

        gallery: [
            { type: 'image', src: 'images/concerts/100_1272.JPG', alt: 'concert' },
            // { type: 'video', src: 'images/concerts/100_1273.MOV', alt: 'Show clip', caption: ' ' },
            { type: 'image', src: 'images/concerts/100_1304.JPG', alt: 'Concert' },
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
            win.classList.remove('is-maximized');
            win.classList.add('is-minimized');
        }
    });

    target.classList.add('is-maximized');
    target.style.top = '0px';
    target.style.left = '0px';
    target.style.right = 'auto';
    target.style.bottom = 'auto';
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
    if (useSingleWindowMobileMode()) {
        // Mobile keeps one tab active at all times.
        restoreWindow(win);
        return;
    }
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
    if (useSingleWindowMobileMode()) {
        win.classList.add('is-maximized');
        updateLauncherState();
        return;
    }
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
        if (useSingleWindowMobileMode()) return;
        bringToFront(win);
        setActiveLauncher(win);
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
    const panel = modal?.querySelector('.project-modal__panel');
    if (!data || !modal || !titleEl || !bodyEl) return;

    if (panel) {
        if (data.gallery && data.gallery.length > 0) panel.classList.add('project-modal__panel--gallery');
        else panel.classList.remove('project-modal__panel--gallery');
    }

    titleEl.textContent = data.title;
    const sectionsHtml = data.sections.map(renderProjectSection).join('');
    const mediaHtml =
        data.gallery && data.gallery.length > 0 ? renderProjectGalleryBlock() : renderProjectImageBlock(data);
    bodyEl.innerHTML = sectionsHtml + mediaHtml;

    if (data.gallery && data.gallery.length > 0) {
        const galleryRoot = bodyEl.querySelector('.project-modal__gallery');
        if (galleryRoot) wireProjectGallery(modal, galleryRoot, data.gallery);
    }

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

/**
 * Normalize watch/short URLs to /embed/ and ensure YouTube can verify the embed (Error 153 fix).
 * @param {string} src
 * @returns {string}
 */
function normalizeYouTubeEmbedSrc(src) {
    if (!src || typeof src !== 'string') return src;
    try {
        const u = new URL(src.trim(), window.location.href);
        const host = u.hostname.replace(/^www\./, '');
        if (host === 'youtu.be' && u.pathname.length > 1) {
            const id = u.pathname.slice(1).split(/[/?#]/)[0];
            if (id) return `https://www.youtube.com/embed/${id}`;
        }
        if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
            if (u.pathname.startsWith('/embed/')) {
                return u.toString();
            }
            if (u.pathname === '/watch' && u.searchParams.get('v')) {
                return `https://www.youtube.com/embed/${u.searchParams.get('v')}`;
            }
            if (u.pathname.startsWith('/shorts/')) {
                const id = u.pathname.replace('/shorts/', '').split(/[/?#]/)[0];
                if (id) return `https://www.youtube.com/embed/${id}`;
            }
        }
    } catch (_) {
        /* keep original */
    }
    return src;
}

/**
 * Apply YouTube iframe parameters. By default hides most on-player chrome (controls=0).
 * Set youtubeShowControls: true on the gallery item for the normal YouTube UI.
 * Autoplay requires mute=1 in modern browsers.
 * @param {string} url
 * @param {ProjectGalleryItem} item
 * @returns {string}
 */
function applyYouTubeEmbedParams(url, item) {
    const base = normalizeYouTubeEmbedSrc(url);
    let u;
    try {
        u = new URL(base);
    } catch {
        return base;
    }
    const host = u.hostname.replace(/^www\./, '');
    if (host !== 'youtube.com' && host !== 'youtube-nocookie.com') {
        return base;
    }
    if (!u.pathname.startsWith('/embed/')) {
        return base;
    }

    const showControls = item.youtubeShowControls === true;
    if (!showControls) {
        u.searchParams.set('controls', '0');
        u.searchParams.set('modestbranding', '1');
        u.searchParams.set('playsinline', '1');
        u.searchParams.set('rel', '0');
        u.searchParams.set('iv_load_policy', '3');
    }

    if (item.youtubeAutoplay === true) {
        u.searchParams.set('autoplay', '1');
        u.searchParams.set('mute', '1');
    }

    const idMatch = u.pathname.match(/^\/embed\/([^/?]+)/);
    const videoId = idMatch ? idMatch[1] : null;
    if (item.youtubeLoop === true && videoId) {
        u.searchParams.set('loop', '1');
        u.searchParams.set('playlist', videoId);
    }

    return u.toString();
}

/** @param {string} src */
function extractYouTubeVideoIdFromSrc(src) {
    const norm = normalizeYouTubeEmbedSrc(src);
    const m = norm.match(/\/embed\/([^/?&]+)/);
    return m ? m[1] : null;
}

let _ytIframeApiPromise = null;

function loadYouTubeIframeAPI() {
    if (typeof window === 'undefined') return Promise.resolve();
    if (window.YT && window.YT.Player) return Promise.resolve();
    if (_ytIframeApiPromise) return _ytIframeApiPromise;
    _ytIframeApiPromise = new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.async = true;
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        const prior = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
            try {
                if (typeof prior === 'function') prior();
            } catch (_) {}
            resolve();
        };
    });
    return _ytIframeApiPromise;
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
        `<button type="button" class="project-modal__gallery-nav project-modal__gallery-nav--prev" data-gallery-prev aria-label="Previous item">‹</button>` +
        `<div class="project-modal__gallery-frame" data-gallery-frame></div>` +
        `<button type="button" class="project-modal__gallery-nav project-modal__gallery-nav--next" data-gallery-next aria-label="Next item">›</button>` +
        `</div>` +
        `<p class="project-modal__gallery-counter" data-gallery-counter></p>` +
        `<p class="project-modal__gallery-caption" data-gallery-caption></p>` +
        `</div></div>`
    );
}

/**
 * @param {HTMLElement} modal
 * @param {HTMLElement} root
 * @param {ProjectGalleryItem[]} items
 */
function wireProjectGallery(modal, root, items) {
    const frame = root.querySelector('[data-gallery-frame]');
    const prev = root.querySelector('[data-gallery-prev]');
    const next = root.querySelector('[data-gallery-next]');
    const counter = root.querySelector('[data-gallery-counter]');
    const captionEl = root.querySelector('[data-gallery-caption]');
    if (!frame || !prev || !next || !counter || !captionEl || items.length === 0) return;

    if (modal._galleryKeydown) {
        document.removeEventListener('keydown', modal._galleryKeydown);
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
        const prevVideo = frame.querySelector('video');
        if (prevVideo) {
            prevVideo.pause();
        }

        frame.innerHTML = '';
        frame.classList.remove('project-modal__gallery-frame--yt');
        const item = items[index];
        if (item.type === 'video') {
            const mat = document.createElement('div');
            mat.className = 'project-modal__gallery-mat';
            const v = document.createElement('video');
            v.className = 'project-modal__gallery-video';
            v.src = item.src;
            v.controls = true;
            v.playsInline = true;
            v.setAttribute('preload', 'metadata');
            if (item.alt) v.setAttribute('aria-label', item.alt);
            mat.appendChild(v);
            frame.appendChild(mat);
        } else if (item.type === 'embed') {
            const videoId = extractYouTubeVideoIdFromSrc(item.src);
            const useChromelessYt = videoId && item.youtubeShowControls !== true;

            if (useChromelessYt) {
                frame.classList.add('project-modal__gallery-frame--yt');
                const hostId = `galleryYtHost_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
                const host = document.createElement('div');
                host.id = hostId;
                host.className = 'project-modal__gallery-yt-host';
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
                const iframe = document.createElement('iframe');
                iframe.className = 'project-modal__gallery-embed';
                iframe.src = applyYouTubeEmbedParams(item.src, item);
                iframe.loading = 'lazy';
                iframe.title = item.alt || 'YouTube video player';
                iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute(
                    'allow',
                    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
                );
                frame.appendChild(iframe);
            }
        } else {
            const mat = document.createElement('div');
            mat.className = 'project-modal__gallery-mat';
            const img = document.createElement('img');
            img.className = 'project-modal__gallery-image';
            img.src = item.src;
            img.alt = item.alt || '';
            img.loading = index === 0 ? 'eager' : 'lazy';
            mat.appendChild(img);
            frame.appendChild(mat);
        }

        counter.textContent = `${index + 1} / ${items.length}`;
        captionEl.textContent = item.caption ? item.caption : '';
        updateNavState();
    }

    function step(delta) {
        const n = items.length;
        const nextIndex = index + delta;
        if (nextIndex < 0 || nextIndex >= n) return;
        index = nextIndex;
        renderSlide();
    }

    prev.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));

    /** @param {KeyboardEvent} e */
    function onKeydown(e) {
        if (modal.hidden) return;
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            step(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            step(1);
        }
    }

    document.addEventListener('keydown', onKeydown);
    modal._galleryKeydown = onKeydown;

    renderSlide();
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
    destroyGalleryYtPlayer(modal);
    if (modal._galleryKeydown) {
        document.removeEventListener('keydown', modal._galleryKeydown);
        delete modal._galleryKeydown;
    }
    modal.querySelector('.project-modal__panel')?.classList.remove('project-modal__panel--gallery');
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
    const statusEl = document.getElementById('spotifyStatusText');
    const artworkEl = document.getElementById('spotifyArtwork');
    const trackEl = document.getElementById('spotifyTrackText');
    const artistEl = document.getElementById('spotifyArtistText');
    const linkEl = document.getElementById('spotifyTrackLink');
    if (!statusEl || !artworkEl || !trackEl || !artistEl) return;

    const NOW_PLAYING_API_URL = '/api/now-playing';
    let refreshTimer = null;
    let hasLoadedAtLeastOnce = false;
    let hasTrackData = false;

    function setStatus(text) {
        statusEl.textContent = text;
    }

    function clearTrack() {
        trackEl.textContent = '';
        artistEl.textContent = '';
        artworkEl.hidden = true;
        if (linkEl) linkEl.hidden = true;
        hasTrackData = false;
    }

    function setTrack(data) {
        trackEl.textContent = data.title || '';
        artistEl.textContent = data.artist || '';

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
            setStatus('Loading now playing...');
        }
        try {
            const res = await fetch(NOW_PLAYING_API_URL);
            const data = await res.json();
            if (!res.ok) {
                const baseMessage = data?.message || 'Could not fetch Spotify status.';
                const rateLimitHint =
                    data?.retryAfterSeconds && Number.isFinite(Number(data.retryAfterSeconds))
                        ? ` Retry in ~${Number(data.retryAfterSeconds)}s.`
                        : '';
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
                const message = data?.message || 'Spotify status unavailable.';
                if (hasTrackData) setStatus(`${message} Showing last known track.`);
                else {
                    setStatus(message);
                    clearTrack();
                }
                hasLoadedAtLeastOnce = true;
                return;
            }
            if (data.title || data.artist || data.albumImageUrl) {
                setStatus(data?.isPlaying ? 'Now playing' : 'Last played');
                setTrack(data);
            } else {
                const message = data?.message || 'No recent Spotify activity.';
                if (hasTrackData) setStatus(`${message} Showing last known track.`);
                else {
                    setStatus(message);
                    clearTrack();
                }
            }
            hasLoadedAtLeastOnce = true;
        } catch (_) {
            if (hasTrackData) setStatus('Network error while contacting Spotify. Showing last known track.');
            else {
                setStatus('Network error while contacting Spotify.');
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
