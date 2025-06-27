import fetch from "isomorphic-fetch";
import { API } from "../../config";

export const createBlog = async (blog, token) => {
  try {
    const response = await fetch(`${API}/blog`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const listBlogsWithCategoriesAndTags = async () => {
  try {
    const response = await fetch(`${API}/blogs-categories-tags`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const allblogs = async () => {
  try {
    const response = await fetch(`${API}/allblogs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getAllBlogSlugs = async () => {
  try {
    const response = await fetch(`${API}/allblogslugs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const singleBlog = async (slug) => {
  try {
    const response = await fetch(`${API}/blog/${slug}`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const listRelated = async (slug) => {
  try {
    const response = await fetch(`${API}/blog/related/${slug}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const removeBlog = async (slug, token) => {
  try {
    const response = await fetch(`${API}/blog/${slug}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const updateBlog = async (blog, token, slug) => {
  try {
    const response = await fetch(`${API}/blog/${slug}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const list = async (page) => {
  try {
    const response = await fetch(`${API}/blogs?page=${page}`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
