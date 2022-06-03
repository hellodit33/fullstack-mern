import React, { useState } from "react";
import { useSelector } from "react-redux";

const Search = () => {
  //redux gets the hints state
  const hintsList = useSelector((state) => state.hintsReducer);

  //search is first empty, and used as a condition for showing hints
  const [search, setNewSearch] = useState("");

  /**
   *
   * @desc when the user writes the search value changes into the input value
   */
  const handleSearchChange = (e) => {
    e.preventDefault();
    setNewSearch(e.target.value);
  };

  /**
   * @desc filters the hints based on the searched word
   */
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
        {/*show hints only when searching after a specific word */}
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
            {
              /* shows to the user that there is no hint result for the searched words */ filtered.length ===
                0 && (
                <h1 className="filter-error">
                  Unfortunately, we can't find anything about "{search}" among
                  our hints.
                </h1>
              )
            }
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
