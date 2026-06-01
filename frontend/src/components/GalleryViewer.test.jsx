import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import GalleryViewer from './GalleryViewer';

// ─── Fixtures ─────────────────────────────────────────────────────────────────
const EXTERIOR_FLIPPED = [
  { colorName: 'Everest White',  src: '/images/thar-white.jpg',  alt: 'Thar white',  flip: true  },
  { colorName: 'Stealth Black',  src: '/images/thar-black.jpg',  alt: 'Thar black',  flip: true  },
  { colorName: 'Tango Red',      src: '/images/thar-red.jpg',    alt: 'Thar red',    flip: true  },
];

const EXTERIOR_NORMAL = [
  { colorName: 'Lunar Silver Metallic', src: '/images/city-silver.jpg', alt: 'City silver', flip: false },
  { colorName: 'Crystal Black Pearl',   src: '/images/city-black.jpg',  alt: 'City black',  flip: false },
  { colorName: 'Obsidian Blue Pearl',   src: '/images/city-blue.jpg',   alt: 'City blue',   flip: false },
];

const INTERIOR = [
  { label: 'Dashboard', src: '/images/dash.jpg', alt: 'Interior dashboard' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function heroImg() {
  // The hero is the first img rendered (the lightbox img only appears when open)
  return screen.getAllByRole('img')[0];
}

// ─── Existing navigation & tab tests ─────────────────────────────────────────
describe('GalleryViewer — navigation', () => {
  it('renders the hero image for the first exterior colour', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR_NORMAL} />);
    const imgs = screen.getAllByAltText('City silver');
    expect(imgs.length).toBeGreaterThan(0);
    expect(imgs[0]).toBeInTheDocument();
  });

  it('shows the colour name badge for the active image', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR_NORMAL} selectedColor="Lunar Silver Metallic" />);
    expect(screen.getByText('Lunar Silver Metallic')).toBeInTheDocument();
  });

  it('renders prev/next arrows when there are multiple images', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR_NORMAL} />);
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });

  it('next arrow advances to the second image (badge is synchronous)', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR_NORMAL} />);
    fireEvent.click(screen.getByLabelText('Next image'));
    expect(screen.getByText('Crystal Black Pearl')).toBeInTheDocument();
  });

  it('prev arrow wraps from the first image to the last', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR_NORMAL} />);
    fireEvent.click(screen.getByLabelText('Previous image'));
    expect(screen.getByText('Obsidian Blue Pearl')).toBeInTheDocument();
  });

  it('shows Exterior/Interior tabs only when interior images are provided', () => {
    const { rerender } = render(<GalleryViewer exteriorImages={EXTERIOR_NORMAL} />);
    expect(screen.queryByText(/EXTERIOR/i)).not.toBeInTheDocument();

    rerender(<GalleryViewer exteriorImages={EXTERIOR_NORMAL} interiorImages={INTERIOR} />);
    expect(screen.getByText(/EXTERIOR/i)).toBeInTheDocument();
    expect(screen.getByText(/INTERIOR/i)).toBeInTheDocument();
  });

  it('does not render arrows when only one image is provided', () => {
    render(<GalleryViewer exteriorImages={[EXTERIOR_NORMAL[0]]} />);
    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument();
  });

  it('calls onColorSelect with the correct colour name when navigating via arrow', () => {
    const onColorSelect = vi.fn();
    render(<GalleryViewer exteriorImages={EXTERIOR_NORMAL} onColorSelect={onColorSelect} />);
    fireEvent.click(screen.getByLabelText('Next image'));
    expect(onColorSelect).toHaveBeenCalledWith('Crystal Black Pearl');
  });
});

// ─── Flip / orientation tests ─────────────────────────────────────────────────
describe('GalleryViewer — flip orientation', () => {

  it('applies scaleX(-1) on initial render when first image has flip:true', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR_FLIPPED} />);
    // heroFlip is initialised synchronously from tabImages[0].flip
    expect(heroImg()).toHaveStyle({ transform: 'scaleX(-1)' });
  });

  it('applies no transform on initial render when first image has flip:false', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR_NORMAL} />);
    expect(heroImg()).toHaveStyle({ transform: 'none' });
  });

  // heroFlip is now a synchronous derived value (not delayed state), so all
  // orientation assertions are instant — no fake timers needed.

  it('keeps scaleX(-1) when navigating between images that all have flip:true', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR_FLIPPED} />);
    fireEvent.click(screen.getByLabelText('Next image'));
    expect(screen.getByText('Stealth Black')).toBeInTheDocument();
    expect(heroImg()).toHaveStyle({ transform: 'scaleX(-1)' });
  });

  it('removes transform when navigating from a flipped image to a non-flipped one', () => {
    const mixed = [
      { colorName: 'Flipped',   src: '/images/flip.jpg',   alt: 'Flipped car',   flip: true  },
      { colorName: 'Unflipped', src: '/images/noflip.jpg', alt: 'Unflipped car', flip: false },
    ];
    render(<GalleryViewer exteriorImages={mixed} />);
    expect(heroImg()).toHaveStyle({ transform: 'scaleX(-1)' });

    fireEvent.click(screen.getByLabelText('Next image'));
    // Flip updates synchronously — no timer needed
    expect(heroImg()).toHaveStyle({ transform: 'none' });
  });

  it('does NOT flip interior images even when exterior images have flip:true', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR_FLIPPED} interiorImages={INTERIOR} />);
    expect(heroImg()).toHaveStyle({ transform: 'scaleX(-1)' });

    fireEvent.click(screen.getByText(/^INTERIOR/i));
    // Interior images have no flip field → heroFlip = false immediately
    expect(heroImg()).toHaveStyle({ transform: 'none' });
  });

  it('does NOT flip interior images shown inside the ALL tab', () => {
    // ALL tab: [...exteriorImages, ...interiorImages] — interior starts at index 3
    render(<GalleryViewer exteriorImages={EXTERIOR_FLIPPED} interiorImages={INTERIOR} />);

    // Click Next 3 times to step past all 3 exterior images
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByLabelText('Next image'));
    }

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(heroImg()).toHaveStyle({ transform: 'none' });
  });

  it('restores flip instantly when switching back from INTERIOR to EXTERIOR tab', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR_FLIPPED} interiorImages={INTERIOR} />);

    fireEvent.click(screen.getByText(/^INTERIOR/i));
    expect(heroImg()).toHaveStyle({ transform: 'none' });

    fireEvent.click(screen.getByText(/^EXTERIOR/i));
    expect(heroImg()).toHaveStyle({ transform: 'scaleX(-1)' });
  });
});
