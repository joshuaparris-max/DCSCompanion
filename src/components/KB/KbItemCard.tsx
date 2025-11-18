import React from 'react';
import { Link } from 'react-router-dom';
import type { KbItem } from '../../services/kbService';

type Props = {
  item: KbItem;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
};

export default function KbItemCard({ item, isFavorite = false, onToggleFavorite }: Props) {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded shadow p-3">
      <button
        aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
        onClick={onToggleFavorite}
        className="absolute right-2 top-2 text-yellow-500 text-lg"
      >
        {isFavorite ? '★' : '☆'}
      </button>
      <Link to={`/kb/${encodeURIComponent(item.type)}/${item.id}`} className="no-underline block">
        <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">{item.title}</div>
        {item.summary && <div className="text-sm text-gray-700 dark:text-gray-300">{item.summary}</div>}
        <div className="text-xs text-gray-400 mt-2">{item.category || item.type}</div>
      </Link>
    </div>
  );
}
