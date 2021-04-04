import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './NoteDetail.scss';
import apiHandler from '../../apiHandler';
import api from '../../api';

function NoteDetail() {
    const [note, setNote] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            new apiHandler(api.get(`/notes/${id}`))
                .code(200, (res) => {
                    setNote(res.data.data.note);
                })
                .onError(() => {
                    setNote(null);
                })
                .call();
        }
    }, [id]);

    const renderNote = () => {
        if (!note) return;

        return (
            <>
                <div className="image">
                    <img
                        src={`/resourses/img/notes/${note.image}`}
                        alt={note.title}
                    />
                </div>
                <div>
                    <p className="title">{note.title}</p>
                    <p className="description">{note.description}</p>
                </div>
            </>
        );
    };

    return <div className="note-detail">{renderNote()}</div>;
}

export default NoteDetail;
