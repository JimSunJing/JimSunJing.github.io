import * as Realm from 'realm-web'

const REALM_APP_ID = "githubpage-0-ouxqk";

// deprecated
// deprecated
// deprecated
// deprecated
// deprecated


function blogsReducer(blogs, action) {
  switch(action.type){
    case 'loadBlog': {
      // load blog content from mongoDB, require blogID
      const b = loadBlog(action.blogID);
      return [
        ...blogs.filter(b => b.id !== action.blogID),
        {
          id: b['_id'],
          date: b.date,
          md: b.md,
          title: b.title,
          type: b.type,
        }
      ]
      break;
    }
    case 'loadPieces': {
      // load pieces from mongoDB, require blogID
      const blog = blogs.find(b => b.id === action.blogID);
      if (blog && blog.type === 'pieces'){
        const pieces = loadPieces(action.blogID);
        return [
          ...blogs.filter(b => b.id !== action.blogID),
          {
            ...blog,
            pieces: pieces,
          }
        ]
      }else {
        throw Error(`${action.blogID} is not pieces type.`);
      }
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

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

export default blogsReducer;