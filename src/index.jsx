import {createRoot} from 'react-dom/client';

// bundle this:
import "./index.scss";

// main component
const MovieAPIApp = () => {
  return (
    <div className="movieAPI">
      <div>Good morning</div>
    </div>
  );
};

// find app root
const container = document.querySelector("#root");
const root = createRoot(container);

// render app in the root DOM element
root.render(<MovieAPIApp/>);