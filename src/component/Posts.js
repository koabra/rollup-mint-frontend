//how to import components 

import React from "react";
import axios from "axios"; //To use the dependency called "axios" we need firstly install it using the command "npm install axios".
//addded dependency will be shown in node_modules, also it will be reviewed in "package.json's dependencies" section.
function Posts() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://jsonplaceholder.typicode.com/posts") //requesting to fetch the posts from JSON placeholder.
      .then((response) => setPosts(response.data));
  }, []);

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li className="post" key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
//fetching post data from Post component is done, to display it in our App, we should import it.