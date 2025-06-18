import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    render(<Spinner />);
    expect(document.querySelector('.bg-black.rounded-full')).toBeInTheDocument();
    expect(document.querySelector('.bg-red-500.rounded-full')).toBeInTheDocument();
  });

  it('has aria-label set to "Loading"', () => {
        render(<Spinner />);
        expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    });
});
