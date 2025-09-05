import { useState, useEffect } from 'react';
import { Blog } from '../types/Blog';
import { initialBlogs } from '../data/initialBlogs';

const STORAGE_KEY = 'blog-posts';

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem(STORAGE_KEY);
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      setBlogs(initialBlogs);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBlogs));
    }
  }, []);

  const saveToStorage = (updatedBlogs: Blog[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
  };

  const addBlog = (blog: Omit<Blog, 'id'>) => {
    const newBlog: Blog = {
      ...blog,
      id: Date.now().toString(),
    };
    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    saveToStorage(updatedBlogs);
    return newBlog;
  };

  const updateBlog = (id: string, updatedBlog: Partial<Blog>) => {
    const updatedBlogs = blogs.map(blog =>
      blog.id === id ? { ...blog, ...updatedBlog } : blog
    );
    setBlogs(updatedBlogs);
    saveToStorage(updatedBlogs);
  };

  const deleteBlog = (id: string) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
    saveToStorage(updatedBlogs);
  };

  const getBlog = (id: string) => {
    return blogs.find(blog => blog.id === id);
  };

  return {
    blogs,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlog,
  };
};