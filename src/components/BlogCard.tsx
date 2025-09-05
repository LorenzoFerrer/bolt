import React from 'react';
import { Calendar, User, Edit2, Trash2 } from 'lucide-react';
import { Blog } from '../types/Blog';

interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  onRead: (blog: Blog) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onEdit, onDelete, onRead }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-slate-800 leading-tight mb-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => onRead(blog)}>
            {blog.title}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(blog)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Edit post"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(blog.id)}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-slate-600 mb-4 leading-relaxed">{blog.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.date)}</span>
            </div>
          </div>
          
          <button
            onClick={() => onRead(blog)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
          >
            Read more →
          </button>
        </div>
      </div>
    </div>
  );
};