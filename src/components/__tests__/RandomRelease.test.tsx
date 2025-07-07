import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RandomRelease from '../RandomRelease';
import { Release } from '@/lib/types/Release';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; unoptimized?: boolean; [key: string]: unknown }) => {
    const { unoptimized, ...imgProps } = props;
    return <img {...imgProps} alt={props.alt || ''} />;
  },
}));

const mockRelease: Release = {
  id: 123,
  basic_information: {
    title: 'Test Album',
    year: 2023,
    thumb: 'test-thumb.jpg',
    cover_image: 'test-cover.jpg',
    artists: [{ name: 'Test Artist' }],
    styles: ['Rock', 'Alternative'],
  },
};

const mockCollection = {
  releases: [mockRelease],
};

describe('RandomRelease', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
    
    // Mock Math.random to return predictable values
    jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders "No releases found" when sessionStorage is empty', () => {
    render(<RandomRelease />);
    expect(screen.getByText('No releases found.')).toBeInTheDocument();
  });

  it('renders "No releases found" when collection has no releases', () => {
    sessionStorage.setItem('collection', JSON.stringify({ releases: [] }));
    render(<RandomRelease />);
    expect(screen.getByText('No releases found.')).toBeInTheDocument();
  });

  it('renders image when collection has releases', () => {
    sessionStorage.setItem('collection', JSON.stringify(mockCollection));
    render(<RandomRelease />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-cover.jpg');
    expect(image).toHaveAttribute('alt', 'Test Album');
  });

  it('has correct CSS classes for styling', () => {
    sessionStorage.setItem('collection', JSON.stringify(mockCollection));
    render(<RandomRelease />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveClass('w-full', 'h-full', 'object-cover', 'animate-spin-slow');
  });

  it('selects a random release from multiple releases', () => {
    const multipleReleases = {
      releases: [
        mockRelease,
        {
          id: 456,
          basic_information: {
            title: 'Another Album',
            year: 2024,
            thumb: 'another-thumb.jpg',
            cover_image: 'another-cover.jpg',
            artists: [{ name: 'Another Artist' }],
            styles: ['Jazz'],
          },
        },
      ],
    };

    // Mock Math.random to return 0.5 (should select second item)
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    
    sessionStorage.setItem('collection', JSON.stringify(multipleReleases));
    render(<RandomRelease />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'another-cover.jpg');
    expect(image).toHaveAttribute('alt', 'Another Album');
  });

  it('handles collection without releases key', () => {
    sessionStorage.setItem('collection', JSON.stringify({ other_data: 'test' }));
    render(<RandomRelease />);
    expect(screen.getByText('No releases found.')).toBeInTheDocument();
  });

  it('logs parsed collection to console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    sessionStorage.setItem('collection', JSON.stringify(mockCollection));
    
    render(<RandomRelease />);
    
    expect(consoleSpy).toHaveBeenCalledWith('Parsed collection:', mockCollection);
    consoleSpy.mockRestore();
  });
});
