import '@testing-library/jest-dom';
import format from '@/lib/formatter/AlbumTitleFormatter';

describe('format', () => {
  it('should expose a function', () => {
    expect(format).toBeDefined();
  });

  it('format given album title with spaces format and return expected output', () => {
    const albumTitle = 'The Dark Side of the Moon';
    const formattedTitle = format(albumTitle);

    expect(formattedTitle).toBe('the-dark-side-of-the-moon');
  });

  it('format given album title with spaces punctuation format and return expected output', () => {
    const albumTitle = "A Grand Don't Come For Free";
    const formattedTitle = format(albumTitle);
    expect(formattedTitle).toBe('a-grand-dont-come-for-free');
  });

  it('format given empty returns empty', () => {
    const albumTitle = '';
    const formattedTitle = format(albumTitle);
    expect(formattedTitle).toBe('');
  });

  it('fomat given title with special chars and spces return expected output', () => {
    const albumTitle = 'The Dark SIDE of The Moon (Remastered)!';
    const formattedTitle = format(albumTitle);
    expect(formattedTitle).toBe('the-dark-side-of-the-moon-remastered');
  });

  it('fomat given title with trademark return expected output', () => {
    const albumTitle = 'Batman™ (Motion Picture Soundtrack)';
    const formattedTitle = format(albumTitle);
    expect(formattedTitle).toBe('batman-motion-picture-soundtrack');
  });
});
