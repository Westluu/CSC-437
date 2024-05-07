// src/services/profile-svc.ts
import { Post } from "../models/post";

// in-memory DB
let posts: Array<Post> = [
  {
    id: "john",
    title: "John's Memorable Catch at Grand Lake",
    image: "./images/bob.jpg",
    location: "Grand Lake",
    date: new Date("April 14, 2024 6:00PM"),
    fish: "Bass",
    bait: "Minnow",
    description:
      "What an amazing spot here at Grand Lake, caught so many bass here!",
  },
  {
    id: "alice",
    title: "Alice's First Catfish at Pine Ridge",
    image: "./images/alice.jpg",
    location: "Pine Ridge Lake",
    date: new Date("March 22, 2024 5:00PM"),
    fish: "Catfish",
    bait: "Worm",
    description:
      "Caught my first catfish at Pine Ridge! The view was spectacular.",
  },
  {
    id: "bob",
    title: "Bob's Night Fishing Adventure",
    image: "./images/bob.jpg",
    location: "River Bend",
    date: new Date("May 6, 2024 10:00PM"),
    fish: "Trout",
    bait: "Lure",
    description:
      "Night fishing at River Bend was a thrill. Landed a few trout with my trusty lure!",
  },
  {
    id: "carol",
    title: "Carol's Carp Frenzy",
    image: "./images/carol.jpg",
    location: "Sunny Beach",
    date: new Date("April 29, 2024 8:00AM"),
    fish: "Carp",
    bait: "Corn",
    description:
      "The carp were biting at Sunny Beach today. Got some real big ones!",
  },
];

export function get(id: String): Post | undefined {
  return posts.find((t) => t.id === id);
}

export default { get };
