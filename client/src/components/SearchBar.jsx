import { Search } from "lucide-react";
function SearchBar(props) {
  
  return (
    <div className="search-wrapper">
    <Search />
    <input className="search-bar"
      type="text"
      value={props.searchTerm}
      onChange={(e) => props.setSearchTerm(e.target.value)}
      placeholder="Sök recept eller ingrediens..."
    />
    </div>
  );
}

export default SearchBar;
