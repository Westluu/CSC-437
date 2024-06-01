import{a as w,u as O,f as T,s as x,i as f,d as v,b as F,x as l,V as D,c as L,e as M,g as j,h as A,_ as U}from"./lit-element-BSVNMQ2S.js";const I={};function q(s,t,e){switch(console.log("IN UPDATE"),s[0]){case"post/save":z(s[1],e).then(o=>t(i=>({...i,post:o}))).then(()=>{const{onSuccess:o}=s[1];o&&o()}).catch(o=>{const{onFailure:i}=s[1];i&&i(o)});break;case"post/select":R(s[1],e).then(o=>t(i=>({...i,post:o}))).catch(o=>console.error(o));break;default:const r=s[0];throw new Error(`Unhandled Auth message "${r}"`)}}function z(s,t){return fetch(`/api/posts/${s.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...w.headers(t)},body:JSON.stringify(s.post)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save post for ${s.userid}`)}).then(e=>{if(e)return e})}function R(s,t){console.log("SELECT POST CALLED");const e=`/api/posts/${s.userid}`;return console.log("FETCHING: ",e),fetch(e,{headers:w.headers(t)}).then(r=>{if(r.status===200)return r.json()}).then(r=>{if(r)return console.log("Post:",r),r})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N={attribute:!0,type:String,converter:O,reflect:!1,hasChanged:T},J=(s=N,t,e)=>{const{kind:r,metadata:o}=e;let i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),i.set(e.name,s),r==="accessor"){const{name:a}=e;return{set(n){const y=t.get.call(this);t.set.call(this,n),this.requestUpdate(a,y,s)},init(n){return n!==void 0&&this.P(a,void 0,s),n}}}if(r==="setter"){const{name:a}=e;return function(n){const y=this[a];t.call(this,n),this.requestUpdate(a,y,s)}}throw Error("Unsupported decorator location: "+r)};function d(s){return(t,e)=>typeof e=="object"?J(s,t,e):((r,o,i)=>{const a=o.hasOwnProperty(i);return o.constructor.createProperty(i,a?{...r,wrapped:!0}:r),a?Object.getOwnPropertyDescriptor(o,i):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function B(s){return d({...s,state:!0,attribute:!1})}var E=Object.defineProperty,G=(s,t,e,r)=>{for(var o=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=a(t,e,o)||o);return o&&E(t,e,o),o};const m=class m extends x{_handleSubmit(t){this.dispatchEvent(new CustomEvent("post-edit:submit",{detail:t.detail,bubbles:!0,composed:!0}))}render(){var t,e,r,o,i,a,n;return l`
      <mu-form @mu-form:submit="${this._handleSubmit}">
        <form>
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
            Content
            <textarea name="content" rows="5" required>
${((e=this.post)==null?void 0:e.content)||""}</textarea
            >
          </label>
          <label>
            Image URL
            <input
              type="text"
              name="image"
              .value="${((r=this.post)==null?void 0:r.image)||""}"
            />
          </label>
          <label>
            Location
            <input
              type="text"
              name="location"
              .value="${((o=this.post)==null?void 0:o.location)||""}"
            />
          </label>
          <label>
            Fish Caught
            <input type="text" name="fish" .value="${((i=this.post)==null?void 0:i.fish)||""}" />
          </label>
          <label>
            Bait Used
            <input type="text" name="bait" .value="${((a=this.post)==null?void 0:a.bait)||""}" />
          </label>
          <label>
            Description
            <textarea name="description" rows="3">
${((n=this.post)==null?void 0:n.description)||""}</textarea
            >
          </label>
        </form>
      </mu-form>
    `}};m.styles=f`
    :host {
      display: block;
      padding: 16px;
      background: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    }
    input,
    textarea,
    button {
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background-color: #007bff;
      color: white;
      cursor: pointer;
      border: none;
      grid-column: 1 / -1; /* Ensure the button spans across the entire width */
      margin-top: 20px;
      align-self: end;
    }
    button:hover {
      background-color: #0056b3;
    }
  `,m.uses=v({"mu-form":F.Element});let u=m;G([d({type:Object})],u.prototype,"post");customElements.define("post-editor",u);var Q=Object.defineProperty,W=Object.getOwnPropertyDescriptor,S=(s,t,e,r)=>{for(var o=r>1?void 0:r?W(t,e):t,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=(r?a(t,e,o):a(o))||o);return r&&o&&Q(t,e,o),o};const g=class g extends D{constructor(){super("fishing:model"),this.postid=""}get post(){return this.model.post}connectedCallback(){super.connectedCallback(),this.postid&&this.dispatchMessage(["post/select",{userid:this.postid}])}attributeChangedCallback(t,e,r){t==="post-id"&&e!==r&&this.dispatchMessage(["post/select",{userid:r}]),super.attributeChangedCallback(t,e,r)}updated(){this.model.post&&this.renderSlots(this.model.post)}renderSlots(t){if(!this.shadowRoot){console.error("shadowRoot is not available");return}for(const e in t){let r=t[e];if(e==="image"){const o=this.shadowRoot.querySelector(`img[slot='${e}']`);o&&(o.src=r)}else{const o=this.shadowRoot.querySelector(`slot[name='${e}']`);o&&(o.textContent=r)}}}_handleSubmit(t){const e=t.detail;this.dispatchMessage(["post/save",{userid:this.postid,post:e,onSuccess:()=>console.log(`Post ${this.postid} saved successfully`),onFailure:r=>console.error(`Failed to save post ${this.postid}:`,r)}])}render(){return l`
      <article>
        <h3><slot name="title"></slot></h3>
        <details>
          <summary>Click to View More</summary>
          <img slot="image" />
          <p class="date"><slot name="date"></slot></p>
          <p><strong>Location:</strong> <slot name="location"></slot></p>
          <p><strong>Fish Caught:</strong> <slot name="fish"></slot></p>
          <p><strong>Bait Used:</strong> <slot name="bait"></slot></p>
          <p><slot name="description"></slot></p>
        </details>
        <post-editor
          .post=${this.post}
          @post-edit:submit=${this._handleSubmit}
        ></post-editor>
      </article>
    `}};g.uses=v({"post-editor":u}),g.styles=f`
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
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
    }
    details {
      margin-top: 10px;
    }
  `;let p=g;S([d({attribute:"post-id",reflect:!0})],p.prototype,"postid",2);S([d()],p.prototype,"post",1);customElements.define("post-view",p);var Y=Object.defineProperty,_=(s,t,e,r)=>{for(var o=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=a(t,e,o)||o);return o&&Y(t,e,o),o};const $=class $ extends x{constructor(){super(...arguments),this.lakes=[{name:"American River",url:"./lakes/american_river.html"},{name:"Grand Lake",url:"./lakes/grand_lake.html"},{name:"Lake Forth",url:"./lakes/lake_forth.html"},{name:"Clear Lake",url:"./lakes/clear_lake.html"}],this.filterTerm=""}handleInput(t){const e=t.target;e&&e.value?(this.filterTerm=e.value.toLowerCase(),console.log(`Filter term updated: ${this.filterTerm}`)):(this.filterTerm="",console.error("Input element not found or value is empty"))}get filteredLakes(){const t=this.lakes.filter(e=>e.name.toLowerCase().includes(this.filterTerm));return console.log(`Filtered lakes: ${JSON.stringify(t)}`),t}handleClick(t,e){t.preventDefault();const r=t.currentTarget.closest("li");r&&this.addFragmentFrom(e.url,r)}addFragmentFrom(t,e){fetch(t).then(r=>r.text()).then(r=>{const i=new DOMParser().parseFromString(r,"text/html"),a=Array.from(i.body.childNodes);e.append(...a)})}render(){return l`
      <section id="locations">
        <h2>Lakes (Click For Quick View)</h2>
        <input
          type="text"
          placeholder="Filter lakes"
          .value="${this.filterTerm}"
          @input="${this.handleInput}"
        />
        <ul>
          ${this.filteredLakes.map(t=>l`
              <li>
                <a
                  href="#"
                  @click="${e=>this.handleClick(e,t)}"
                  >${t.name}</a
                >
              </li>
            `)}
        </ul>
      </section>
    `}};$.styles=f`
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 10px 0;
    }
    a {
      color: var(--link-color, blue);
      text-decoration: none;
      cursor: pointer;
    }
    a:hover {
      text-decoration: underline;
    }
  `;let c=$;_([d({type:Array})],c.prototype,"lakes");_([B()],c.prototype,"filterTerm");customElements.define("lake-list",c);const b=class b extends x{render(){return l`
      <header>
        <h1>Fishing 𓆝</h1>
        <a href="/login.html">Login</a>
        <drop-down>
          <label @change=${this.toggleDarkMode}>
            <input type="checkbox" autocomplete="off" />
            Dark mode
          </label>
          <a href="#" @click=${this.signOut}> Sign out </a>
        </drop-down>
      </header>
    `}toggleDarkMode(){const t=document.body;t.classList.toggle("dark-mode"),console.log("Dark mode toggled:",t.classList.contains("dark-mode"))}signOut(t){t.preventDefault(),M.relay(t,"auth:message",["auth/signout"])}};b.uses=v({"drop-down":L.Element}),b.styles=f`
    header {
      display: flex;
      justify-content: space-between;
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
      margin: 0 10px;
    }
    h1 {
      margin: 0;
    }
  `;let k=b;var K=Object.defineProperty,P=(s,t,e,r)=>{for(var o=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=a(t,e,o)||o);return o&&K(t,e,o),o};const C=class C extends x{constructor(){super(...arguments),this.title="Welcome to the Fishing Site!",this.subtitle="Your adventure starts here."}render(){return l`
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
          <a href="/login.html">Log In</a>
        </div>
      </section>
    `}};C.styles=f`
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
  `;let h=C;P([d({type:String})],h.prototype,"title");P([d({type:String})],h.prototype,"subtitle");customElements.define("landing-page",h);const X=[{path:"/app/post/:id",view:s=>l`
      <post-view post-id=${s.id}></post-view>
    `},{path:"/app/lakes",view:()=>l` <lake-list></lake-list> `},{path:"/app",view:()=>l` <landing-page></landing-page> `},{path:"/",redirect:"/app"}];v({"mu-auth":w.Provider,"mu-store":class extends j.Provider{constructor(){super(q,I,"fishing:auth")}},"mu-history":A.Provider,"mu-switch":class extends U.Element{constructor(){super(X,"fishing:history")}},"fishing-header":k,"post-view":p,"lake-list":c,"landing-page":h});
