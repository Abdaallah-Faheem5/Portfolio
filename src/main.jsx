import { StrictMode, Suspense, lazy, useEffect, useLayoutEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import { PreferencesProvider, usePortfolio } from './context/Preferences.jsx';
import WelcomeIntro from './components/layout/WelcomeIntro.jsx';

// Native links keep browser history, refresh, and opening in a new tab intact.
// Load only the selected page; project pages never initialize the Hero's WebGL.
function PageContent({ component: Component, hash, isProject }) {
  useLayoutEffect(() => {
    // The destination section must exist before restoring a native hash link.
    const target = !isProject && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
    if (!isProject) document.title = homeTitle;
  }, [hash, isProject]);
  return <Component />;
}

const homeTitle = document.title;
const Home = lazy(() => import('./App.jsx'));
const Project = lazy(() => import('./components/sections/ProjectDetails.jsx'));

function Loading() {
  const { t } = usePortfolio();
  return <p role="status">{t('Loading…')}</p>;
}

function Page() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isProject = hash.startsWith('#projects/');
  return <PageContent key={isProject ? hash : 'home'} component={isProject ? Project : Home} hash={hash} isProject={isProject} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreferencesProvider>
    <WelcomeIntro>
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
    </WelcomeIntro>
    </PreferencesProvider>
  </StrictMode>
);
