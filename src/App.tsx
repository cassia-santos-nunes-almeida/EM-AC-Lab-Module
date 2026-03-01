import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { Layout } from './components/layout/Layout';

const Overview = lazy(() => import('./components/modules/Overview').then(m => ({ default: m.Overview })));
const ComponentPhysics = lazy(() => import('./components/modules/ComponentPhysics').then(m => ({ default: m.ComponentPhysics })));
const TimeDomain = lazy(() => import('./components/modules/TimeDomain').then(m => ({ default: m.TimeDomain })));
const LaplaceTheory = lazy(() => import('./components/modules/LaplaceTheory').then(m => ({ default: m.LaplaceTheory })));
const SDomainAnalysis = lazy(() => import('./components/modules/SDomainAnalysis').then(m => ({ default: m.SDomainAnalysis })));
const InteractiveLab = lazy(() => import('./components/modules/InteractiveLab').then(m => ({ default: m.InteractiveLab })));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-engineering-blue-200 dark:border-engineering-blue-800 border-t-engineering-blue-600 dark:border-t-engineering-blue-400 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router basename={import.meta.env.BASE_URL}>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/component-physics" element={<ComponentPhysics />} />
              <Route path="/circuit-analysis" element={<TimeDomain />} />
              <Route path="/laplace-theory" element={<LaplaceTheory />} />
              <Route path="/s-domain" element={<SDomainAnalysis />} />
              <Route path="/interactive-lab" element={<InteractiveLab />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
      <Analytics />
    </ErrorBoundary>
  );
}

export default App;
