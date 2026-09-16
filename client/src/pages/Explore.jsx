import { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard";

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

function Explore({ onBack, onOpenSafetyCenter, onOpenDetails }) {
  const [destinations, setDestinations] = useState([]);
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingDestinationId, setSavingDestinationId] = useState(null);

  const token = localStorage.getItem("token");

  /*
    Fetch all destinations and saved destinations
  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const destinationsResponse = await fetch(
          "https://travya.onrender.com/api/destinations"
        );

        if (!destinationsResponse.ok) {
          throw new Error("Unable to load destinations");
        }

        const destinationsData = await destinationsResponse.json();
        setDestinations(destinationsData);

        /*
          Saved destinations require login.
          If the user is not logged in, keep the saved list empty.
        */
        if (token) {
          const savedResponse = await fetch(
            "http://localhost:5000/api/saved",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (savedResponse.ok) {
            const savedData = await savedResponse.json();

            const savedIds = savedData.map(
              (savedDestination) => savedDestination.destinationId
            );

            setSavedDestinations(savedIds);
          }
        }
      } catch (err) {
        console.error("Explore page error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  /*
    Get unique destination categories
  */
  const categories = [
    "All",
    ...new Set(
      destinations
        .map((destination) => destination.category)
        .filter(Boolean)
    ),
  ];

  /*
    Filter destinations by search and category
  */
  const filteredDestinations = destinations.filter((destination) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      destination.name?.toLowerCase().includes(searchText) ||
      destination.country?.toLowerCase().includes(searchText) ||
      destination.description?.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      destination.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  /*
    Save or remove a destination
  */
  const toggleSaveDestination = async (destinationId) => {
    if (!token) {
      alert("Please log in to save destinations.");
      return;
    }

    const destination = destinations.find(
      (item) => item.id === destinationId
    );

    if (!destination) {
      return;
    }

    const isSaved = savedDestinations.includes(destinationId);

    try {
      setSavingDestinationId(destinationId);

      if (isSaved) {
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

        setSavedDestinations((previousSaved) =>
          previousSaved.filter((id) => id !== destinationId)
        );
      } else {
        const response = await fetch(
          "https://travya.onrender.com/api/saved",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              destinationId: destination.id,
              destinationName: destination.name,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Unable to save destination");
        }

        setSavedDestinations((previousSaved) => [
          ...previousSaved,
          destinationId,
        ]);
      }
    } catch (err) {
      console.error("Save destination error:", err);
      alert(err.message || "Something went wrong");
    } finally {
      setSavingDestinationId(null);
    }
  };

  return (
    <main className="explore-page">
      <section className="explore-header">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back home
        </button>

        <p className="explore-eyebrow">DISCOVER YOUR NEXT JOURNEY</p>

        <h1>
          Find places
          <span> worth exploring.</span>
        </h1>

        <p className="explore-description">
          Discover beautiful destinations and learn how to travel there with
          greater confidence.
        </p>
      </section>

      <section className="explore-controls">
        <div className="explore-search-wrapper">
          <span className="explore-search-icon">⌕</span>

          <input
            type="text"
            className="explore-search-input"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="explore-category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="explore-content">
        {loading && (
          <div className="explore-message">
            Loading destinations...
          </div>
        )}

        {!loading && error && (
          <div className="explore-message error">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="explore-results-heading">
              <div>
                <p className="explore-results-eyebrow">
                  CURATED FOR YOU
                </p>

                <h2>Explore destinations</h2>
              </div>

              <span className="explore-results-count">
                {filteredDestinations.length} places
              </span>
            </div>

            {filteredDestinations.length > 0 ? (
              <div className="destination-grid">
                {filteredDestinations.map((destination, index) => {
                  const isSaved = savedDestinations.includes(
                    destination.id
                  );

                  return (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                      index={index}
                      isSaved={isSaved}
                      isSaving={savingDestinationId === destination.id}
                      onToggleSave={toggleSaveDestination}
                      onOpenSafetyCenter={onOpenSafetyCenter}
                      onOpenDetails={onOpenDetails}
                      imageUrl={
                        destinationImages[destination.name] || fallbackImage
                      }
                      fallbackImage={fallbackImage}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="no-destinations">
                <div className="no-destinations-icon">⌕</div>

                <h3>No destinations found</h3>

                <p>
                  Try changing your search or category filter.
                </p>

                <button
                  type="button"
                  className="clear-filters-button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Explore;