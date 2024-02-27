//To run the test with react-testing-library

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app paragraph element', () => {
  render(<App />);
  const paraElement = screen.getByText(/"Hey!, Welcome to my-react-app"./i);
  expect(paraElement).toBeInTheDocument();
}); // this test that our App successfully displays the paragraph element with the text "Hey!, Welcome to my-react-app".
  test('renders app title element', () => {
    render(<App />);
    const titleElement = screen.getByText(/React Post Sharer/i);
    expect(titleElement).toBeInTheDocument(); // this test that our App successfully displays the heading or title element with the text "React Post Sharer".
});

//we can run our test with the command "npm run test".