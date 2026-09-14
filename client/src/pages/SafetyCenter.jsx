import { useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85";

function SafetyCenter({ destination, onBack }) {
  const [completedItems, setCompletedItems] = useState([]);

  /*
    Show a safe message if no destination has been selected
  */
  if (!destination) {
    return (
      <main className="safety-page">
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
        >
          ← Back to explore
        </button>

        <div className="safety-empty-state">
          <h1>Select a destination first</h1>

          <p>
            Choose a destination from Explore to view its safety
            information and emergency resources.
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
      </main>
    );
  }

  const safety = destination.safety;

  const checklist = safety?.checklist || [];
  const risks = safety?.risks || [];
  const tips = safety?.tips || [];
  const emergencyContacts = safety?.emergency || [];

  const toggleChecklistItem = (index) => {
    setCompletedItems((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const resetChecklist = () => {
    setCompletedItems([]);
  };

  const completedCount = completedItems.length;
  const totalItems = checklist.length;
  const isComplete =
    totalItems > 0 && completedCount === totalItems;

  return (
    <main className="safety-page">
      <button
        type="button"
        className="back-btn"
        onClick={onBack}
      >
        ← Back to explore
      </button>

      <div className="safety-header">
        <span className="section-label">
          TRAVYA SAFETY CENTER
        </span>

        <h1>
          Travel prepared.
          <br />
          <span>Travel confidently.</span>
        </h1>

        <p>
          Important information and practical resources for your journey
          to <strong>{destination.name}</strong>.
        </p>
      </div>

      {/* Destination Overview */}
      <section className="safety-overview">
        <div className="safety-overview-image">
          <img
            src={destination.image || fallbackImage}
            alt={`${destination.name} destination`}
            onError={(event) => {
              event.currentTarget.src = fallbackImage;
            }}
          />
        </div>

        <div className="safety-overview-content">
          <div className="safety-location">
            {destination.name}, {destination.country}
          </div>

          <h2>{safety?.status || "Safety information"}</h2>

          <p>
            {safety?.summary ||
              "Review the available safety information before travelling."}
          </p>

          <div className="safety-score-row">
            <div className="score-circle">
              <strong>{safety?.score ?? "—"}</strong>
              <span>/100</span>
            </div>

            <div>
              <strong>Safety readiness score</strong>
              <p>
                Based on available destination information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risks and Tips */}
      <div className="safety-columns">
        <section className="safety-info-card">
          <div className="safety-card-heading">
            <div className="feature-icon orange">⚠️</div>

            <div>
              <h3>Things to be aware of</h3>
              <p>Potential risks to keep in mind</p>
            </div>
          </div>

          {risks.length > 0 ? (
            <ul className="safety-list risk-list">
              {risks.map((risk, index) => (
                <li key={`${risk}-${index}`}>{risk}</li>
              ))}
            </ul>
          ) : (
            <p className="safety-no-data">
              No specific risks are available yet.
            </p>
          )}
        </section>

        <section className="safety-info-card">
          <div className="safety-card-heading">
            <div className="feature-icon green">✓</div>

            <div>
              <h3>Travel smart</h3>
              <p>Simple steps for a safer journey</p>
            </div>
          </div>

          {tips.length > 0 ? (
            <ul className="safety-list tip-list">
              {tips.map((tip, index) => (
                <li key={`${tip}-${index}`}>{tip}</li>
              ))}
            </ul>
          ) : (
            <p className="safety-no-data">
              No travel tips are available yet.
            </p>
          )}
        </section>
      </div>

      {/* Emergency Resources */}
      <section className="emergency-section">
        <div className="section-heading">
          <span className="section-label">
            IMPORTANT CONTACTS
          </span>

          <h2>Emergency resources</h2>

          <p>
            Keep these numbers accessible during your journey.
          </p>
        </div>

        {emergencyContacts.length > 0 ? (
          <div className="emergency-grid">
            {emergencyContacts.map((contact, index) => (
              <div
                className="emergency-card"
                key={`${contact.name}-${index}`}
              >
                <div className="emergency-icon">☎</div>

                <div>
                  <span>{contact.name}</span>
                  <strong>{contact.number}</strong>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="safety-no-data">
            No emergency contacts are available yet.
          </p>
        )}
      </section>

      {/* Checklist */}
      <section className="checklist-section">
        <div className="checklist-header">
          <div>
            <span className="section-label">
              BEFORE YOU GO
            </span>

            <h2>Your safety checklist</h2>

            <p>
              Complete these steps before starting your journey.
            </p>
          </div>

          <div className="checklist-progress">
            <strong>
              {completedCount}/{totalItems}
            </strong>

            <span>completed</span>
          </div>
        </div>

        {checklist.length > 0 ? (
          <div className="checklist">
            {checklist.map((item, index) => (
              <label
                className="checklist-item"
                key={`${item}-${index}`}
              >
                <input
                  type="checkbox"
                  checked={completedItems.includes(index)}
                  onChange={() => toggleChecklistItem(index)}
                />

                <span
                  className={
                    completedItems.includes(index)
                      ? "checked-text"
                      : ""
                  }
                >
                  {item}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <p className="safety-no-data">
            No checklist items are available yet.
          </p>
        )}

        <div className="checklist-actions">
          {isComplete && (
            <p className="checklist-success">
              ✓ You’re all set! Your safety checklist is complete.
            </p>
          )}

          {completedCount > 0 && (
            <button
              type="button"
              className="reset-btn"
              onClick={resetChecklist}
            >
              Reset checklist
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default SafetyCenter;
