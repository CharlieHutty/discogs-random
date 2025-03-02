import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../app/page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading');
    const paragraph = screen.getByText('Hello, world!');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('Hello, world!');
  });
});
