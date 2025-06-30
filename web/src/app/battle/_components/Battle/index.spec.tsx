import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useMutation } from '@apollo/client';
import Battle from './index';

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn(),
}));

const mockYourStarship = {
  id: '1',
  crew: 10,
  score: 5,
  name: 'mine',
};

const mockOpponentsStarship = {
  id: '2',
  crew: 8,
  score: 3,
  name: 'opponent',
};

describe('Battle Component', () => {
  let mockUpdateScore: jest.Mock;

  beforeEach(() => {
    mockUpdateScore = jest
      .fn()
      .mockResolvedValue({ data: { updateScore: {} } });
    (useMutation as jest.Mock).mockReturnValue([mockUpdateScore]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders starship cards and battle VS text', () => {
    render(
      <Battle
        yourStarship={mockYourStarship}
        opponentsStarship={mockOpponentsStarship}
      />
    );
    expect(screen.getByRole('heading', { name: 'Battle' })).toBeInTheDocument();
    expect(screen.getByText('VS')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Battle!!!' })
    ).toBeInTheDocument();
  });

  it('calls updateScore mutation after clicking Battle button', async () => {
    render(
      <Battle
        yourStarship={mockYourStarship}
        opponentsStarship={mockOpponentsStarship}
      />
    );

    const button = screen.getByRole('button', { name: 'Battle!!!' });
    fireEvent.click(button);

    expect(mockUpdateScore).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Battle!!!' })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Next Battle' })
      ).toBeInTheDocument();
    });
  });

  it('resets battle state when Next Battle link is clicked', async () => {
    render(
      <Battle
        yourStarship={mockYourStarship}
        opponentsStarship={mockOpponentsStarship}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Battle!!!' }));

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: 'Next Battle' })
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('link', { name: 'Next Battle' }));

    expect(
      screen.getByRole('button', { name: 'Battle!!!' })
    ).toBeInTheDocument();
  });
});
