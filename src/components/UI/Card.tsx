import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
