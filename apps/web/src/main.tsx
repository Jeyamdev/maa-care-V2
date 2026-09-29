import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AssessmentProvider } from './context/AssessmentContext';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(<StrictMode><AssessmentProvider><App /></AssessmentProvider></StrictMode>);
