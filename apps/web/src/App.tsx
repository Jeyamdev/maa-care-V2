import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAssessment } from './context/AssessmentContext';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import About from './pages/About';
import { reference } from './components/Content';

// Only fixed public route names ever enter browser history. Assessment state stays in React.
const paths = ['/', '/guide', '/assessment', '/results', '/about'] as const;
type Route = typeof paths[number];
const readRoute = (): Route | 'missing' => paths.includes(window.location.pathname as Route) ? window.location.pathname as Route : 'missing';
export default function App() {
  const [route, setRoute] = useState(readRoute);
  const { state, dispatch } = useAssessment();
  const main = useRef<HTMLElement>(null);
  function navigate(next: Route, replace = false) {
    if (next === '/') dispatch({ type: 'clear' });
    if (next === route) { main.current?.focus(); return; }
    window.history[replace ? 'replaceState' : 'pushState'](null, '', next);
    setRoute(next);
  }
  function start() { dispatch({ type: 'clear' }); navigate('/guide'); }
  useEffect(() => {
    const pop = () => { const next = readRoute(); if (next === '/') dispatch({ type: 'clear' }); setRoute(next); };
    window.addEventListener('popstate', pop);
    // Clear when leaving the document so back-forward cache cannot revive an assessment.
    const clear = () => dispatch({ type: 'clear' });
    window.addEventListener('pagehide', clear);
    const restore = (event: PageTransitionEvent) => { if (event.persisted) clear(); };
    window.addEventListener('pageshow', restore);
    return () => { window.removeEventListener('popstate', pop); window.removeEventListener('pagehide', clear); window.removeEventListener('pageshow', restore); };
  }, [dispatch]);
  useLayoutEffect(() => {
    const titles = { '/': 'முகப்பு', '/guide': 'மதிப்பீட்டு வழிகாட்டி', '/assessment': 'மதிப்பீடு', '/results': 'மதிப்பீட்டு முடிவு', '/about': 'மதிப்பீட்டுக் கருவி பற்றி', missing: 'பக்கம் கிடைக்கவில்லை' };
    document.title = `Maa Care · ${titles[route]}`;
    if (route !== '/assessment') main.current?.focus();
    window.scrollTo(0, 0);
  }, [route]);
  return <><a className="skip-link" href="#main">உள்ளடக்கத்திற்குச் செல்</a><header className="site-header"><div className="header-inner"><a className="brand" href="/" onClick={event => { event.preventDefault(); navigate('/'); }} aria-label="Maa Care முகப்பு"><img src="/images/maa-care-mark.png" alt="" /><span>Maa Care</span></a><nav aria-label="முதன்மை வழிசெலுத்தல்"><a href="/" aria-current={route === '/' ? 'page' : undefined} onClick={event => { event.preventDefault(); navigate('/'); }}>முகப்பு</a><a href="/about" aria-current={route === '/about' ? 'page' : undefined} onClick={event => { event.preventDefault(); navigate('/about'); }}>பற்றி</a></nav></div></header><main id="main" ref={main} tabIndex={-1}>
    {route === '/' && <Home start={start} />}
    {route === '/guide' && <Guide begin={() => { dispatch({ type: 'clear' }); navigate('/assessment'); }} />}
    {route === '/assessment' && (state.complete ? <Results restart={start} home={() => navigate('/')} /> : <Assessment finish={() => navigate('/results', true)} />)}
    {route === '/results' && <Results restart={start} home={() => navigate('/')} />}
    {route === '/about' && <About />}
    {route === 'missing' && <div className="reading empty"><h1>பக்கம் கிடைக்கவில்லை</h1><button className="button" onClick={() => navigate('/')}>முகப்புக்குச் செல்</button></div>}
  </main><footer className="site-footer"><div><span className="footer-brand">Maa Care</span><p>அக்கறையுடன், உங்கள் நலனுக்காக.</p></div><p className="reference" lang="en">{reference}</p></footer></>;
}
