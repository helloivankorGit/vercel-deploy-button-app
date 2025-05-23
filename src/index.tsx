import React from 'react';
import ReactDOM from 'react-dom';
import { init } from '@contentful/app-sdk';

const App = () => {
  return <div style={{ padding: '2rem' }}>✅ Vercel Deploy App Loaded</div>;
};

if (window.self !== window.top) {
  init((sdk) => {
    if (sdk.location.is('app-config')) {
      const root = document.getElementById('root');
      if (root) {
        ReactDOM.render(<App />, root);
      }
    }
  });
}
