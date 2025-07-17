'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editing, setEditing] = useState({ active: false, id: null });

  useEffect(() => {
    if (!localStorage.getItem('isAuthenticated')) router.push('/admin/login');
    else {
      setLoading(false);
      const stored = localStorage.getItem('blogs');
      if (stored) setBlogs(JSON.parse(stored));
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlogs = editing.active 
      ? blogs.map(b => b.id === editing.id ? { ...form, id: editing.id } : b)
      : [...blogs, { ...form, id: Date.now() }];
    
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setForm({ title: '', content: '' });
    setEditing({ active: false, id: null });
  };

  if (loading) return <div style={{textAlign:'center', padding:'50px'}}>Loading...</div>;
  return (
    <div style={{padding:'20px', maxWidth:'1200px', margin:'0 auto'}}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
        <h1>Blog Management</h1>
        <button 
          style={{padding:'8px 15px', background:'#ff4444', color:'white', border:'none', borderRadius:'4px'}}
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            router.push('/admin/login');
          }}
        >
          Logout
        </button>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:'20px'}}>
        <div style={{background:'white', padding:'20px', borderRadius:'5px', boxShadow:'0 2px 5px rgba(0,0,0,0.1)'}}>
          <h2>{editing.active ? 'Edit Blog' : 'New Blog'}</h2>
          <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            <input
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
              placeholder="Title"
              required
              style={{padding:'10px', border:'1px solid #ddd', borderRadius:'4px'}}
            />
            <textarea
              value={form.content}
              onChange={(e) => setForm({...form, content: e.target.value})}
              placeholder="Content"
              required
              style={{padding:'10px', border:'1px solid #ddd', borderRadius:'4px', height:'150px'}}
            />
          <button 
  style={{
    padding: '10px 20px',
    background: editing.active ? '#f59e0b' : '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s ease'
  }}
>
  {editing.active ? 'Update' : 'Create'}
</button>

          </form>
        </div>

        <div>
          <h2>Your Blogs</h2>
          {blogs.length === 0 ? (
            <p>No blogs yet!</p>
          ) : (
            blogs.map(blog => (
             <div key={blog.id} style={{
  background: '#fff',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb'
}}>

                <h3 style={{marginBottom:'5px'}}>{blog.title}</h3>
                <p style={{marginBottom:'10px'}}>{blog.content}</p>
                <div style={{display:'flex', gap:'10px'}}>
                  <button 
                    style={{padding:'8px 15px', background:'#2196F3', color:'white', border:'none', borderRadius:'4px'}}
                    onClick={() => {
                      setForm(blog);
                      setEditing({ active: true, id: blog.id });
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    style={{padding:'8px 15px', background:'#ff4444', color:'white', border:'none', borderRadius:'4px'}}
                    onClick={() => {
                      if (confirm('Delete this blog?')) {
                        setBlogs(blogs.filter(b => b.id !== blog.id));
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}