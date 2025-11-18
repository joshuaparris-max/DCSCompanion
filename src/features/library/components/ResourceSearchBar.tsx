
interface Props {
  query: string;
  setQuery: (q: string) => void;
}

export default function ResourceSearchBar({ query, setQuery }: Props) {
  return (
    <input
      className="input mb-2"
      placeholder="Search by title, author, or barcode"
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}
