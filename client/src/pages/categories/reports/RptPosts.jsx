import React from 'react';
import RptPost from './RptPost';

const RptPosts = ({posts}) => {
    return (
        <div className="container"> 
        {posts.map((p) => (
    <RptPost post={p} />
  ))}
    </div>
    );
};

export default RptPosts;