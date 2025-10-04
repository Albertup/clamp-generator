import { useState, useMemo } from 'react';
import Logo from './components/Logo';
import './App.css';

// --- Helper Functions ---

const parseUnit = (value) => {
  if (typeof value !== 'string') return [parseFloat(value), undefined];
  const match = value.match(/^(-?[0-9.]+)(px|rem|em|%|vw|vh)?/);
  if (!match) return [parseFloat(value), undefined];
  return [parseFloat(match[1]), match[2]];
};

const toFixed = (value) => parseFloat(value.toFixed(4));

// --- Main Calculation Logic ---

const clampBuilder = (options) => {
  const { minFontSize, maxFontSize, minWidth, maxWidth, root } = options;
  if ([minFontSize, maxFontSize, minWidth, maxWidth, root].some((v) => !v)) {
    return '';
  }

  const rootVal = parseInt(root, 10);

  const convertToRem = (value) => {
    const [num, unit] = parseUnit(value);
    if (unit === 'rem') return parseFloat(num);
    return toFixed(parseFloat(num) / rootVal);
  };

  const minFontSizeRem = convertToRem(minFontSize);
  const maxFontSizeRem = convertToRem(maxFontSize);
  const minWidthRem = convertToRem(minWidth);
  const maxWidthRem = convertToRem(maxWidth);

  if ([minFontSizeRem, maxFontSizeRem, minWidthRem, maxWidthRem].some(isNaN)) {
    return '';
  }

  const slope = (maxFontSizeRem - minFontSizeRem) / (maxWidthRem - minWidthRem);
  const yAxisIntersection = toFixed(-minWidthRem * slope + minFontSizeRem);

  const min = `${minFontSizeRem}rem`;
  const max = `${maxFontSizeRem}rem`;
  const preferred = `${yAxisIntersection}rem + ${toFixed(slope * 100)}vw`;

  return `clamp(${min}, ${preferred}, ${max})`;
};

// --- Components ---

const UnitInput = ({ label, value, onChange }) => {
  const [number, unit] = parseUnit(value);

  const handleValueChange = (e) => {
    const newNumber = e.target.value;
    onChange(`${newNumber}${unit}`);
  };

  const handleUnitChange = (newUnit) => {
    onChange(`${number}${newUnit}`);
  };

  return (
    <div className="FlexBlock">
      <label>{label}</label>
      <div className="InputWithUnit">
        <input type="text" value={number} onChange={handleValueChange} />
        <div className="UnitToggle">
          <button
            className={unit === 'px' ? 'active' : ''}
            onClick={() => handleUnitChange('px')}
          >
            px
          </button>
          <button
            className={unit === 'rem' ? 'active' : ''}
            onClick={() => handleUnitChange('rem')}
          >
            rem
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [config, setConfig] = useState({
    minWidth: '320px',
    maxWidth: '1240px',
    minFontSize: '16px',
    maxFontSize: '54px',
  });
  const [isCopied, setIsCopied] = useState(false);
  const [resultUnit, setResultUnit] = useState('rem');
  const rootFontSize = 16; // Hardcoded as per original project

  const handleChange = (prop, value) => {
    setConfig((conf) => ({ ...conf, [prop]: value }));
  };

  const clampValueRem = useMemo(() => clampBuilder({ ...config, root: rootFontSize }), [config]);

  const clampValuePx = useMemo(() => {
    if (!clampValueRem) return '';
    const remValues = clampValueRem.match(/-?[0-9.]+(?=rem)/g);
    if (!remValues) return clampValueRem;

    const [min, preferred, max] = remValues.map(rem => `${toFixed(parseFloat(rem) * rootFontSize)}px`);
    const vwPart = clampValueRem.match(/-?[0-9.]+(?=vw)/g);

    return `clamp(${min}, ${preferred} + ${vwPart}vw, ${max})`;
  }, [clampValueRem]);

  const handleCopy = () => {
    const valueToCopy = resultUnit === 'rem' ? clampValueRem : clampValuePx;
    if (valueToCopy) {
      navigator.clipboard.writeText(valueToCopy);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };


  return (
    <>
      <main className="App">
        <Logo className="App-logo" />
        <div className="Settings">
          <div class="Header">
            <h1 className="Title">Madmoco Clamp Generator</h1>
          </div>
          <p className="Subtitle">Generate responsive CSS clamp() functions for fluid typography and spacing.</p>

          <div className="SettingsRow">
            <UnitInput
              label="Min viewport width"
              value={config.minWidth}
              onChange={(value) => handleChange('minWidth', value)}
            />
            <UnitInput
              label="Max viewport width"
              value={config.maxWidth}
              onChange={(value) => handleChange('maxWidth', value)}
            />
          </div>
          <div className="SettingsRow">
            <UnitInput
              label="Min font-size"
              value={config.minFontSize}
              onChange={(value) => handleChange('minFontSize', value)}
            />
            <UnitInput
              label="Max font-size"
              value={config.maxFontSize}
              onChange={(value) => handleChange('maxFontSize', value)}
            />
          </div>
          <div className="ResultHeader">
            <h2 className="ResultTitle">Result</h2>
            <div className="UnitToggle">
                <button className={resultUnit === 'px' ? 'active' : ''} onClick={() => setResultUnit('px')}>px</button>
                <button className={resultUnit === 'rem' ? 'active' : ''} onClick={() => setResultUnit('rem')}>rem</button>
            </div>
          </div>
          <div className="Code">
            <code>{resultUnit === 'rem' ? clampValueRem : clampValuePx}</code>
            <button className="CopyButton" onClick={handleCopy} aria-label="Copy clamp value to clipboard">
              {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </main>
      <footer className="Footer">
        <a
          href="https://github.com/Madmoco/clamp-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387 0.599 0.111 0.793-0.261 0.793-0.577v-2.234c-3.338 0.726-4.033-1.416-4.033-1.416-0.546-1.387-1.333-1.756-1.333-1.756-1.089-0.745 0.083-0.729 0.083-0.729 1.205 0.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.493 0.998 0.108-0.776 0.418-1.305 0.762-1.604-2.665-0.305-5.467-1.334-5.467-5.931 0-1.311 0.469-2.381 1.236-3.221-0.124-0.303-0.535-1.524 0.118-3.176 0 0 1.008-0.322 3.301 1.23 0.957-0.266 1.983-0.399 3.003-0.399 1.02 0 2.047 0.133 3.004 0.399 2.291-1.552 3.297-1.23 3.297-1.23 0.653 1.653 0.242 2.874 0.118 3.176 0.77 0.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921 0.43 0.372 0.823 1.102 0.823 2.222v3.293c0 0.319 0.192 0.694 0.801 0.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </footer>
    </>
  );
}

export default App;