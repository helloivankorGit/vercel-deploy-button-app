import React from 'react';
import ReactDOM from 'react-dom';
import { init, locations } from '@contentful/app-sdk';
import { Button, Note } from '@contentful/forma-36-react-components';

const VERCEL_DEPLOY_HOOK_URL = 'https://api.vercel.com/v1/integrations/deploy/prj_ntIToSpEHkZjrqicARSQ2pdocY0i/WgMPsFj5h3';

const DeployButton = () => {
  const handleDeploy = async () => {
    try {
      const res = await fetch(VERCEL_DEPLOY_HOOK_URL, { method: 'POST' });
      if (res.ok) {
        alert('✅ Deploy triggered successfully!');
      } else {
        alert('❌ Failed to trigger deploy.');
      }
    } catch (err) {
      alert('❌ Error: ' + err);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Note noteType="primary">Trigger a Vercel rebuild after publishing content.</Note>
      <Button buttonType="positive" onClick={handleDeploy} style={{ marginTop: '1rem' }}>
        🚀 Trigger Deploy
      </Button>
    </div>
  );
};

init((sdk) => {
  if (sdk.location.is(locations.LOCATION_SIDEBAR)) {
    const root = document.getElementById('root')!;
    ReactDOM.render(<DeployButton />, root);
  }
});
