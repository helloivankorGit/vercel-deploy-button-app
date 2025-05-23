import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { init } from '@contentful/app-sdk';
import {
  Button,
  Note,
  Paragraph
} from '@contentful/forma-36-react-components';

const VERCEL_DEPLOY_HOOK_URL =
  'https://api.vercel.com/v1/integrations/deploy/prj_ntIToSpEHkZjrqicARSQ2pdocY0i/WgMPsFj5h3'; // Replace with your actual URL

const DeployPage = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(VERCEL_DEPLOY_HOOK_URL, { method: 'POST' });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }

    // Reset status after 3 seconds
    setTimeout(() => {
      setStatus('idle');
      setLoading(false);
    }, 3000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px' }}>
      <Note noteType="primary">
        Click the button below to trigger a Vercel deploy.
      </Note>

      <Button
        buttonType="positive"
        onClick={handleClick}
        disabled={loading}
        style={{ marginTop: '1rem' }}
      >
        🚀 {loading ? 'Deploying...' : 'Trigger Deploy'}
      </Button>

      {status === 'success' && (
        <Paragraph style={{ color: 'green', marginTop: '1rem' }}>
          ✅ Deploy triggered successfully!
        </Paragraph>
      )}

      {status === 'error' && (
        <Paragraph style={{ color: 'red', marginTop: '1rem' }}>
          ❌ Failed to trigger deploy.
        </Paragraph>
      )}
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
