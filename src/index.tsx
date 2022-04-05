import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import './i18n';
import App from './App'

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

createRoot(container).render(<App/>);
