import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

// @ts-ignore
import { Comment } from "server/models";

export class PostCommentsElement extends LitElement {
  @property()
  username = "anonymous";
  @property({ type: Array }) comments: Comment[] = [];
  @property({ type: String }) postId: string = "";
  @property({ type: String }) newCommentContent: string = "";

  static styles = css`
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
  `;

  _authObserver = new Observer<Auth.Model>(this, "fishing:auth");

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this.username = user.username;
      }
    });
  }

  handleCommentInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.newCommentContent = target.value;
  }

  handleAddComment() {
    if (this.newCommentContent.trim() === "") {
      return;
    }

    const newComment: Comment = {
      user: this.username, // Replace with actual user data
      content: this.newCommentContent,
      date: new Date(),
    };

    fetch(`/api/posts/${this.postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((post) => {
        this.comments = post.comments;
        this.newCommentContent = "";
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  }

  render() {
    return html`
      <div class="comments-section">
        <h4>Comments</h4>
        ${this.comments.map(
          (comment) => html`
            <div class="comment">
              <p>
                <strong>${comment.user}</strong> (${new Date(
                  comment.date
                ).toLocaleDateString()}):
              </p>
              <p>${comment.content}</p>
            </div>
          `
        )}
        <div class="comment-input">
          <textarea
            .value="${this.newCommentContent}"
            @input="${this.handleCommentInput}"
            placeholder="Add a comment"
          ></textarea>
          <button @click="${this.handleAddComment}">Add Comment</button>
        </div>
      </div>
    `;
  }
}

customElements.define("post-comments", PostCommentsElement);
