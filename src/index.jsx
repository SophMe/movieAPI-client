import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

// bundle this:
import "./index.scss";

// show main component
const MovieAPIApp = () => {
  return <MainView />;
};

// find app root
const container = document.querySelector("#root");
const root = createRoot(container);

// render app in the root DOM element
root.render(<MovieAPIApp/>);