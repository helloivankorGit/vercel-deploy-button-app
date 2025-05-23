import React from 'react';
import ReactDOM from 'react-dom';
import { init } from '@contentful/app-sdk';
import { Button, Note } from '@contentful/forma-36-react-components';

const VERCEL_DEPLOY_HOOK_URL = 'https://api.vercel.com/v1/integrations/deploy/prj_xxxx...';

const DeployPage = () => {
  const triggerDeploy = async () => {
    try {
      const res = await fetch(VERCEL_DEPLOY_HOOK_URL, { method: 'POST' });
      alert(res.ok ? '✅ Deploy triggered!' : '❌ Failed to trigger deploy');
    } catch (err) {
      alert('❌ Error: ' + err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Note noteType="primary">Click the button below to trigger a Vercel deploy:</Note>
      <Button buttonType="positive" onClick={triggerDeploy} style={{ marginTop: '1rem' }}>
        🚀 Trigger Vercel Deploy
      </Button>
    </div>
  );
};

if (window.self !== window.top) {
  init((sdk) => {
    if (sdk.location.is('page')) {
      const root = document.getElementById('root');
      if (root) {
        ReactDOM.render(<DeployPage />, root);
      }
    }
  });
}
