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
    id: "cinebrace",
    title: "CineBrace",
    description: "An intelligent, AI-powered cinematic analysis and recommendation engine. Explore films through a dynamic, conversational interface powered by generative models.",
    url: "https://cinebrace.ai.studio",
    tags: ["AI", "Movies", "Web App"],
    features: [
      "AI-driven film recommendations and insights",
      "Deep semantic search for tropes and genres",
      "Responsive, next-generation web experience"
    ],
    platforms: ["Web"],
    posters: [
      "https://image.tmdb.org/t/p/w500/gEU2QlsUUQZnD0sB4b9861P2FfO.jpg",
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2IGkp3LuB.jpg",
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    ]
  }
];
