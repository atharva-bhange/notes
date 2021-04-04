import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Search from '../Search';
import Note from './Note';
import './HomePage.scss';
import { getAllNotes } from '../../action';

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
                    id={note._id}
                />
            ));
        }
    };

    return (
        <div className="homepage">
            <div className="heading">
                <div className="header">Notes</div>
                <Search />
                <Link to="/create">
                    <Button variant="success" className="ml-2">
                        <i class="fas fa-plus"></i>
                    </Button>
                </Link>
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
