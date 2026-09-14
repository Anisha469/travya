export const destinations = [
  {
    id: 1,
    name: "Manali",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    description: "Mountain escapes, peaceful valleys, and unforgettable adventures.",
    safetyLevel: "Good to go",
    safetyColor: "green",
    tags: ["Mountains", "Adventure"],

    safety: {
      score: 82,
      status: "Generally safe",
      summary:
        "Manali is a popular mountain destination. Most visits are trouble-free, but weather and road conditions can change quickly.",

      risks: [
        "Sudden weather changes in high-altitude areas",
        "Road closures during heavy rain or snowfall",
        "Altitude-related discomfort",
        "Slippery roads and trekking paths",
      ],

      tips: [
        "Check weather and road conditions before travelling",
        "Carry warm clothing and essential medicines",
        "Avoid isolated trekking routes alone",
        "Keep emergency contacts accessible",
      ],

      emergency: [
        { name: "Police", number: "100" },
        { name: "Ambulance", number: "108" },
        { name: "National Emergency", number: "112" },
      ],

      checklist: [
        "Check weather forecast",
        "Save emergency contacts",
        "Share itinerary with a trusted contact",
        "Carry identification documents",
        "Pack essential medicines",
      ],
    },
  },

  {
    id: 2,
    name: "Goa",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    description: "Relaxed beaches, vibrant culture, and coastal experiences.",
    safetyLevel: "Good to go",
    safetyColor: "green",
    tags: ["Beach", "Relaxation"],

    safety: {
      score: 86,
      status: "Generally safe",
      summary:
        "Goa is a well-visited destination with a strong tourism ecosystem. Stay aware in crowded areas and follow beach safety guidance.",

      risks: [
        "Strong currents at certain beaches",
        "Traffic and unfamiliar roads",
        "Theft in crowded tourist areas",
        "Overexposure to sun and heat",
      ],

      tips: [
        "Swim only in designated areas",
        "Keep valuables secure in crowded places",
        "Use licensed transport providers",
        "Stay hydrated and use sun protection",
      ],

      emergency: [
        { name: "Police", number: "100" },
        { name: "Ambulance", number: "108" },
        { name: "National Emergency", number: "112" },
      ],

      checklist: [
        "Check beach safety conditions",
        "Save emergency contacts",
        "Share accommodation details",
        "Carry identification documents",
        "Keep valuables secure",
      ],
    },
  },

  {
    id: 3,
    name: "Jaipur",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
    description: "Royal architecture, colorful markets, and rich history.",
    safetyLevel: "Plan ahead",
    safetyColor: "orange",
    tags: ["Culture", "History"],

    safety: {
      score: 78,
      status: "Generally safe",
      summary:
        "Jaipur is a popular cultural destination. Visitors should stay alert in crowded markets and plan transport in advance.",

      risks: [
        "Crowded markets and tourist areas",
        "Extreme heat during summer",
        "Traffic and busy crossings",
        "Unofficial guides or transport services",
      ],

      tips: [
        "Use trusted transport services",
        "Avoid carrying large amounts of cash",
        "Stay hydrated during sightseeing",
        "Keep copies of important documents",
      ],

      emergency: [
        { name: "Police", number: "100" },
        { name: "Ambulance", number: "108" },
        { name: "National Emergency", number: "112" },
      ],

      checklist: [
        "Check local weather",
        "Save emergency contacts",
        "Plan transport in advance",
        "Carry identification documents",
        "Keep valuables secure",
      ],
    },
  },

  {
    id: 4,
    name: "Rishikesh",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=80",
    description: "Riverside adventures, yoga, and a refreshing escape.",
    safetyLevel: "Good to go",
    safetyColor: "green",
    tags: ["Adventure", "Wellness"],

    safety: {
      score: 84,
      status: "Generally safe",
      summary:
        "Rishikesh is a popular destination for wellness and adventure activities. Follow local guidance, especially near the river.",

      risks: [
        "Strong river currents",
        "Adventure activity-related injuries",
        "Slippery paths near the river",
        "Changing weather conditions",
      ],

      tips: [
        "Use certified adventure operators",
        "Follow river safety instructions",
        "Wear suitable footwear",
        "Avoid entering restricted areas",
      ],

      emergency: [
        { name: "Police", number: "100" },
        { name: "Ambulance", number: "108" },
        { name: "National Emergency", number: "112" },
      ],

      checklist: [
        "Verify adventure operator",
        "Save emergency contacts",
        "Share itinerary with a trusted contact",
        "Carry identification documents",
        "Check local conditions",
      ],
    },
  },
];