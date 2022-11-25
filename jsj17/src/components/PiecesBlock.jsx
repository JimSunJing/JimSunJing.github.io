import { useState } from "react";
import TextBlock from "./TextBlock"
import { convertHTML } from '../utils';

export default function PiecesBlock({ pieces }) {
  const [answer, setAnswer] = useState("");

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