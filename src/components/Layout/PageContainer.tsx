import React from 'react';

interface PageContainerProps {
  title?: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => (
  <div className="max-w-5xl mx-auto space-y-4">
    {title && <h1 className="text-2xl font-semibold mb-4">{title}</h1>}
    {children}
  </div>
);

export default PageContainer;
