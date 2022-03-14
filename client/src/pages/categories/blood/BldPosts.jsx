import React from 'react';
import BldPost from './BldPost';

const BldPosts = ({posts}) => {
    return (
        <div className="container"> 
        {posts.map((p) => (
    <BldPost post={p}></BldPost>
  ))}
    </div>
    );
};

export default BldPosts;