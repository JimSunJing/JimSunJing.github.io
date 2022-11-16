import { marked } from 'marked';
import DOMPurify from 'dompurify';
import TextBlock from './TextBlock';

export default function ContentBlock(props) {

  const html = DOMPurify.sanitize(marked.parse(props.md));
  // console.log(html);

  return (
    <div className="content-block">
      <h1>{props.title}</h1>
      <TextBlock html={html}/>
    </div>
  )

}