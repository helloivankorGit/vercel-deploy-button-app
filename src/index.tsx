import React from 'react';
import ReactDOM from 'react-dom';
import { init, locations } from '@contentful/app-sdk';
import { Button, Note } from '@contentful/forma-36-react-components';

const VERCEL_DEPLOY_HOOK_URL = 'https://api.vercel.com/v1/integrations/deploy/prj_ntIToSpEHkZjrqicARSQ2pdocY0i/WgMPsFj5h3';

const DeployButton = () => {
  const handleDeploy = async () => {
    try {
      const res = await fetch(VERCEL_DEPLOY_HOOK_URL, { method: 'POST' });
      alert(res.ok ? '✅ Deploy triggered!' : '❌ Failed to trigger deploy');
    } catch (err) {
      alert('❌ Error: ' + err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Note noteType="primary">This will trigger a full rebuild of your site via Vercel.</Note>
      <Button buttonType="positive" onClick={handleDeploy} style={{ marginTop: '1rem' }}>
        🚀 Trigger Vercel Deploy
      </Button>
    </div>
  );
};

if (window.self !== window.top) {
  init((sdk) => {
    if (sdk.location.is('app-config')) {
      const root = document.getElementById('root');
      if (root) {
        ReactDOM.render(<DeployButton />, root);
      }
    }
  });
}