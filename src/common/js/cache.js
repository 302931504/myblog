import storage from 'good-storage';

const BLOG_KEY = '__blog__';
const USER_KEY = '__user__';

export function loadBlogs () {
  return storage.get(BLOG_KEY, []);
}

export function saveBlogs (id) {
  let blogs = storage.get(BLOG_KEY, []);
  blogs.push(id);
  storage.set(BLOG_KEY, blogs);
  return blogs;
}

export function loaduser () {
  return storage.get(USER_KEY, {});
}

export function saveUser (user) {
  let currentUser = storage.get(USER_KEY, {});
  currentUser = user;
  storage.set(USER_KEY, currentUser);
  return currentUser;
}