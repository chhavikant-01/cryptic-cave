import React from 'react';
import { UseSelector, useSelector } from 'react-redux';



const getTopThreeRecentPosts = (posts) => {
    let topThree = [];
    
    // Sort posts by `createdAt` in descending order
    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Get the top 3 posts
    topThree = sortedPosts.slice(0, 3);
    return topThree;
};

const Test = () => {
    const posts = useSelector((state) => state.posts.posts);
    const newPosts = posts.map((post) => {
        return {
            id: post._id,
            createdAt: post.createdAt,
        };
    });
    const topThreePosts = getTopThreeRecentPosts(newPosts);
  console.log(topThreePosts);

  return (
    <div>
      <h1>Top 3 Recent Posts</h1>
      <ul>
        {topThreePosts.map((post) => (
          <li key={post.id}>
            Post ID: {post.id}, Created At: {new Date(post.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
