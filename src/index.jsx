import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

import Container from 'react-bootstrap/Container';

// bundle this:
import "./index.scss";

// show main component
const MovieAPIApp = () => {
  return (
    <Container>
        <MainView />
    </Container>
  );
};

// find app root
const container = document.querySelector("#root");
const root = createRoot(container);

// render app in the root DOM element
root.render(<MovieAPIApp/>);