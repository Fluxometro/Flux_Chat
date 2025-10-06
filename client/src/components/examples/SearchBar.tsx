import { useState } from 'react';
import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  const [search, setSearch] = useState('');

  return (
    <div className="w-96 bg-background p-4">
      <SearchBar value={search} onChange={setSearch} />
    </div>
  );
}
