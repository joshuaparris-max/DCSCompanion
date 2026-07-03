import React from 'react';

const Home: React.FC = () => {
  const links = [
    { name: 'Sentral', url: 'https://sentral.example.com' },
    { name: 'Email / O365 / Teams', url: 'https://office.example.com' },
    { name: 'Library System', url: 'https://library.example.com' },
    { name: 'ICT Helpdesk Portal', url: 'https://helpdesk.example.com' },
    { name: 'DCS Website', url: 'https://dcs.example.com' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;