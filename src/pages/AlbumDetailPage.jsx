import { Link } from "react-router-dom";

function AlbumCard({ album, onAddToCart }) {
  return (
    <div className="album-card">
      {/* Album Cover */}
      <Link to={`/album/${album.id}`} className="album-link">
        <img
          src={album.image}
          alt={`${album.title} album cover`}
          className="album-image"
        />

        {/* Album Information */}
        <div className="album-info">
          <span className="album-genre">{album.genre}</span>

          <h3>{album.title}</h3>

          <p className="album-artist">{album.artist}</p>
        </div>
      </Link>

      {/* Price and Add to Cart */}
      <div className="album-bottom">
        <span className="album-price">${album.price.toFixed(2)}</span>

        <button
          type="button"
          className="add-button"
          onClick={() => onAddToCart(album)}
          disabled={album.stock === 0}
        >
          {album.stock > 0 ? "Add to Cart +" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}

export default AlbumCard;
