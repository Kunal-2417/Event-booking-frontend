import React from 'react';

function Blank() {
    return (
        <div>
            {[...Array(10)].map((_, i) => (
                <br key={i} />
            ))}
        </div>
    );
}

export default Blank;
