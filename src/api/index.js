import { testEmail, testPassword, users, posts } from "../dummy-data";

let nextPostId = posts.length + 1;
const _randomDelay = () => Math.floor(Math.random() * 2000);

export async function signIn(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === testEmail && password === testPassword) {
        resolve(users[0]);
      } else {
        reject(new Error("Wrong email or password."));
      }
    }, _randomDelay());
  });
}

export async function loadPostsForHome() {
  const results = posts
    .filter(p => p.status === "published")
    .map(post => {
      const { authorId, body, ...rest } = post;
      const author = users.find(u => u.id === authorId);
      return {
        ...rest,
        author: {
          id: author.id,
          name: author.name,
          avatar: author.avatar
        }
      };
    });

  return new Promise(resolve =>
    setTimeout(() => resolve(results), _randomDelay())
  );
}

export async function loadUser(userId) {
  const user = users.find(u => u.id === userId);
  const userPosts = user
    ? posts
        .filter(p => p.authorId === userId && p.status === "published")
        .map(({ body, ...rest }) => rest)
    : null;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user) {
        resolve({ ...user, posts: userPosts });
      } else {
        reject(new Error("User not found."));
      }
    }, _randomDelay());
  });
}

export async function loadPost(postId) {
  const post = posts.find(p => p.id === postId);
  const user = post ? users.find(u => u.id === post.authorId) : null;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (post) {
        const { authorId, ...rest } = post;
        resolve({ ...rest, author: user });
      } else {
        reject(new Error("Post not found."));
      }
    }, _randomDelay());
  });
}

export async function loadMyPosts() {
  const userId = users[0].id;
  const userPosts = posts
    .filter(p => p.authorId === userId)
    .map(({ body, ...rest }) => rest);

  return new Promise(resolve => {
    setTimeout(() => resolve(userPosts), _randomDelay());
  });
}

export async function addPost(input) {
  const post = {
    id: nextPostId.toString(),
    ...input,
    updatedAt: Date.now(),
    authorId: users[0].id
  };

  return new Promise(resolve => {
    setTimeout(() => {
      nextPostId++;
      posts.push(post);
      resolve(post);
    }, _randomDelay());
  });
}

export async function updatePost(input) {
  const post = {
    ...input,
    updatedAt: Date.now(),
    authorId: users[0].id
  };

  return new Promise(resolve => {
    setTimeout(() => {
      Object.assign(posts.find(p => p.id === post.id), post);
      resolve(post);
    }, _randomDelay());
  });
}

export async function deletePost(postId) {
  return new Promise(resolve => {
    setTimeout(() => {
      posts.splice(posts.findIndex(p => p.id === postId), 1);
      resolve();
    }, _randomDelay());
  });
}
