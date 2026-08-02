import { useState } from "react";
import { useNavigate } from "react-router";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
};

export default function SearchBar({
  placeholder = "Buscar",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const q = query.trim();
    if (q) navigate(`/marketplace?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex items-center gap-2 rounded-full border border-primary-400 bg-transparent px-4 py-2 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4 shrink-0 text-neutral-500"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
      />
    </form>
  );
}
