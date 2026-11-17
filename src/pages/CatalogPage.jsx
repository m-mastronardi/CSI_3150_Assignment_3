import { useState } from "react";
import AlbumCard from "../components/AlbumCard";
import { ALBUMS } from "../data/albums";

function CatalogPage({ onAddToCart }) {
  // Keep track of the selected genre
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Available genre filters
  const genres = ["All", "Jazz", "Electronic", "Rock", "Classical"];

  // Filter albums based on selected genre
  const filteredAlbums =
    selectedGenre === "All"
      ? ALBUMS
      : ALBUMS.filter((album) => album.genre === selectedGenre);

  return (
    <main className="catalog-page">
      {/* Store Introduction */}
      <section className="catalog-hero">
        <p className="hero-label">WELCOME TO VINYLVAULT</p>

        <h1>Find Your Next Favorite Record.</h1>

        <p className="hero-description">
          From timeless classics to unforgettable sounds, explore our collection
          of vinyl records and discover something worth listening to.
        </p>
      </section>

      {/* Album Collection */}
      <section className="catalog-section">
        <div className="catalog-heading">
          <div>
            <h2>Browse Our Collection</h2>

            <p>Showing {filteredAlbums.length} records</p>
          </div>
        </div>

        {/* Genre Filter Buttons */}
        <div className="genre-filters">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              className={
                selectedGenre === genre ? "genre-button active" : "genre-button"
              }
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Album Grid */}
        <div className="album-grid">
          {filteredAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CatalogPage;
