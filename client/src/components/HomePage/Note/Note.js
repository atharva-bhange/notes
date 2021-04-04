import React from 'react';

import './Note.scss';

function Note({ title, description }) {
    return (
        <div className="note">
            <div className="row1">
                <h2>{title}</h2>
                <i className="fas fa-pencil-alt icon"></i>
                <i className="fas fa-trash icon" style={{ color: 'red' }}></i>
            </div>
            <p>{description}</p>
        </div>
    );
}

export default Note;
