import '@testing-library/jest-dom';

// jsdom doesn't implement scrollIntoView — stub it so thumbnail-strip
// auto-scroll in GalleryViewer doesn't throw during tests.
window.HTMLElement.prototype.scrollIntoView = vi.fn();
