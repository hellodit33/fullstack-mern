import React, { useState } from "react";
import { useSelector } from "react-redux";

const Search = () => {
  const hintsList = useSelector((state) => state.hintsReducer);

  const [search, setNewSearch] = useState("");

  const handleSearchChange = (e) => {
    e.preventDefault();
    setNewSearch(e.target.value);
  };

  const filtered = !search
    ? hintsList
    : hintsList.filter(
        (hints) =>
          hints.filmTitle.toLowerCase().includes(search.toLowerCase()) ||
          hints.mood.toLowerCase().includes(search.toLowerCase()) ||
          hints.synopsis.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <section className="search">
      <div className="search-hints">
        <input
          type="text"
          className="search"
          value={search}
          placeholder="Find your hint"
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {search && filtered && (
          <div className="hint-list">
            {hintsList &&
              filtered.map((hint) => (
                <div className="hint">
                  <h2 className="hint-title">{hint.filmTitle}</h2>
                  <p className="hint-mood">For when you're into: {hint.mood}</p>
                  <iframe
                    src={hint.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={hint.video}
                  ></iframe>
                  <p className="hint-synopsis">{hint.synopsis}</p>
                  <ul className="hint-platforms">
                    {hint.platforms.map((platforms) => (
                      <>
                        <li className="hint-platform">{platforms}</li>
                      </>
                    ))}
                  </ul>
                </div>
              ))}
            {filtered.length === 0 && (
              <h1 className="filter-error">
                Unfortunately, we can't find anything about "{search}" among our
                hints.
              </h1>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
