declare global {
  interface Window {
    initMap: () => void;
  }
}

import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { define, View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import "../components/post-comments";

// @ts-ignore
import { Post } from "server/models";

export class PostListElement extends View<Model, Msg> {
  @property({ type: Array }) posts: Post[] = [];

  static styles = css`
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      position: relative;
      margin: 10px 0;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
    }
    h3 {
      margin: 0 0 10px;
      font-size: 1.5em;
      color: #333;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    p {
      margin: 5px 0;
      color: #555;
    }
    .date,
    .location,
    .fish,
    .bait {
      font-size: 0.9em;
      color: #888;
    }
    .edit-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
      text-decoration: none;
      display: block;
    }
    .edit-button:hover {
      background-color: #0056b3;
    }
    .create-button {
      display: block;
      margin-bottom: 10px;
      padding: 10px 15px;
      background-color: #28a745;
      color: white;
      text-align: center;
      text-decoration: none;
      border-radius: 4px;
    }
    .create-button:hover {
      background-color: #218838;
    }
    .map {
      height: 300px;
      width: 100%;
      margin-top: 10px;
    }
  `;

  constructor() {
    super("fishing:model");
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("Dispatching post/fetchAll message");
    this.dispatchMessage(["post/fetchAll", {}]);
  }

  updated() {
    if (this.model.posts) {
      this.posts = this.model.posts || [];
      this.initMap(); // Ensure maps are initialized when posts are updated
    }
  }

  firstUpdated() {
    if (!document.querySelector("#google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAlWc-tyXbANQ_ftTUzx-uxwLF81PAjwSU&callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      window.initMap = this.initMap.bind(this);
    } else {
      this.initMap();
    }
  }

  initMap() {
    if (!this.posts.length) return;

    this.posts.forEach((post) => {
      const mapElement = this.shadowRoot?.querySelector(`#map-${post.id}`);
      if (mapElement) {
        const map = new google.maps.Map(mapElement, {
          center: { lat: 38.5816, lng: -121.4944 }, // Default to Sacramento, CA
          zoom: 15,
        });

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: post.location }, (results: any, status: any) => {
          if (status === "OK" && results) {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
            });
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      }
    });
  }

  render() {
    return html`
      <section id="posts">
        <h2>All Posts</h2>
        <a class="create-button" href="/app/posts/create">Create Post</a>
        <ul>
          ${this.posts.map(
            (post) => html`
              <li>
                <a class="edit-button" href="/app/post/${post.id}">Edit</a>
                <div>
                  <h3>${post.title}</h3>
                  <img src="${post.image}" alt="${post.title}" />
                  <p class="date">
                    Date: ${new Date(post.date).toLocaleDateString()}
                  </p>
                  <p class="location">Location: ${post.location}</p>
                  <p class="fish">Fish Caught: ${post.fish}</p>
                  <p class="bait">Bait Used: ${post.bait}</p>
                  <p>${post.description}</p>
                </div>
                <div id="map-${post.id}" class="map"></div>
                <post-comments
                  .comments="${post.comments}"
                  .postId="${post.id}"
                ></post-comments>
              </li>
            `
          )}
        </ul>
      </section>
    `;
  }
}

define({
  "post-list": PostListElement,
});
