import { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard";

function SavedPlaces({
  onBack,
  onOpenSafetyCenter,
  onOpenDetails,
}) {
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedDestinations = async () => {
    try {
      const token = localStorage.getItem("token");

      const savedResponse = await fetch(
        "http://localhost:5000/api/saved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!savedResponse.ok) {
        throw new Error("Unable to fetch saved destinations");
      }

      const savedData = await savedResponse.json();

      const destinationsResponse = await fetch(
        "http://localhost:5000/api/destinations"
      );

      if (!destinationsResponse.ok) {
        throw new Error("Unable to fetch destinations");
      }

      const destinationsData = await destinationsResponse.json();

      const savedIds = savedData.map((item) =>
        String(item.destinationId)
      );

      const matchingDestinations = destinationsData.filter((destination) =>
        savedIds.includes(String(destination.id))
      );

      setSavedDestinations(matchingDestinations);
    } catch (error) {
      console.error("Saved places error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedDestinations();
  }, []);

  const handleRemoveSaved = async (destinationId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/saved/${destinationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to remove destination");
      }

      setSavedDestinations((previousDestinations) =>
        previousDestinations.filter(
          (destination) =>
            String(destination.id) !== String(destinationId)
        )
      );
    } catch (error) {
      console.error("Remove saved destination error:", error);
      alert("Unable to remove saved destination.");
    }
  };

  return (
    <main className="saved-places-page">
      <section className="saved-places-header">
        <div>
          <p className="saved-places-eyebrow">YOUR COLLECTION</p>

          <h1>
            Saved
            <span> places.</span>
          </h1>

          <p>
            Keep the destinations you love close for your next journey.
          </p>
        </div>

        <button
          type="button"
          className="saved-places-back-button"
          onClick={onBack}
        >
          ← Explore destinations
        </button>
      </section>

      {loading ? (
        <div className="saved-places-message">
          <p>Loading your saved places...</p>
        </div>
      ) : savedDestinations.length === 0 ? (
        <div className="saved-places-empty">
          <div className="saved-places-empty-icon">♡</div>

          <h2>No saved places yet</h2>

          <p>
            Explore destinations and save the places you would like to
            visit later.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={onBack}
          >
            Explore destinations
            <span>↗</span>
          </button>
        </div>
      ) : (
        <section className="saved-places-grid">
          {savedDestinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              isSaved={true}
              onToggleSave={handleRemoveSaved}
              onOpenSafetyCenter={onOpenSafetyCenter}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default SavedPlaces;