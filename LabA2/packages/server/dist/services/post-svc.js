"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var post_svc_exports = {};
__export(post_svc_exports, {
  default: () => post_svc_default,
  get: () => get
});
module.exports = __toCommonJS(post_svc_exports);
let posts = [
  {
    id: "john",
    title: "John's Memorable Catch at Grand Lake",
    image: "./images/bob.jpg",
    location: "Grand Lake",
    date: /* @__PURE__ */ new Date("April 14, 2024 6:00PM"),
    fish: "Bass",
    bait: "Minnow",
    description: "What an amazing spot here at Grand Lake, caught so many bass here!"
  },
  {
    id: "alice",
    title: "Alice's First Catfish at Pine Ridge",
    image: "./images/alice.jpg",
    location: "Pine Ridge Lake",
    date: /* @__PURE__ */ new Date("March 22, 2024 5:00PM"),
    fish: "Catfish",
    bait: "Worm",
    description: "Caught my first catfish at Pine Ridge! The view was spectacular."
  },
  {
    id: "bob",
    title: "Bob's Night Fishing Adventure",
    image: "./images/bob.jpg",
    location: "River Bend",
    date: /* @__PURE__ */ new Date("May 6, 2024 10:00PM"),
    fish: "Trout",
    bait: "Lure",
    description: "Night fishing at River Bend was a thrill. Landed a few trout with my trusty lure!"
  },
  {
    id: "carol",
    title: "Carol's Carp Frenzy",
    image: "./images/carol.jpg",
    location: "Sunny Beach",
    date: /* @__PURE__ */ new Date("April 29, 2024 8:00AM"),
    fish: "Carp",
    bait: "Corn",
    description: "The carp were biting at Sunny Beach today. Got some real big ones!"
  }
];
function get(id) {
  return posts.find((t) => t.id === id);
}
var post_svc_default = { get };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get
});
