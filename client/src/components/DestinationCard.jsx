const fallbackImage =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85";

const destinationImages = {
  Manali:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",

  Goa:
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",

  Jaipur:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85",

  Rishikesh:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
};

function DestinationCard({
  destination,
  index,
  isSaved,
  onToggleSave,
  onOpenSafetyCenter,
  onOpenDetails,
  imageUrl,
  fallbackImage: providedFallbackImage,
  isSaving,
}) {
  const finalFallbackImage =
    providedFallbackImage || fallbackImage;

  const finalImageUrl =
    imageUrl ||
    destinationImages[destination.name] ||
    finalFallbackImage;

  const handleImageError = (event) => {
    if (event.currentTarget.src !== finalFallbackImage) {
      event.currentTarget.src = finalFallbackImage;
    }
  };

  return (
    <article
      className={`destination-card ${
        index === 0 ? "destination-card-featured" : ""
      }`}
    >
      <div
        className="destination-card-image"
        onClick={() => onOpenDetails(destination)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            onOpenDetails(destination);
          }
        }}
      >
        <img
          src={finalImageUrl}
          alt={`${destination.name} destination`}
          className="destination-real-image"
          onError={handleImageError}
        />

        <div className="destination-image-overlay"></div>

        <div className="destination-card-top">
          <span className="destination-number">
            {String(index + 1).padStart(2, "0")}
          </span>

          <button
            type="button"
            className={
              isSaved
                ? "save-destination-button saved"
                : "save-destination-button"
            }
            onClick={(event) => {
              event.stopPropagation();
              onToggleSave(destination.id);
            }}
            disabled={isSaving}
            aria-label={
              isSaved
                ? `Remove ${destination.name} from saved destinations`
                : `Save ${destination.name}`
            }
          >
            {isSaving ? "…" : isSaved ? "♥" : "♡"}
          </button>
        </div>

        <div className="destination-image-text">
          <p>{destination.category || "DESTINATION"}</p>
          <h2>{destination.name}</h2>
        </div>
      </div>

      <div className="destination-card-content">
        <div className="destination-location">
          <span>⌖</span>
          {destination.country || "Unknown location"}
        </div>

        <p className="destination-description">
          {destination.description ||
            "Discover this beautiful destination and prepare for a safer journey."}
        </p>

        <div className="destination-card-footer">
          <button
            type="button"
            className="destination-safety-button"
            onClick={() => onOpenSafetyCenter(destination.id)}
          >
            View safety
            <span>↗</span>
          </button>

          <button
            type="button"
            className="destination-details-button"
            onClick={() => onOpenDetails(destination)}
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;