import { StrictMode, Suspense, lazy, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';

// Native links keep browser history, refresh, and opening in a new tab intact.
// Load only the selected page; project pages never initialize the Hero's WebGL.
function PageContent({ component: Component }) {
  useLayoutEffect(() => {
    // The destination section must exist before restoring a native hash link.
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView({ behavior: 'instant' });
  }, []);
  return <Component />;
}

const Page = lazy(async () => {
  const { default: Component } = await (window.location.pathname === '/'
    ? import('./App.jsx')
    : import('./components/sections/ProjectDetails.jsx'));
  return { default: () => <PageContent component={Component} /> };
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<p role="status">Loading…</p>}>
      <Page />
    </Suspense>
  </StrictMode>
);
