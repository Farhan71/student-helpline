import React from 'react';
import BookPost from './BookPost'

const BookPosts = ({posts}) => {
    return (
        <div> 
            {posts.map((p) => (
        <BookPost post={p} />
      ))}
        </div>
    );
};

export default BookPosts;