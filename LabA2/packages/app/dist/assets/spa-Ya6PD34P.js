import{a as x,u as B,f as G,s as v,i as c,h as A,x as n,V as O,d as y,T as M,w as J,b as H,e as j,O as U,c as Y,g as Q,_ as W}from"./lit-element-D8AT0Ahz.js";const K={};function X(s,t,e){switch(console.log("IN UPDATE"),s[0]){case"post/save":Z(s[1],e).then(o=>t(i=>({...i,post:o}))).then(()=>{const{onSuccess:o}=s[1];o&&o()}).catch(o=>{const{onFailure:i}=s[1];i&&i(o)});break;case"post/select":V(s[1],e).then(o=>t(i=>({...i,post:o}))).catch(o=>console.error(o));break;case"post/fetchAll":tt(e).then(o=>t(i=>({...i,posts:o}))).then(()=>{const{onSuccess:o}=s[1];o&&o()}).catch(o=>{const{onFailure:i}=s[1];i&&i(o)});break;case"post/create":et(s[1],e).then(o=>t(i=>({...i,post:o}))).then(()=>{const{onSuccess:o}=s[1];o&&o()}).catch(o=>{const{onFailure:i}=s[1];i&&i(o)});break;default:const r=s[0];throw new Error(`Unhandled Auth message "${r}"`)}}function Z(s,t){return fetch(`/api/posts/${s.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...x.headers(t)},body:JSON.stringify(s.post)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save post for ${s.userid}`)}).then(e=>{if(e)return e})}function V(s,t){console.log("SELECT POST CALLED");const e=`/api/posts/${s.userid}`;return console.log("FETCHING: ",e),fetch(e,{headers:x.headers(t)}).then(r=>{if(r.status===200)return r.json()}).then(r=>{if(r)return console.log("Post:",r),r})}function tt(s){console.log("FETCH ALL POSTS CALLED");const t="/api/posts";return console.log("FETCHING: ",t),fetch(t,{headers:x.headers(s)}).then(e=>{if(e.status===200)return e.json();throw new Error("Failed to fetch posts")}).then(e=>e?(console.log("Posts:",e),e):[])}function et(s,t){return fetch("/api/posts",{method:"POST",headers:{"Content-Type":"application/json",...x.headers(t)},body:JSON.stringify(s.post)}).then(e=>{if(e.status===201)return e.json();throw new Error("Failed to create post")}).then(e=>{if(e)return e})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:G},st=(s=ot,t,e)=>{const{kind:r,metadata:o}=e;let i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),i.set(e.name,s),r==="accessor"){const{name:a}=e;return{set(p){const _=t.get.call(this);t.set.call(this,p),this.requestUpdate(a,_,s)},init(p){return p!==void 0&&this.P(a,void 0,s),p}}}if(r==="setter"){const{name:a}=e;return function(p){const _=this[a];t.call(this,p),this.requestUpdate(a,_,s)}}throw Error("Unsupported decorator location: "+r)};function l(s){return(t,e)=>typeof e=="object"?st(s,t,e):((r,o,i)=>{const a=o.hasOwnProperty(i);return o.constructor.createProperty(i,a?{...r,wrapped:!0}:r),a?Object.getOwnPropertyDescriptor(o,i):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function I(s){return l({...s,state:!0,attribute:!1})}var it=Object.defineProperty,rt=(s,t,e,r)=>{for(var o=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=a(t,e,o)||o);return o&&it(t,e,o),o};const D=class D extends v{_handleSubmit(t){t.preventDefault();const e=new FormData(t.target),r=Object.fromEntries(e.entries());this.dispatchEvent(new CustomEvent("post-edit:submit",{detail:r,bubbles:!0,composed:!0})),A.dispatch(this,"history/navigate",{href:"/app/posts"})}render(){var t,e,r,o,i,a;return n`
      <form @submit="${this._handleSubmit}">
        <label>
          Title
          <input
            type="text"
            name="title"
            .value="${((t=this.post)==null?void 0:t.title)||""}"
            required
          />
        </label>
        <label>
          Image URL
          <input type="text" name="image" .value="${((e=this.post)==null?void 0:e.image)||""}" />
        </label>
        <label>
          Location
          <input
            type="text"
            name="location"
            .value="${((r=this.post)==null?void 0:r.location)||""}"
          />
        </label>
        <label>
          Fish Caught
          <input type="text" name="fish" .value="${((o=this.post)==null?void 0:o.fish)||""}" />
        </label>
        <label>
          Bait Used
          <input type="text" name="bait" .value="${((i=this.post)==null?void 0:i.bait)||""}" />
        </label>
        <label>
          Description
          <textarea name="description" rows="3">
${((a=this.post)==null?void 0:a.description)||""}</textarea
          >
        </label>
        <button type="submit">Edit Post</button>
      </form>
    `}};D.styles=c`
    :host {
      display: block;
      padding: 16px;
      background: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
    }
    form {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    label {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      color: #333;
    }
    input,
    textarea,
    button {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
    }
    textarea {
      resize: vertical;
    }
    button {
      background-color: #007bff;
      color: white;
      cursor: pointer;
      border: none;
      margin-top: 20px;
      align-self: end;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;let b=D;rt([l({type:Object})],b.prototype,"post");customElements.define("post-editor",b);var at=Object.defineProperty,nt=Object.getOwnPropertyDescriptor,R=(s,t,e,r)=>{for(var o=r>1?void 0:r?nt(t,e):t,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=(r?a(t,e,o):a(o))||o);return r&&o&&at(t,e,o),o};const w=class w extends O{constructor(){super("fishing:model"),this.postid=""}get post(){return this.model.post}connectedCallback(){super.connectedCallback(),this.postid&&this.dispatchMessage(["post/select",{userid:this.postid}])}attributeChangedCallback(t,e,r){t==="post-id"&&e!==r&&this.dispatchMessage(["post/select",{userid:r}]),super.attributeChangedCallback(t,e,r)}updated(){this.model.post&&this.renderSlots(this.model.post)}renderSlots(t){if(!this.shadowRoot){console.error("shadowRoot is not available");return}for(const e in t){let r=t[e];if(e==="image"){const o=this.shadowRoot.querySelector(`img[slot='${e}']`);o&&(o.src=r)}else{const o=this.shadowRoot.querySelector(`slot[name='${e}']`);o&&(o.textContent=r)}}}_handleSubmit(t){const e=t.detail;this.dispatchMessage(["post/save",{userid:this.postid,post:e,onSuccess:()=>console.log(`Post ${this.postid} saved successfully`),onFailure:r=>console.error(`Failed to save post ${this.postid}:`,r)}])}render(){return n`
      <article>
        <h3><slot name="title"></slot></h3>
        <img slot="image" />
        <p class="date"><slot name="date"></slot></p>
        <p><strong>Location:</strong> <slot name="location"></slot></p>
        <p><strong>Fish Caught:</strong> <slot name="fish"></slot></p>
        <p><strong>Bait Used:</strong> <slot name="bait"></slot></p>
        <p class="description"><slot name="description"></slot></p>
        <post-editor
          .post=${this.post}
          @post-edit:submit=${this._handleSubmit}
        ></post-editor>
      </article>
    `}};w.uses=y({"post-editor":b}),w.styles=c`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    article {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      margin: 20px auto;
    }
    h3 {
      margin-bottom: 10px;
      color: #333;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    p {
      margin: 10px 0;
      color: #555;
    }
    .date,
    .location,
    .fish,
    .bait {
      font-size: 0.9em;
      color: #888;
    }
    .description {
      margin-top: 20px;
    }
  `;let u=w;R([l({attribute:"post-id",reflect:!0})],u.prototype,"postid",2);R([l()],u.prototype,"post",1);customElements.define("post-view",u);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},pt=s=>(...t)=>({_$litDirective$:s,values:t});class ct{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class S extends ct{constructor(t){if(super(t),this.it=M,t.type!==lt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===M||t==null)return this._t=void 0,this.it=t;if(t===J)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}S.directiveName="unsafeHTML",S.resultType=1;const dt=pt(S);var ht=Object.defineProperty,P=(s,t,e,r)=>{for(var o=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=a(t,e,o)||o);return o&&ht(t,e,o),o};const L=class L extends v{constructor(){super(...arguments),this.lakes=[{name:"American River",url:"../../lakes/american_river.html"},{name:"Grand Lake",url:"../../lakes/grand_lake.html"},{name:"Lake Forth",url:"../../lakes/lake_forth.html"},{name:"Clear Lake",url:"../../lakes/clear_lake.html"},{name:"Colorado River",url:"../../lakes/colorado_river.html"},{name:"Mississippi River",url:"../../lakes/miss_river.html"},{name:"Nile River",url:"../../lakes/nile_river.html"},{name:"Amazon River",url:"../../lakes/amazon_river.html"},{name:"Yangtze River",url:"../../lakes/yangtze_river.html"}],this.filterTerm="",this.selectedLakeContent=""}handleInput(t){const e=t.target;this.filterTerm=e.value.toLowerCase()}get filteredLakes(){return this.lakes.filter(t=>t.name.toLowerCase().includes(this.filterTerm))}handleClick(t,e){t.preventDefault(),this.fetchLakeContent(e.url)}fetchLakeContent(t){fetch(t).then(e=>{if(!e.ok)throw new Error(`Failed to fetch ${t}: ${e.statusText}`);return e.text()}).then(e=>{this.selectedLakeContent=e}).catch(e=>{console.error(e),this.selectedLakeContent=`<p>Error loading content: ${e.message}</p>`})}render(){return n`
      <section id="locations">
        <h2>Lakes (Click For Quick View)</h2>
        <input
          type="text"
          placeholder="Filter lakes"
          .value="${this.filterTerm}"
          @input="${this.handleInput}"
        />
        <div class="container">
          <div class="list">
            <ul>
              ${this.filteredLakes.map(t=>n`
                  <li>
                    <a
                      href="#"
                      @click="${e=>this.handleClick(e,t)}"
                      >${t.name}</a
                    >
                  </li>
                `)}
            </ul>
          </div>
          <div class="details-wrapper">
            <div class="details">${dt(this.selectedLakeContent)}</div>
          </div>
        </div>
      </section>
    `}};L.styles=c`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
    }

    h2 {
      font-size: 24px;
      margin-bottom: 16px;
      color: #333;
    }

    input {
      padding: 8px;
      font-size: 16px;
      width: 100%;
      max-width: 300px;
      margin-bottom: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .container {
      display: flex;
      gap: 16px;
    }

    .list {
      flex: 1;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }

    li {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      transition: box-shadow 0.3s ease;
    }

    li:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    a {
      color: #007bff;
      text-decoration: none;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
    }

    .details-wrapper {
      flex: 3;
      background-color: #fff;
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      display: flex;
    }

    .details {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
    }
  `;let d=L;P([l({type:Array})],d.prototype,"lakes");P([I()],d.prototype,"filterTerm");P([I()],d.prototype,"selectedLakeContent");customElements.define("lake-list",d);const k=class k extends v{render(){return n`
      <header>
        <h1>Fish Social 𓆝</h1>
        <a href="/app/posts"> Posts </a>
        <a href="/app/lakes"> Lakes </a>
        <drop-down>
          <label @change=${this.toggleDarkMode}>
            <input type="checkbox" autocomplete="off" />
            Dark mode
          </label>
          <a href="#" @click=${this.signOut}> Sign out </a>
        </drop-down>
      </header>
    `}toggleDarkMode(){const t=document.body;t.classList.toggle("dark-mode"),console.log("Dark mode toggled:",t.classList.contains("dark-mode"))}signOut(t){t.preventDefault(),j.relay(t,"auth:message",["auth/signout"])}};k.uses=y({"drop-down":H.Element}),k.styles=c`
    header {
      display: flex;
      align-items: center;
      background-color: blue;
      color: white;
      padding: 10px;
    }
    header a {
      color: white;
      text-decoration: none;
      margin: 0 10px;
    }
    drop-down {
      left: 80%;
      margin: 0 10px;
    }
    h1 {
      margin: 0;
    }
  `;let T=k;var ut=Object.defineProperty,N=(s,t,e,r)=>{for(var o=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=a(t,e,o)||o);return o&&ut(t,e,o),o};const z=class z extends v{constructor(){super(...arguments),this.title="Welcome to the Fishing Site!",this.subtitle="Your adventure starts here."}render(){return n`
      <header>
        <h1>${this.title}</h1>
      </header>
      <section class="hero">
        <h2>${this.subtitle}</h2>
        <p>
          Discover the best fishing spots, tips, and gear. Join our community
          and start your fishing adventure today!
        </p>
        <div class="cta-buttons">
            </label>
                <a href="#" @click=${this.login}> Login </a>
            </drop-down>
        </div>
      </section>
    `}login(t){t.preventDefault(),j.relay(t,"auth:message",["auth/signout"])}};z.styles=c`
    :host {
      display: block;
      font-family: "Arial", sans-serif;
      text-align: center;
      padding: 0;
      background-color: #f0f0f0;
      color: #333;
    }
    header {
      background-color: #007bff;
      color: white;
      padding: 40px 0;
    }
    header h1 {
      margin: 0;
      font-size: 3em;
    }
    .hero {
      background-color: #fff;
      padding: 60px 20px;
      margin: 0 auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-top: -20px;
      border-radius: 8px;
      max-width: 800px;
    }
    .hero h2 {
      margin-top: 0;
      font-size: 2.5em;
      color: #333;
    }
    .hero p {
      font-size: 1.2em;
      color: #555;
      margin: 20px 0;
    }
    .cta-buttons {
      margin-top: 30px;
    }
    .cta-buttons a {
      display: inline-block;
      margin: 0 10px;
      padding: 15px 30px;
      font-size: 1.2em;
      color: white;
      background-color: #007bff;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .cta-buttons a:hover {
      background-color: #0056b3;
    }
  `;let m=z;N([l({type:String})],m.prototype,"title");N([l({type:String})],m.prototype,"subtitle");customElements.define("landing-page",m);var mt=Object.defineProperty,C=(s,t,e,r)=>{for(var o=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=a(t,e,o)||o);return o&&mt(t,e,o),o};const E=class E extends v{constructor(){super(...arguments),this.username="anonymous",this.comments=[],this.postId="",this.newCommentContent="",this._authObserver=new U(this,"fishing:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this.username=t.username)})}handleCommentInput(t){const e=t.target;this.newCommentContent=e.value}handleAddComment(){if(this.newCommentContent.trim()==="")return;const t={user:this.username,content:this.newCommentContent,date:new Date};fetch(`/api/posts/${this.postId}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(e=>e.json()).then(e=>{this.comments=e.comments,this.newCommentContent=""}).catch(e=>{console.error("Error adding comment:",e)})}render(){return n`
      <div class="comments-section">
        <h4>Comments</h4>
        ${this.comments.map(t=>n`
            <div class="comment">
              <p>
                <strong>${t.user}</strong> (${new Date(t.date).toLocaleDateString()}):
              </p>
              <p>${t.content}</p>
            </div>
          `)}
        <div class="comment-input">
          <textarea
            .value="${this.newCommentContent}"
            @input="${this.handleCommentInput}"
            placeholder="Add a comment"
          ></textarea>
          <button @click="${this.handleAddComment}">Add Comment</button>
        </div>
      </div>
    `}};E.styles=c`
    .comments-section {
      margin-top: 20px;
    }
    .comment {
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 4px;
      background-color: #f1f1f1;
    }
    .comment-input {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
    }
    .comment-input textarea {
      padding: 10px;
      font-size: 14px;
    }
    .comment-input button {
      margin-top: 5px;
      padding: 10px;
      font-size: 14px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .comment-input button:hover {
      background-color: #0056b3;
    }
  `;let h=E;C([l()],h.prototype,"username");C([l({type:Array})],h.prototype,"comments");C([l({type:String})],h.prototype,"postId");C([l({type:String})],h.prototype,"newCommentContent");customElements.define("post-comments",h);var ft=Object.defineProperty,bt=(s,t,e,r)=>{for(var o=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=a(t,e,o)||o);return o&&ft(t,e,o),o};const F=class F extends O{constructor(){super("fishing:model"),this.posts=[]}connectedCallback(){super.connectedCallback(),console.log("Dispatching post/fetchAll message"),this.dispatchMessage(["post/fetchAll",{}])}updated(){this.model.posts&&(this.posts=this.model.posts||[],this.initMap())}firstUpdated(){if(document.querySelector("#google-maps-script"))this.initMap();else{const t=document.createElement("script");t.id="google-maps-script",t.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlWc-tyXbANQ_ftTUzx-uxwLF81PAjwSU&callback=initMap&libraries=places",t.async=!0,t.defer=!0,document.head.appendChild(t),window.initMap=this.initMap.bind(this)}}initMap(){this.posts.length&&this.posts.forEach(t=>{var r;const e=(r=this.shadowRoot)==null?void 0:r.querySelector(`#map-${t.id}`);if(e){const o=new google.maps.Map(e,{center:{lat:38.5816,lng:-121.4944},zoom:15});new google.maps.Geocoder().geocode({address:t.location},(a,p)=>{p==="OK"&&a?(o.setCenter(a[0].geometry.location),new google.maps.Marker({map:o,position:a[0].geometry.location})):console.error("Geocode was not successful for the following reason: "+p)})}})}render(){return n`
      <section id="posts">
        <h2>All Posts</h2>
        <a class="create-button" href="/app/posts/create">Create Post</a>
        <ul>
          ${this.posts.map(t=>n`
              <li>
                <a class="edit-button" href="/app/post/${t.id}">Edit</a>
                <div>
                  <h3>${t.title}</h3>
                  <img src="${t.image}" alt="${t.title}" />
                  <p class="date">
                    Date: ${new Date(t.date).toLocaleDateString()}
                  </p>
                  <p class="location">Location: ${t.location}</p>
                  <p class="fish">Fish Caught: ${t.fish}</p>
                  <p class="bait">Bait Used: ${t.bait}</p>
                  <p>${t.description}</p>
                </div>
                <div id="map-${t.id}" class="map"></div>
                <post-comments
                  .comments="${t.comments}"
                  .postId="${t.id}"
                ></post-comments>
              </li>
            `)}
        </ul>
      </section>
    `}};F.styles=c`
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
  `;let g=F;bt([l({type:Array})],g.prototype,"posts");y({"post-list":g});var gt=Object.defineProperty,q=(s,t,e,r)=>{for(var o=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=a(t,e,o)||o);return o&&gt(t,e,o),o};const $=class $ extends O{constructor(){super("fishing:model"),this.username="anonymous",this.post={},this._authObserver=new U(this,"fishing:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this.username=t.username)})}_handleSubmit(t){t.preventDefault();const e=new FormData(t.target);let r=Object.fromEntries(e.entries());r={...r,id:this.username,image:"../../public/images/bob.jpg",date:"2024-05-05T00:29:00.000+00:00"},console.log("POST: ",r),this.dispatchMessage(["post/create",{post:r,onSuccess:()=>{alert("Post created successfully!"),A.dispatch(this,"history/navigate",{href:"/app/posts"})},onFailure:o=>{console.error("Error creating post:",o),alert("Failed to create post.")}}])}render(){return n`
      <h1>Create Post</h1>
      <form @submit="${this._handleSubmit}">
        <label>
          Title
          <input
            type="text"
            name="title"
            .value="${this.post.title||""}"
            required
          />
        </label>
        <label>
          Content
          <textarea name="content" required>
${this.post.content||""}</textarea
          >
        </label>
        <label>
          Location
          <input
            type="text"
            name="location"
            .value="${this.post.location||""}"
          />
        </label>
        <label>
          Fish Caught
          <input type="text" name="fish" .value="${this.post.fish||""}" />
        </label>
        <label>
          Bait Used
          <input type="text" name="bait" .value="${this.post.bait||""}" />
        </label>
        <label>
          Description
          <textarea name="description">${this.post.description||""}</textarea>
        </label>
        <button type="submit">Create Post</button>
      </form>
    `}};$.styles=c`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 600px;
      margin: 0 auto;
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    label {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #555;
    }

    input,
    textarea {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 5px;
    }

    textarea {
      resize: vertical;
      height: 100px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      align-self: center;
    }

    button:hover {
      background-color: #0056b3;
    }
  `,$.uses=y({"mu-form":Y.Element});let f=$;q([l()],f.prototype,"username");q([l({type:Object})],f.prototype,"post");customElements.define("post-create",f);const xt=[{path:"/app/post/:id",view:s=>n` <post-view
      post-id=${s.id}
    ></post-view>`},{path:"/app/posts/create",view:()=>n`<post-create></post-create> `},{path:"/app/posts",view:()=>n` <post-list></post-list> `},{path:"/app/lakes",view:()=>n` <lake-list></lake-list> `},{path:"/app",view:()=>n` <landing-page></landing-page> `},{path:"/",redirect:"/app"}];y({"mu-auth":x.Provider,"mu-store":class extends Q.Provider{constructor(){super(X,K,"fishing:auth")}},"mu-history":A.Provider,"mu-switch":class extends W.Element{constructor(){super(xt,"fishing:history")}},"fishing-header":T,"post-view":u,"lake-list":d,"landing-page":m,"post-list":g,"post-create":f});
