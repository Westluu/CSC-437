import { Auth, Store, define, History, Switch } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { PostViewElement } from "./views/post-view";
import { LakeListElement } from "./views/lake-list";
import { FishingHeaderElement } from "./components/fishing-header";
import { LandingPageElement } from "./components/landing-page";
import { PostListElement } from "./views/post-list";
import { PostCreateElement } from "./views/post-create";
import { html } from "lit";

const routes: Switch.Route[] = [
  {
    path: "/app/post/:id",
    view: (params: Switch.Params) => html` <post-view
      post-id=${params.id}
    ></post-view>`,
  },
  {
    path: "/app/posts/create",
    view: () => html`<post-create></post-create> `,
  },
  {
    path: "/app/posts",
    view: () => html` <post-list></post-list> `,
  },
  {
    path: "/app/lakes",
    view: () => html` <lake-list></lake-list> `,
  },
  {
    path: "/app",
    view: () => html` <landing-page></landing-page> `,
  },
  {
    path: "/",
    redirect: "/app",
  },
];

define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "fishing:auth");
    }
  },
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "fishing:history");
    }
  },
  "fishing-header": FishingHeaderElement,
  "post-view": PostViewElement,
  "lake-list": LakeListElement,
  "landing-page": LandingPageElement,
  "post-list": PostListElement,
  "post-create": PostCreateElement,
});
