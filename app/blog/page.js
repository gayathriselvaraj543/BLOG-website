'use client';
import { useEffect, useState } from 'react';

export default function BlogDisplay() {
  const [blogs, setBlogs] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
    const stored = localStorage.getItem('blogs');
    if (stored) setBlogs(JSON.parse(stored));
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div style={styles.container(theme === 'dark')}>
      <div style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1>📝 Our Blog</h1>
          <button onClick={toggleTheme} style={styles.toggleBtn(theme === 'dark')}>
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'} Mode
          </button>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {blogs.length === 0 ? <p>No blogs yet!</p> : blogs.map(blog => (
            <div key={blog.id} style={styles.card(theme === 'dark')}>
              {blog.imagePreview && <img src={blog.imagePreview} alt={blog.title} style={styles.imagePreview} />}
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


const styles = {
  container: (isDark) => ({
    minHeight: '100vh',
    backgroundColor: themeStyles(isDark).pageBg,
    color: themeStyles(isDark).text,
    fontFamily: 'Segoe UI, sans-serif',
    padding: '2rem'
  }),
  card: (isDark) => ({
    backgroundColor: themeStyles(isDark).cardBg,
    padding: '1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '12px',
    boxShadow: themeStyles(isDark).shadow,
    border: themeStyles(isDark).border,
    transition: 'transform 0.2s',
  }),
  toggleBtn: (isDark) => ({
    padding: '10px 20px',
    marginTop: '1rem',
    backgroundColor: themeStyles(isDark).primary,
    color: '#fff',
    borderRadius: '10px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  }),
  imagePreview: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '1rem',
    objectFit: 'cover',
    height: '200px'
  }
};

const themeStyles = (isDark) => ({
  pageBg: isDark ? '#121212' : '#f9f9f9',
  text: isDark ? '#ffffff' : '#1a1a1a',
  cardBg: isDark ? '#1e1e1e' : '#ffffff',
  shadow: isDark ? '0 4px 10px rgba(0,0,0,0.4)' : '0 4px 10px rgba(0,0,0,0.1)',
  border: isDark ? '1px solid #333' : '1px solid #ddd',
  primary: isDark ? '#0070f3' : '#0070f3'
});

