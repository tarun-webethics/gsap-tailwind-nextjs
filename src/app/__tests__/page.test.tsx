import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mocking GSAP and its plugins
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  to: jest.fn(),
  from: jest.fn(),
  fromTo: jest.fn(),
  set: jest.fn(),
}));

jest.mock('gsap/ScrollTrigger', () => ({
  default: {
    create: jest.fn(),
  },
}));

jest.mock('gsap/ScrollSmoother', () => {
  console.log('ScrollSmoother mock is used');
  return {
    __esModule: true,
    default: {
      create: jest.fn(),
    },
  };
});

jest.mock('@gsap/react', () => ({
  useGSAP: (callback: () => void) => {
    // Mock the behavior of useGSAP, for example, by calling the callback immediately
    React.useEffect(() => {
      callback();
    }, [callback]);
  },
}));


describe('Home component', () => {
  test('renders without crashing', () => {
    render(<Home />);
    // If the component renders without throwing an error, this test will pass.
  });

  test('renders the main heading', () => {
    render(<Home />);
    const headingElement = screen.getByText(/Scroll Down/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the supercar heading', () => {
    render(<Home />);
    const headingElement = screen.getByRole('heading', { name: /This Supercar Might Hit you Hard!/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('renders all images with correct alt text', () => {
    render(<Home />);

    const donutImage = screen.getByAltText('donut');
    expect(donutImage).toBeInTheDocument();

    const carImage = screen.getByAltText('car');
    expect(carImage).toBeInTheDocument();

    const bikeImage = screen.getByAltText('bike');
    expect(bikeImage).toBeInTheDocument();

    const pushpaImage = screen.getByAltText('pushpa');
    expect(pushpaImage).toBeInTheDocument();

    const liquidImage = screen.getByAltText('liquid');
    expect(liquidImage).toBeInTheDocument();
  });

  test('renders the motive text', () => {
    render(<Home />);
    const motiveHeading = screen.getByText(/Adventure begins where comfort ends./i);
    expect(motiveHeading).toBeInTheDocument();

    const motiveParagraph = screen.getByText(/means that the real thrill of life starts when you step outside/i);
    expect(motiveParagraph).toBeInTheDocument();
  });
});
