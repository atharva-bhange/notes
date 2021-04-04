import React from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';

import { searchNotes } from '../../action';

function Search({ searchNotes }) {
    const searchForm = useFormik({
        initialValues: {
            search: '',
        },
        onSubmit: (values) => {
            searchNotes(values.search);
        },
        validate: (values) => {
            const errors = {};

            if (!values.search) {
                errors.search = 'Required';
            }

            return errors;
        },
    });

    return (
        <Form onSubmit={searchForm.handleSubmit}>
            <Form.Row>
                <Col>
                    <Form.Control
                        id="search"
                        name="search"
                        type="text"
                        onChange={searchForm.handleChange}
                        value={searchForm.values.search}
                        placeholder="Search"
                    />
                </Col>
                <Col>
                    <Button type="submit" variant="secondary">
                        <i class="fas fa-search"></i>
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    );
}

export default connect(null, { searchNotes })(Search);
