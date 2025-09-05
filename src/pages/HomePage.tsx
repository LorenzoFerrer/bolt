import React, { useState } from 'react';
import { BlogCard } from '../components/BlogCard';
import { BlogModal } from '../components/BlogModal';
import { useBlogs } from '../hooks/useBlogs';
import { Blog } from '../types/Blog';

export const HomePage: React.FC = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlogs();
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'read' as 'read' | 'edit' | 'create',
    selectedBlog: null as Blog | null
  });

  const openModal = (mode: 'read' | 'edit' | 'create', blog?: Blog) => {
    setModalState({
      isOpen: true,
      mode,
      selectedBlog: blog || null
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: 'read',
      selectedBlog: null
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlog(id);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Welcome to <span className="text-blue-600">BlogCraft</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Discover insightful articles about web development, design, and technology. 
          Create, edit, and manage your blog posts with our intuitive interface.
        </p>
      </div>

      {/* Blog Posts */}
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Latest Posts</h2>
          <span className="text-sm text-slate-500">
            {blogs.length} {blogs.length === 1 ? 'post' : 'posts'} available
          </span>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-slate-400">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No posts yet</h3>
            <p className="text-slate-500 mb-6">Create your first blog post to get started!</p>
            <button
              onClick={() => openModal('create')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onRead={(blog) => openModal('read', blog)}
                onEdit={(blog) => openModal('edit', blog)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <BlogModal
        blog={modalState.selectedBlog}
        mode={modalState.mode}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSave={addBlog}
        onUpdate={updateBlog}
      />
    </div>
  );
};