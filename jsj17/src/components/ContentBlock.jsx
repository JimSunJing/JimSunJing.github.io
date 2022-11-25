import { convertHTML } from '../utils';
import TextBlock from './TextBlock';
import PiecesBlock from './PiecesBlock';

export default function ContentBlock(blog) {

  return (
    <div className="content-block">
      <h1>{ blog.title ? blog.title : 'Loading...' }</h1>
      { blog.md && <TextBlock html={convertHTML(blog.md)}/> }
      { blog.pieces && <PiecesBlock pieces={blog.pieces}/>
      }
    </div>
  )

}