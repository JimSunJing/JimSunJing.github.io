import { marked } from 'marked';
import DOMPurify from 'dompurify';

const convertHTML = (md) => DOMPurify.sanitize(marked.parse(md));

import * as Realm from 'realm-web'
const REALM_APP_ID = "githubpage-0-ouxqk";

async function loadBlog(blogID) {
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    const blog = await user.functions.getOneBlog(blogID);
    console.log('blog:', blog);
    return blog;
  } catch (error) {
    console.error(error);
  }
}

async function loadPieces(blogID) {
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    const pieces = await user.functions.getPieces(blogID);
    console.log('pieces:', pieces);
    return pieces;
  } catch (error) {
    console.error(error);
  }
}

export {
  convertHTML,
  loadBlog,
  loadPieces
}