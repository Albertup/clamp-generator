import React from 'react';

// Component for the "M" shape
export const MmcM = ({ color, className }) => (
  <polygon className={`cls-1 ${className || ''}`} fill={color} points="5.01 5.3 5.01 85 84.71 85 84.71 5.3 44.86 45.15 5.01 5.3"/>
);

// Component for the "A" shape
export const MmcA = ({ color, className }) => (
  <polygon className={`cls-1 ${className || ''}`} fill={color} points="95.13 85 134.98 85 174.83 85 134.98 5.3 95.13 85"/>
);

// Component for the "D" shape
export const MmcD = ({ color, className }) => (
  <path className={`cls-1 ${className || ''}`} fill={color} d="M225.24,5.3h-39.85v79.7h39.85c22.01,0,39.85-17.84,39.85-39.85S247.25,5.3,225.24,5.3Z"/>
);

// Component for the "Moco" part (right-most group)
export const MmcMoco = ({ color, className }) => (
  <g className={className || ''}> {/* Apply className to the group */}
    <path className="cls-1" fill={color} d="M275.05,67.41c0,9.72,7.88,17.59,17.59,17.59h17.59v-35.19h-17.59c-9.72,0-17.59,7.88-17.59,17.59h0Z"/>
    <polygon className="cls-1" fill={color} points="275.05 5.3 275.05 40.49 310.24 40.49 310.24 5.3 292.64 22.89 275.05 5.3"/>
    <circle className="cls-1" fill={color} cx="336.45" cy="22.87" r="17.59"/>
    <circle className="cls-1" fill={color} cx="336.45" cy="67.41" r="17.59"/>
  </g>
);

const Logo = ({ color = '#000000', className = '', ...props }) => (
  <a href="http://www.madmoco.com/" target="_blank" rel="noopener noreferrer" className={className} {...props}>
    <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90">
      <defs>
        {/* The style tag is no longer needed here as fill is applied directly to each component */}
      </defs>
      <MmcM color={color} />
      <MmcA color={color} />
      <MmcD color={color} />
      <MmcMoco color={color} />
    </svg>
  </a>
);

export default Logo;