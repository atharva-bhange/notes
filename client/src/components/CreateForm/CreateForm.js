import React from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { createNote } from '../../action';
import './CreateForm.scss';

function CreateForm({ createNote }) {
    const createForm = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: null,
        },
        onSubmit: (values) => {
            createNote(values);
        },
        validate: (values) => {
            const errors = {};

            return errors;
        },
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default connect(null, { createNote })(CreateForm);
