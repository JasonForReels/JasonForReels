import { Project } from "./types";

const watchguide: Project = {
  id: "watchguide",
  title: "WatchGuide",
  description: "The definitive companion for tracking and discovering movies and TV shows. Designed with a premium native interface exclusively for the Apple ecosystem.",
  url: "https://watchguide.app",
  tags: ["Entertainment", "Tracking", "Native App"],
  features: [
    "Comprehensive watch history and progress tracking",
    "Personalized recommendations and discovery",
    "Seamless iCloud synchronization across devices"
  ],
  platforms: ["iOS", "iPadOS", "tvOS"],
  posters: [
    "https://image.tmdb.org/t/p/w500/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg",
    "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8OSqEpAWV.jpg",
    "https://image.tmdb.org/t/p/w500/7rrB2A9G2OqDkY8BqTOrC3XWn9J.jpg",
  ]
};

export const projects: Project[] = [
  watchguide,
  {
    id: "livecount",
    title: "LiveCount",
    description: "Live YouTube subscriber counts that show their working. YouTube only publishes a rounded number, so every live counter is an estimate — LiveCount is the one that says so, and explains how each figure was reached.",
    url: "https://livecount.space",
    tags: ["YouTube", "Analytics", "Web App"],
    features: [
      "Live counters built from the site's own recorded readings, with uncertain digits visibly dimmed",
      "Growth rates derived from milestone crossings, weighted fits and view velocity",
      "Projections from one day to a year, each given as a range rather than a false exact figure"
    ],
    platforms: ["Web"]
  }
];

// Native apps, listed on the /apps page in this order.
export const apps: Project[] = [
  watchguide,
  {
    id: "reelmeter",
    title: "Reelmeter",
    description: "What the movies are making, right now. Studios report box office once a day, the morning after — Reelmeter estimates live grosses for every film in North American cinemas in between, and shows its working.",
    url: "https://reelmeter.space",
    tags: ["Box Office", "Movies", "Native App"],
    features: [
      "Live estimated grosses for every film in US & Canadian cinemas, plus worldwide estimates",
      "Opening weekend projections from franchise history, budget, buzz and genre",
      "Uncertain digits visibly faded, with every film's estimate explained"
    ],
    platforms: ["iOS"],
    comingSoon: true
  }
];
