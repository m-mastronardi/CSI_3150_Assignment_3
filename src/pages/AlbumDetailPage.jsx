import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ALBUMS } from "../data/albums";

function AlbumDetailPage({ onAddToCart }) {
  const { albumId } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Find the selected album using its ID
  const album = ALBUMS.find((item) => item.id === albumId);

  // Display a message if the album doesn't exist
  if (!album) {
    return (
      <main className="detail-page">
        <h2>Album Not Found</h2>
        <p>Sorry, we couldn't find that record.</p>
        <Link to="/" className="back-link">
          Back to Catalog
        </Link>
      </main>
    );
  }

  // Increase quantity without exceeding stock
  function increaseQuantity() {
    if (quantity < album.stock) {
      setQuantity(quantity + 1);
    }
  }

  // Decrease quantity without going below 1
  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  // Add selected quantity to cart
  function handleAddToCart() {
    onAddToCart(album, quantity);
  }

  return (
    <main className="detail-page">
      {/* Back to Catalog */}
      <Link to="/" className="back-link">
        ← Back to Collection
      </Link>

      <div className="detail-container">
        {/* Album Cover */}
        <div className="detail-image-container">
          <img
            src={album.image}
            alt={`${album.title} album cover`}
            className="detail-image"
          />
        </div>

        {/* Album Information */}
        <div className="detail-info">
          <span className="detail-genre">{album.genre}</span>

          <h1>{album.title}</h1>

          <h2 className="detail-artist">{album.artist}</h2>

          <p className="detail-price">${album.price.toFixed(2)}</p>

          <p className="detail-description">{album.description}</p>

          {/* Stock Availability */}
          <p className="stock-status">
            {album.stock > 0
              ? `${album.stock} records in stock`
              : "Currently Sold Out"}
          </p>

          {/* Quantity Selector */}
          <div className="quantity-section">
            <h3>Quantity</h3>

            <div className="quantity-controls">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={quantity >= album.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            className="detail-add-button"
            onClick={handleAddToCart}
            disabled={album.stock === 0}
          >
            {album.stock > 0 ? "Add to Cart" : "Sold Out"}
          </button>

          {/* Vinyl Specifications */}
          <div className="album-specs">
            <h3>Vinyl Specifications</h3>

            <div className="spec-row">
              <span>Catalog Number</span>
              <strong>{album.specs.catalogNumber}</strong>
            </div>

            <div className="spec-row">
              <span>Pressing Weight</span>
              <strong>{album.specs.weight}</strong>
            </div>

            <div className="spec-row">
              <span>Playback Speed</span>
              <strong>{album.specs.speed}</strong>
            </div>

            <div className="spec-row">
              <span>Record Label</span>
              <strong>{album.specs.label}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tracklist */}
      <section className="tracklist-section">
        <h2>Tracklist</h2>

        <ol className="tracklist">
          {album.tracklist.map((track, index) => (
            <li key={index}>{track}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}

export default AlbumDetailPage;
