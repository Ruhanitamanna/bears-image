import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const url = "https://api.punkapi.com/v2/beers";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => console.log("error", error));
  }, []);
  console.log(data);
  const handleSearch = () => {
    const filtered = filteredData.filter((beer) =>
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="bg-black text-center py-2">
      <div className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered input-primary w-full"
          placeholder="Search..."
        />
        <button onClick={handleSearch} className="btn btn-primary ml-2">
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5  p-6">
        {filteredData.map((d) => (
          <div key={d.id} className="  card  glass">
            <figure>
              <img src={d.image_url} alt="car!" />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
