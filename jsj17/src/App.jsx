import './App.css'
import { useState, useEffect, useReducer } from 'react';
import ContentBlock from './components/ContentBlock'
import { loadBlog, loadPieces } from './utils';

function App() {
  // sonnet 18: c56916ff-aa7d-482e-86ad-fdaadb586dbe 
  // 斯芬克斯：  86316450-e4e5-4255-a51b-a21b70191940
  const [blogID, setBlogID] = useState('86316450-e4e5-4255-a51b-a21b70191940');

  const [blogs, setBlogs] = useState([]);
  console.log('rendering App, curr blogs:',blogs);
  
  useEffect(() => {
    const load = async () => { 
      // unknow blog, need to load from database
      let res = await loadBlog(blogID);
      let pieces = await loadPieces(res['_id']);
      setBlogs([
        ...blogs.filter(b => b.id !== res.id),
        {
          id: res['_id'],
          date: res.date,
          md: res.md,
          title: res.title,
          type: res.type,
          pieces: pieces,
        }
      ]);
    }
    if (!blogs.find(b => b.id === blogID)){load();}
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
