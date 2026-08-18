import React from 'react';
import '../styles/landing.css';

const GlassCard = ({ children, className = '', style = {}, ...props }) => {
  return (
    <div className={`glass-card ${className}`} style={style} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
