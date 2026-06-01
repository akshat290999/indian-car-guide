import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * GalleryViewer v3
 *
 * Props:
 *   exteriorImages  [{colorName, src, alt}]   — one entry per color
 *   interiorImages  [{label, src, alt}]        — optional
 *   selectedColor   string                     — controlled by parent
 *   onColorSelect   (colorName) => void
 *   C               object                     — design token map
 */
export default function GalleryViewer({
  exteriorImages = [],
  interiorImages = [],
  selectedColor,
  onColorSelect,
  C = {},
}) {
  const NAVY  = C.navy  || '#0A192F';
  const INTER = C.inter || 'system-ui';
  const MUTED = C.muted || '#5A7A9A';

  const hasInterior = interiorImages.length > 0;

  // ── View filter: 'all' | 'exterior' | 'interior' ────────────────────────────
  const [viewFilter, setViewFilter] = useState('all');

  // Computed image list for the active filter
  const tabImages =
    viewFilter === 'exterior' ? exteriorImages
    : viewFilter === 'interior' ? interiorImages
    : [...exteriorImages, ...interiorImages];   // 'all' — exterior first, then interior

  // ── Active index within the current filtered list ────────────────────────────
  const [activeIdx, setActiveIdx] = useState(0);

  // Reset index whenever the filter changes — prevents out-of-bounds
  useEffect(() => { setActiveIdx(0); }, [viewFilter]);

  // Keep in sync when parent's selectedColor changes (exterior + all modes)
  useEffect(() => {
    if (viewFilter === 'interior' || !selectedColor) return;
    const idx = exteriorImages.findIndex((img) => img.colorName === selectedColor);
    if (idx !== -1 && idx !== activeIdx) setActiveIdx(idx);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, viewFilter]);

  // ── Cross-fade ───────────────────────────────────────────────────────────────
  const targetImg = tabImages[activeIdx] ?? null;
  const [heroSrc, setHeroSrc] = useState(targetImg?.src ?? null);
  const [heroAlt, setHeroAlt] = useState(targetImg?.alt ?? '');
  const [visible, setVisible] = useState(true);
  const fadeTimer = useRef(null);

  useEffect(() => {
    const newSrc = targetImg?.src;
    if (!newSrc) return;
    if (newSrc === heroSrc) { setVisible(true); return; }
    clearTimeout(fadeTimer.current);
    setVisible(false);
    fadeTimer.current = setTimeout(() => {
      setHeroSrc(newSrc);
      setHeroAlt(targetImg?.alt ?? '');
      setVisible(true);
    }, 160);
    return () => clearTimeout(fadeTimer.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetImg?.src]);

  // ── Thumb / arrow click ───────────────────────────────────────────────────────
  function handleThumbClick(idx) {
    setActiveIdx(idx);
    // Only fire color callback for exterior-type images
    if (viewFilter !== 'interior' && onColorSelect) {
      const img = tabImages[idx];
      if (img?.colorName) onColorSelect(img.colorName);
    }
  }

  function handlePrev(e) {
    e.stopPropagation();
    handleThumbClick((activeIdx - 1 + tabImages.length) % tabImages.length);
  }
  function handleNext(e) {
    e.stopPropagation();
    handleThumbClick((activeIdx + 1) % tabImages.length);
  }

  // ── Lightbox ──────────────────────────────────────────────────────────────────
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const openLightbox  = () => { if (heroSrc) setLightboxOpen(true); };
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, closeLightbox]);

  // ── Black-car horizontal flip ─────────────────────────────────────────────────
  // Some black car assets face the opposite direction; flip them via CSS instead
  // of touching the source files.
  const isBlack = Boolean(
    heroSrc?.toLowerCase().includes('black') ||
    heroAlt?.toLowerCase().includes('black')
  );

  // In 'all' mode, interior images have a label but no colorName — fall through to label
  const activeLabel = viewFilter === 'interior'
    ? (targetImg?.label    || 'Interior')
    : (targetImg?.colorName || targetImg?.label || 'Exterior');

  // ── Tab bar config ────────────────────────────────────────────────────────────
  const TABS = [
    { key: 'all',      label: `ALL (${exteriorImages.length + interiorImages.length})` },
    { key: 'exterior', label: `EXTERIOR (${exteriorImages.length})` },
    { key: 'interior', label: `INTERIOR (${interiorImages.length})` },
  ];

  return (
    <div style={{ width: '100%' }}>

      {/* ── Tab bar (only when interior images exist) ──────────────────────── */}
      {hasInterior && (
        <div style={{
          display: 'flex',
          backgroundColor: '#EAEFF5',
          borderRadius: '10px',
          padding: '3px',
          marginBottom: '12px',
          gap: 0,
        }}>
          {TABS.map(({ key, label }) => {
            const active = viewFilter === key;
            return (
              <button
                key={key}
                onClick={() => setViewFilter(key)}
                style={{
                  flex: 1,
                  padding: '9px 0',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: active ? '#fff' : 'transparent',
                  color: active ? NAVY : MUTED,
                  fontFamily: INTER,
                  fontSize: '11px',
                  fontWeight: active ? '700' : '500',
                  letterSpacing: '0.8px',
                  boxShadow: active ? '0 1px 4px rgba(10,25,47,0.13)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Hero image ───────────────────────────────────────────────────────── */}
      <div
        onClick={openLightbox}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          minHeight: '220px',
          maxHeight: '340px',
          borderRadius: '14px',
          overflow: 'hidden',
          backgroundColor: '#F3F5F8',
          boxShadow: '0 4px 20px rgba(10,25,47,0.09)',
          cursor: heroSrc ? 'zoom-in' : 'default',
        }}
      >
        {heroSrc ? (
          <img
            src={heroSrc}
            alt={heroAlt}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '10px',
              display: 'block',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.18s ease',
              transform: isBlack ? 'scaleX(-1)' : 'none',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '13px', color: MUTED }}>No image available</span>
          </div>
        )}

        {/* Color / label badge — top-left */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          padding: '3px 10px', borderRadius: '20px',
          backgroundColor: 'rgba(10,25,47,0.72)',
          color: '#fff', fontSize: '10px', fontWeight: '700',
          letterSpacing: '0.6px', textTransform: 'uppercase',
          fontFamily: INTER, pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
        }}>
          {activeLabel}
        </div>

        {/* Zoom hint — bottom-right */}
        {heroSrc && (
          <div style={{
            position: 'absolute', bottom: '10px', right: '10px',
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '4px 9px', borderRadius: '6px',
            backgroundColor: 'rgba(0,0,0,0.42)',
            color: '#fff', fontSize: '10px', fontWeight: '600',
            fontFamily: INTER, pointerEvents: 'none',
            backdropFilter: 'blur(4px)',
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            Expand
          </div>
        )}

        {/* ── Prev / Next arrows ──────────────────────────────────────────── */}
        {tabImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              style={{
                position: 'absolute', left: '8px', top: '50%',
                transform: 'translateY(-50%)', zIndex: 5,
                width: '36px', height: '36px', borderRadius: '50%',
                border: 'none', cursor: 'pointer',
                backgroundColor: 'rgba(10,25,47,0.52)',
                color: '#fff', fontSize: '22px', lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'system-ui', backdropFilter: 'blur(4px)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(10,25,47,0.82)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(10,25,47,0.52)'; }}
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              style={{
                position: 'absolute', right: '8px', top: '50%',
                transform: 'translateY(-50%)', zIndex: 5,
                width: '36px', height: '36px', borderRadius: '50%',
                border: 'none', cursor: 'pointer',
                backgroundColor: 'rgba(10,25,47,0.52)',
                color: '#fff', fontSize: '22px', lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'system-ui', backdropFilter: 'blur(4px)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(10,25,47,0.82)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(10,25,47,0.52)'; }}
            >
              ›
            </button>
          </>
        )}
      </div>
      {/* Thumbnail strip removed — arrows + color swatches handle navigation */}

      {/* ── Lightbox overlay ─────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(5,10,20,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Close × — absolute top-right */}
          <button
            onClick={closeLightbox}
            aria-label="Close"
            style={{
              position: 'absolute', top: '16px', right: '20px',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: '#fff', fontSize: '22px', lineHeight: 1,
              cursor: 'pointer', borderRadius: '50%',
              width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'system-ui',
              transition: 'background 0.15s',
              zIndex: 1,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          >
            ×
          </button>

          {/* Label — top-left */}
          <div style={{
            position: 'absolute', top: '22px', left: '24px',
            color: 'rgba(255,255,255,0.75)', fontSize: '12px',
            fontFamily: INTER, fontWeight: '600', letterSpacing: '0.5px',
            textTransform: 'uppercase', zIndex: 1,
          }}>
            {activeLabel}
          </div>

          {/* Hint — bottom-centre */}
          <div style={{
            position: 'absolute', bottom: '18px', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: INTER, zIndex: 1,
          }}>
            Press Esc or click outside to close
          </div>

          {/* Full-res image — fills the viewport frame */}
          <img
            src={heroSrc}
            alt={heroAlt}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '95vw',
              height: '100%',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '10px',
              boxShadow: '0 16px 60px rgba(0,0,0,0.6)',
              transform: isBlack ? 'scaleX(-1)' : 'none',
            }}
          />
        </div>
      )}
    </div>
  );
}
