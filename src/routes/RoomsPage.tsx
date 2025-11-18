import React, { useState } from 'react';
import { dcsRooms } from '../data/dcsRooms';

const RoomsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredRooms = dcsRooms.filter(room => {
    return (
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.building.toLowerCase().includes(search.toLowerCase()) ||
      room.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Rooms & Map</h1>
      <input
        type="text"
        placeholder="Search rooms..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <ul className="space-y-2">
        {filteredRooms.map(room => (
          <li key={room.id} className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <p>Building: {room.building}</p>
            <p>Floor: {room.floor}</p>
            <p>Equipment: {room.equipment.join(', ')}</p>
            <p>Notes: {room.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsPage;