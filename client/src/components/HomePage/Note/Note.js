import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import './Note.scss';
import { deleteNote } from '../../../action';

function Note({ title, description, deleteNote, id }) {
    return (
        <div className="note">
            <div className="row1">
                <h2>
                    <Link to={`/note/${id}`}>{title}</Link>
                </h2>
                <Link to={`/update/${id}`}>
                    <i className="fas fa-pencil-alt icon"></i>
                </Link>
                <i
                    className="fas fa-trash icon"
                    style={{ color: 'red' }}
                    onClick={() => deleteNote(id)}
                ></i>
            </div>
            <p>{description}</p>
        </div>
    );
}

export default connect(null, { deleteNote })(Note);
