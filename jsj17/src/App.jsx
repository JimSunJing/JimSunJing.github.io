import './App.css'

import ContentBlock from './components/ContentBlock'

function App() {

  return (
    <div className="App">
      <ContentBlock {...testBlog}/>
    </div>
  )
}

const testBlog = {
  md: "## Why should you love people?\nhi, can I have a **picture**?\n\nabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
}

export default App
