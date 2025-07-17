'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    
    if (email.value === 'admin@blog.com' && password.value === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin@blog.com / admin123');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>🔐 Admin Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          required 
          style={styles.input}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          required 
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6d28d9, #9333ea)'
  },
  form: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#6d28d9',
    fontWeight: 'bold'
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  },
  button: {
    padding: '12px',
    backgroundColor: '#6d28d9',
    color: '#fff',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  error: {
    color: '#ef4444',
    fontSize: '0.9rem',
    textAlign: 'center'
  }
};
