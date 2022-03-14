import React from 'react';
import CommentSingle from './CommentSingle';

const CommentAll = ({comments}) => {
    return (
        <div className="container">
            {comments.map((c) =>(
                <CommentSingle comment={c} />
            ))}
        </div>
    );
};

export default CommentAll;