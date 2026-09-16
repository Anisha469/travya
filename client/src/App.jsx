import { useState } from "react";

import Explore from "./pages/Explore";
import SafetyCenter from "./pages/SafetyCenter";
import SavedPlaces from "./pages/SavedPlaces";
import DestinationDetails from "./pages/DestinationDetails";

import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [selectedDestination, setSelectedDestination] = useState(null);

  const [selectedDetailsDestination, setSelectedDetailsDestination] =
    useState(null);

  /*
    Open the Safety Center for a selected destination
  */
  const handleOpenSafetyCenter = async (destinationId) => {
    try {
      const response = await fetch(
        `https://travya.onrender.com/api/destinations/${destinationId}`
      );

      if (!response.ok) {
        throw new Error("Destination not found");
      }

      const destination = await response.json();

      setSelectedDestination(destination);
      setCurrentPage("safety");
    } catch (error) {
      console.error("Safety Center error:", error);
      alert("Unable to open safety information.");
    }
  };

  /*
    Open details for a selected destination
  */
  const handleOpenDetails = (destination) => {
    setSelectedDetailsDestination(destination);
    setCurrentPage("details");
  };

  /*
    Login callback
  */
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setCurrentPage("home");
  };

  /*
    Registration callback
  */
  const handleRegister = () => {
    alert("Registration successful! Please log in.");
    setCurrentPage("login");
  };

  /*
    Logout callback
  */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setCurrentPage("home");
  };

  /*
    Shared navbar
  */
  const renderNavbar = () => {
    return (
      <nav className="navbar">
        <button
          type="button"
          className="navbar-logo"
          onClick={() => setCurrentPage("home")}
        >
          <span>✦</span> Travya
        </button>

        <div className="navbar-links">
          <button
            type="button"
            className={
              currentPage === "home" ? "nav-link active" : "nav-link"
            }
            onClick={() => setCurrentPage("home")}
          >
            Home
          </button>

          <button
            type="button"
            className={
              currentPage === "explore" ? "nav-link active" : "nav-link"
            }
            onClick={() => setCurrentPage("explore")}
          >
            Explore
          </button>

          {user && (
            <button
              type="button"
              className={
                currentPage === "saved" ? "nav-link active" : "nav-link"
              }
              onClick={() => setCurrentPage("saved")}
            >
              Saved Places
            </button>
          )}

          <button
            type="button"
            className={
              currentPage === "safety" ? "nav-link active" : "nav-link"
            }
            onClick={() => {
              if (selectedDestination) {
                setCurrentPage("safety");
              } else {
                setCurrentPage("explore");
              }
            }}
          >
            Safety Center
          </button>

          <button
            type="button"
            className="nav-link"
            onClick={() => {
              if (currentPage !== "home") {
                setCurrentPage("home");
              }

              setTimeout(() => {
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }, 100);
            }}
          >
            How it works
          </button>
        </div>

        <div className="navbar-actions">
          {user ? (
            <div className="navbar-user-wrapper">
              <span className="navbar-user">Hi, {user.name}</span>

              <button
                type="button"
                className="navbar-logout-button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="navbar-login-button"
              onClick={() => setCurrentPage("login")}
            >
              Log in
            </button>
          )}
        </div>
      </nav>
    );
  };

  /*
    Home page
  */
  const renderHomePage = () => {
    return (
      <>
        {renderNavbar()}

        <main className="home-page">
          <section className="home-hero">
            <div className="home-hero-content">
              <p className="home-eyebrow">
                <span>✦</span> TRAVEL WITH CONFIDENCE
              </p>

              <h1>
                The world is
                <br />
                <em>waiting for you.</em>
              </h1>

              <p className="home-hero-description">
                Discover unforgettable places, prepare for safer
                journeys, and travel with confidence wherever life
                takes you.
              </p>

              <div className="home-hero-actions">
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setCurrentPage("explore")}
                >
                  Explore destinations
                  <span>→</span>
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  <span>▷</span>
                  See how it works
                </button>
              </div>

              <div className="home-hero-mini-card">
                <div className="home-mini-image"></div>

                <div>
                  <strong>Safer journeys</strong>
                  <p>Happier stories</p>
                </div>

                <span className="home-mini-arrow">↗</span>
              </div>

              <p className="home-quote">
                “A safer you, a brighter tomorrow.”
              </p>
            </div>
          </section>

          <section className="home-stats">
            <div className="home-stat">
              <span className="home-stat-icon">⌖</span>
              <div>
                <strong>50+</strong>
                <p>Curated destinations</p>
              </div>
            </div>

            <div className="home-stat">
              <span className="home-stat-icon">♢</span>
              <div>
                <strong>Trusted</strong>
                <p>Safety information</p>
              </div>
            </div>

            <div className="home-stat">
              <span className="home-stat-icon">♧</span>
              <div>
                <strong>10K+</strong>
                <p>Travellers inspired</p>
              </div>
            </div>

            <div className="home-stat">
              <span className="home-stat-icon">◎</span>
              <div>
                <strong>Countries</strong>
                <p>From around the world</p>
              </div>
            </div>
          </section>

          <section
            id="how-it-works"
            className="how-it-works-section"
          >
            <div className="how-it-works-heading">
              <p className="home-eyebrow">
                <span>✦</span> HOW TRAVYA WORKS
              </p>

              <h2>
                Travel thoughtfully,
                <br />
                <em>travel prepared.</em>
              </h2>

              <p>
                Travya helps you discover destinations and understand
                the safety information you need before you go.
              </p>
            </div>

            <div className="how-it-works-grid">
              <div className="how-it-works-card">
                <span>01</span>
                <h3>Discover</h3>
                <p>
                  Explore destinations that match your interests and
                  travel style.
                </p>
              </div>

              <div className="how-it-works-card">
                <span>02</span>
                <h3>Prepare</h3>
                <p>
                  Read useful safety information before starting your
                  journey.
                </p>
              </div>

              <div className="how-it-works-card">
                <span>03</span>
                <h3>Travel confidently</h3>
                <p>
                  Save your favourite places and travel with greater
                  confidence.
                </p>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  };

  /*
    Login page
  */
  if (currentPage === "login") {
    return (
      <>
        {renderNavbar()}

        <Login
          onLogin={handleLogin}
          onShowRegister={() => setCurrentPage("register")}
          onBack={() => setCurrentPage("home")}
        />
      </>
    );
  }

  /*
    Register page
  */
  if (currentPage === "register") {
    return (
      <>
        {renderNavbar()}

        <Register
          onRegister={handleRegister}
          onShowLogin={() => setCurrentPage("login")}
          onBack={() => setCurrentPage("home")}
        />
      </>
    );
  }

  /*
    Explore page
  */
  if (currentPage === "explore") {
    return (
      <>
        {renderNavbar()}

        <Explore
          onBack={() => setCurrentPage("home")}
          onOpenSafetyCenter={handleOpenSafetyCenter}
          onOpenDetails={handleOpenDetails}
        />
      </>
    );
  }

  /*
    Saved Places page
  */
  if (currentPage === "saved") {
    return (
      <>
        {renderNavbar()}

        <SavedPlaces
          onBack={() => setCurrentPage("explore")}
          onOpenSafetyCenter={handleOpenSafetyCenter}
          onOpenDetails={handleOpenDetails}
        />
      </>
    );
  }

  /*
    Safety Center page
  */
  if (currentPage === "safety") {
    return (
      <>
        {renderNavbar()}

        <SafetyCenter
          destination={selectedDestination}
          onBack={() => setCurrentPage("explore")}
        />
      </>
    );
  }

  /*
    Destination Details page
  */
  if (currentPage === "details") {
    return (
      <>
        {renderNavbar()}

        <DestinationDetails
          destination={selectedDetailsDestination}
          onBack={() => setCurrentPage("explore")}
        />
      </>
    );
  }

  /*
    Default page: Home
  */
  return renderHomePage();
}

export default App;