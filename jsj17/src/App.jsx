import './App.css'
import { useState, useEffect } from 'react';
import ContentBlock from './components/ContentBlock'
import * as Realm from 'realm-web'


function App() {
  const [mdID, setMdID] = useState(1);
  const [blog, setBlog] = useState({md: '# Loading...'});
  
  useEffect(() => { async function loadMD() {
    const REALM_APP_ID = "githubpage-0-ouxqk";
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const blog = await user.functions.getOneBlog(mdID);
      console.log(blog);
      setBlog(blog);
    } catch (error) {
      console.error(error);
    }}
    loadMD();
  }, [mdID]);

  return (
    <div className="App">
      <ContentBlock title={blog.title} md={blog.md}/>
    </div>
  )
}

const testBlog = {
  md: "## Why should you love people?\nhi, can I have a **picture**?\n\nabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
}

export default App
