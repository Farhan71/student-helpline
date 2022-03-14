import React from 'react';
import OtherThingsPost from './OtherThingsPost';

const OtherThingsPosts = ({posts}) => {
    return (
        <div className="container" >
            {posts.map((p) =>(
                <OtherThingsPost post={p} />
            ))}
        </div>
    );
};

export default OtherThingsPosts;