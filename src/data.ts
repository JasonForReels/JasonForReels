import { Project } from "./types";

export const projects: Project[] = [
  {
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
  },
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
