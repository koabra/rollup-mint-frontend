//This is from where our app content come from

import logo from './logo.svg';
import Posts from './component/Posts'; // to display the fetched posts components , import it.
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          "Hey!, Welcome to my-react-app".
        </p>
        <h1>React Post Sharer</h1>
      </header>
      <Posts/>
    </div>
  );
}

export default App;
