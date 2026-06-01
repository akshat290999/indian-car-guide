import { render, screen, fireEvent } from '@testing-library/react';
import GalleryViewer from './GalleryViewer';

const EXTERIOR = [
  { colorName: 'Radiant Red Metallic', src: '/images/red.jpg',   alt: 'City in red' },
  { colorName: 'Crystal Black Pearl',  src: '/images/black.jpg', alt: 'City in black' },
  { colorName: 'Obsidian Blue Pearl',  src: '/images/blue.jpg',  alt: 'City in blue' },
];

const INTERIOR = [
  { label: 'Dashboard', src: '/images/dash.jpg', alt: 'Dashboard' },
];

describe('GalleryViewer', () => {
  it('renders the hero image for the first exterior colour', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR} />);
    // Hero + thumbnail both render the same alt — confirm at least one exists
    const imgs = screen.getAllByAltText('City in red');
    expect(imgs.length).toBeGreaterThan(0);
    expect(imgs[0]).toBeInTheDocument();
  });

  it('shows the colour name badge for the active image', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR} selectedColor="Radiant Red Metallic" />);
    expect(screen.getByText('Radiant Red Metallic')).toBeInTheDocument();
  });

  it('renders prev/next arrows when there are multiple images', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR} />);
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });

  it('next arrow advances to the second image', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR} />);
    fireEvent.click(screen.getByLabelText('Next image'));
    // The colour-name badge updates synchronously; heroAlt is delayed by the
    // 160 ms cross-fade timer so we assert the badge, not the hero alt.
    expect(screen.getByText('Crystal Black Pearl')).toBeInTheDocument();
  });

  it('prev arrow wraps from the first image to the last', () => {
    render(<GalleryViewer exteriorImages={EXTERIOR} />);
    fireEvent.click(screen.getByLabelText('Previous image'));
    expect(screen.getByText('Obsidian Blue Pearl')).toBeInTheDocument();
  });

  it('shows Exterior/Interior tabs only when interior images are provided', () => {
    const { rerender } = render(<GalleryViewer exteriorImages={EXTERIOR} />);
    expect(screen.queryByText(/EXTERIOR/i)).not.toBeInTheDocument();

    rerender(<GalleryViewer exteriorImages={EXTERIOR} interiorImages={INTERIOR} />);
    expect(screen.getByText(/EXTERIOR/i)).toBeInTheDocument();
    expect(screen.getByText(/INTERIOR/i)).toBeInTheDocument();
  });

  it('does not render arrows when only one image is provided', () => {
    render(<GalleryViewer exteriorImages={[EXTERIOR[0]]} />);
    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument();
  });

  it('calls onColorSelect with the correct colour name when navigating via arrow', () => {
    const onColorSelect = vi.fn();
    render(<GalleryViewer exteriorImages={EXTERIOR} onColorSelect={onColorSelect} />);
    // v3 removed the thumbnail strip; onColorSelect fires via arrow navigation
    // when the landed image has a colorName.
    fireEvent.click(screen.getByLabelText('Next image'));
    expect(onColorSelect).toHaveBeenCalledWith('Crystal Black Pearl');
  });
});
