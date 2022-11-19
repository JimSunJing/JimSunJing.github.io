import { useState } from "react";
import TextBlock from "./TextBlock"
import { convertHTML, loadPieces } from '../utils';
import { useEffect } from "react";

export default function PiecesBlock({ blog }) {
  const [answer, setAnswer] = useState("");
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const load = async () => {
      const ps = await loadPieces(blog.id);
      setPieces(ps);
    }
    load();
  }, [])

  const submitAnswer = (e) => {
    e.preventDefault();
    const solution = pieces.find(p => p.type === 'A');
    const regex = new RegExp(solution.md, 'i');
    if (regex.test(answer)){
      // answer correct
      alert('correct!');
    }else {
      // false
      alert('wrong answer.');
    }

  }

  return (
    <div>
      { 
        pieces && pieces.find(p => p.type === 'Q') && 
        pieces.filter(p => p.type === 'Q')
          .map(p => <TextBlock key={p['_id']} html={convertHTML(p.md)} />) 
      }
      { pieces && pieces.find(p => p.type === 'A') && 
        <div>
          <input placeholder="Enter Answer" value={answer}
            onChange={e => setAnswer(e.target.value)}/>
          <button onClick={submitAnswer}>submit</button>
        </div>
      }
    </div>
  )
}