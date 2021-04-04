import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { updateNote } from '../../action';
import './UpdateForm.scss';
import apiHandler from '../../apiHandler';
import api from '../../api';

function UpdateForm({ updateNote }) {
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

    const createForm = useFormik({
        initialValues: {
            title: note ? note.title : '',
            description: note ? note.description : '',
            image: null,
        },
        onSubmit: (values) => {
            updateNote(values, note._id);
        },
        validate: (values) => {
            const errors = {};

            return errors;
        },
        enableReinitialize: true,
    });

    return (
        <div className="create-form">
            <Form
                onSubmit={createForm.handleSubmit}
                encType="multipart/form-data"
            >
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        id="title"
                        name="title"
                        onChange={createForm.handleChange}
                        value={createForm.values.title}
                        type="text"
                        placeholder="Enter Title"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        id="description"
                        name="description"
                        onChange={createForm.handleChange}
                        value={createForm.values.description}
                        as="textarea"
                        placeholder="Description"
                    />
                </Form.Group>
                <Form.Group>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={(event) => {
                            createForm.setFieldValue(
                                'image',
                                event.currentTarget.files[0]
                            );
                        }}
                        className="form-control"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!note}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default connect(null, { updateNote })(UpdateForm);
