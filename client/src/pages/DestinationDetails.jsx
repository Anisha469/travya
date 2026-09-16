import { useEffect, useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85";

const destinationImages = {
  Manali:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",

  Goa:
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85",

  Jaipur:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85",

  Rishikesh:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85",
};

function DestinationDetails({ destination, onBack }) {
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /*
    Check whether this destination is already saved
  */
  useEffect(() => {
    const checkSavedStatus = async () => {
      setImageError(false);
      setIsSaved(false);

      const token = localStorage.getItem("token");

      if (!token || !destination) {
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/saved",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const savedDestinations = await response.json();

        if (!Array.isArray(savedDestinations)) {
          return;
        }

        const alreadySaved = savedDestinations.some(
          (item) =>
            String(item.destinationId) === String(destination.id)
        );

        setIsSaved(alreadySaved);
      } catch (error) {
        console.error("Check saved status error:", error);
      }
    };

    checkSavedStatus();
  }, [destination]);

  /*
    Save or remove the current destination
  */
  const handleToggleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to save destinations.");
      return;
    }

    if (!destination || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        isSaved
          ? `https://travya.onrender.com/api/saved/${destination.id}`
          : "https://travya.onrender.com/api/saved",
        {
          method: isSaved ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          ...(!isSaved && {
            body: JSON.stringify({
              destinationId: destination.id,
              destinationName: destination.name,
            }),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update saved destination");
      }

      setIsSaved((previousValue) => !previousValue);
    } catch (error) {
      console.error("Save destination error:", error);
      alert("Unable to update saved destination.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!destination) {
    return (
      <main className="destination-details-page">
        <div className="destination-details-empty">
          <h2>Destination not found</h2>

          <button
            type="button"
            className="primary-button"
            onClick={onBack}
          >
            Back to explore
          </button>
        </div>
      </main>
    );
  }

  const imageUrl =
    destinationImages[destination.name] || fallbackImage;

  const safetyTips = [
    "Keep your important documents and valuables secure.",
    "Share your travel plans with someone you trust.",
    "Check local weather and transportation conditions before travelling.",
    "Respect local customs, rules, and restricted areas.",
  ];

  return (
    <main className="destination-details-page">
      <section className="destination-details-hero">
        <img
          src={imageError ? fallbackImage : imageUrl}
          alt={`${destination.name} destination`}
          className="destination-details-image"
          onError={() => setImageError(true)}
        />

        <div className="destination-details-overlay"></div>

        <div className="destination-details-hero-content">
          <button
            type="button"
            className="destination-details-back-button"
            onClick={onBack}
          >
            ← Back to explore
          </button>

          <div className="destination-details-hero-bottom">
            <p className="destination-details-category">
              {destination.category || "DESTINATION"}
            </p>

            <h1>{destination.name}</h1>

            <p className="destination-details-location">
              ⌖ {destination.country || "India"}
            </p>
          </div>
        </div>
      </section>

      <section className="destination-details-content">
        <div className="destination-details-main">
          <div className="destination-details-heading">
            <div>
              <p className="destination-details-eyebrow">
                ABOUT THIS PLACE
              </p>

              <h2>
                Your next
                <span> unforgettable journey.</span>
              </h2>
            </div>

            <button
              type="button"
              className={
                isSaved
                  ? "details-save-button saved"
                  : "details-save-button"
              }
              onClick={handleToggleSave}
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : isSaved
                ? "♥ Saved"
                : "♡ Save place"}
            </button>
          </div>

          <p className="destination-details-description">
            {destination.description ||
              `Discover the beauty, culture, and experiences of ${destination.name}. Plan thoughtfully and enjoy your journey with confidence.`}
          </p>

          <div className="destination-details-info-grid">
            <div className="destination-details-info-card">
              <span className="destination-info-icon">✦</span>

              <h3>Travel thoughtfully</h3>

              <p>
                Prepare before travelling and stay aware of your surroundings.
              </p>
            </div>

            <div className="destination-details-info-card">
              <span className="destination-info-icon">⌖</span>

              <h3>Local experience</h3>

              <p>
                Respect local communities and discover the destination
                responsibly.
              </p>
            </div>

            <div className="destination-details-info-card">
              <span className="destination-info-icon">♢</span>

              <h3>Stay prepared</h3>

              <p>
                Keep emergency contacts, documents, and essentials accessible.
              </p>
            </div>
          </div>
        </div>

        <aside className="destination-details-safety-card">
          <div className="destination-safety-card-top">
            <span className="destination-safety-card-icon">✓</span>

            <p>TRAVEL SAFETY</p>
          </div>

          <h2>Prepare before you go.</h2>

          <p className="destination-safety-card-description">
            A few simple habits can help make your journey safer and more
            comfortable.
          </p>

          <div className="destination-safety-tips">
            {safetyTips.map((tip, index) => (
              <div
                className="destination-safety-tip"
                key={index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>

                <p>{tip}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

export default DestinationDetails;