import React, { useState, useEffect } from 'react';
import { X, Calendar, User } from 'lucide-react';
import { Blog } from '../types/Blog';

interface BlogModalProps {
  blog: Blog | null;
  mode: 'read' | 'edit' | 'create';
  isOpen: boolean;
  onClose: () => void;
  onSave?: (blog: Omit<Blog, 'id'>) => void;
  onUpdate?: (id: string, blog: Partial<Blog>) => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ 
  blog, 
  mode, 
  isOpen, 
  onClose, 
  onSave, 
  onUpdate 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    excerpt: ''
  });

  useEffect(() => {
    if (blog && (mode === 'edit' || mode === 'read')) {
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        excerpt: blog.excerpt
      });
    } else if (mode === 'create') {
      setFormData({
        title: '',
        content: '',
        author: '',
        excerpt: ''
      });
    }
  }, [blog, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'create' && onSave) {
      const newBlog = {
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      onSave(newBlog);
    } else if (mode === 'edit' && blog && onUpdate) {
      onUpdate(blog.id, formData);
    }
    
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">
            {mode === 'create' && 'Create New Post'}
            {mode === 'edit' && 'Edit Post'}
            {mode === 'read' && blog?.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {mode === 'read' && blog ? (
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6 text-sm text-slate-500">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.date)}</span>
                </div>
              </div>
              
              <div className="prose prose-slate max-w-none">
                {blog.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Excerpt
                </label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Brief description of your post..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                  placeholder="Write your blog content here..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {mode === 'create' ? 'Create Post' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};