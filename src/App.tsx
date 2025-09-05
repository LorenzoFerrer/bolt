import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogModal } from './components/BlogModal';
import { useBlogs } from './hooks/useBlogs';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { addBlog } = useBlogs();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handlePageChange = (page: string) => {
    if (page === 'create') {
      setShowCreateModal(true);
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={handlePageChange}>
      {renderPage()}
      
      <BlogModal
        blog={null}
        mode="create"
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={(blog) => {
          addBlog(blog);
          setShowCreateModal(false);
        }}
      />
    </Layout>
  );
}

export default App;