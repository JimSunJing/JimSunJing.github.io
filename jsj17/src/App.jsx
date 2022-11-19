import './App.css'
import { useState, useEffect, useReducer } from 'react';
import ContentBlock from './components/ContentBlock'
import { loadBlog } from './utils';

function App() {
  // sonnet 18: c56916ff-aa7d-482e-86ad-fdaadb586dbe 
  // 斯芬克斯：  86316450-e4e5-4255-a51b-a21b70191940
  const [blogID, setBlogID] = useState('86316450-e4e5-4255-a51b-a21b70191940');

  const [blogs, setBlogs] = useState([]);
  console.log('rendering App, curr blogs:',blogs);
  
  useEffect(() => {
    const load = async () => { 
      if (typeof blogs.find(b => b.id === blogID) === 'undefined'){
        // unknow blog, need to load from database
        const res = await loadBlog(blogID);
        setBlogs([
          ...blogs.filter(b => b.id !== res.id),
          {
            id: res['_id'],
            date: res.date,
            md: res.md,
            title: res.title,
            type: res.type,
          }
        ]);
      }
    }
    load();
  }, [blogID]);

  
  return (
    <div className="App">
      {
        blogs.find(b => b.id === blogID) &&
        <ContentBlock {...blogs.find(b => b.id === blogID)}/>
      }
    </div>
  )
}

export default App
