import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/knowledge-base', label: 'DCS Knowledge Base' },
  { to: '/ask-dcs', label: 'Ask DCS (LLM)' },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden md:flex flex-col w-56 bg-gray-800 text-white h-full">
      <div className="p-4 font-bold text-lg">DCS Companion</div>
      <nav className="flex-1">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`block py-2 px-4 rounded hover:bg-gray-700 ${pathname === link.to ? 'bg-gray-700 font-semibold' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
