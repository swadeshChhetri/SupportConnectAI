import React from 'react';

interface SharedLayoutProps {
  children: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  return (
    <div style={{ padding: '20px' }}>
      {children}
    </div>
  );
};

export default SharedLayout;
