import React from 'react';
import ReactDOM from 'react-dom';
import { init } from '@contentful/app-sdk';

console.log('🟡 Starting app');

const App = () => <div style={{ padding: '2rem' }}>✅ Hello from app-config!</div>;

if (window.self !== window.top) {
  init((sdk) => {
    console.log('✅ SDK initialized', sdk.location);
    const root = document.getElementById('root');
    if (root) {
      ReactDOM.render(<App />, root);
    }
  });
} else {
  console.warn('❌ Not inside iframe');
}
