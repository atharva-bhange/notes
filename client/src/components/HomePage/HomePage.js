import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Search from '../Search';

import Note from './Note';
import './HomePage.scss';
import { getAllNotes } from '../../action';
import { Button } from 'react-bootstrap';

function HomePage({ getAllNotes, notes }) {
    useEffect(getAllNotes, [getAllNotes]);

    const renderNotes = () => {
        if (notes.length === 0) {
            return 'No Notes Found';
        } else {
            return notes.map((note) => (
                <Note
                    key={note._id}
                    title={note.title}
                    description={note.description}
                />
            ));
        }
    };

    return (
        <div className="homepage">
            <div className="heading">
                <div className="header">Notes</div>

                <Search />
            </div>
            {renderNotes()}
        </div>
    );
}

const mapStateToprops = (state) => {
    return {
        notes: state.notes,
    };
};

export default connect(mapStateToprops, { getAllNotes })(HomePage);
