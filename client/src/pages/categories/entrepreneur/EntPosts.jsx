import React from 'react';
import EntPost from './EntPost';

const EntPosts = ({posts}) => {
    return (
        <div className="container"> 
            {posts.map((p) => (
        <EntPost post={p}></EntPost>
      ))}
        </div>
    );
};

export default EntPosts;