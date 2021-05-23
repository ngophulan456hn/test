import React from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';

const dataURL = "https://jsonplaceholder.typicode.com/posts";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoaded: false,
            error: null,
            showCreateModal: false,
            showEditModal: false,
            showDeleteModal: false,
            nextId: 0,

            id: null,
            userId: null,
            title: null,
            body: null,
        };
        this.loadData();
    }

    loadData = () => {
        fetch(dataURL, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    localStorage.setItem('data', JSON.stringify(data));
                    var max = Math.max.apply(Math, data.map(i => i.id)) + 1;
                    this.setState({
                        data: data,
                        isLoaded: true,
                        nextId: max
                    })
                } else {
                    this.setState({
                        data: null,
                        isLoaded: true,
                        nextId: 0
                    })
                }
            })
            .catch(() => {
                console.error();
            });
    };

    refresh = () => {
        var data = JSON.parse(localStorage.getItem('data'));
        this.setState({
            data: data
        })
    };

    handleShowCreateModal = () => {
        this.setState({ showCreateModal: true });
    };

    handleCloseCreateModal = () => {
        this.setState({ showCreateModal: false });
    };

    handleShowEditModal = (prop) => {
        var data = JSON.parse(localStorage.getItem('data'));
        var item = data.find(i => i.id === prop);
        this.setState({
            id: item.id,
            userId: item.userId,
            title: item.title,
            body: item.body,
            showEditModal: true
        });
    };

    handleCloseEditModal = () => {
        this.setState({ showEditModal: false });
    };

    handleShowDeleteModal = (prop) => {
        this.setState({
            id: prop,
            showDeleteModal: true
        });
    };

    handleCloseDeleteModal = () => {
        this.setState({ showDeleteModal: false });
    };

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleCreateItem = () => {
        var item = {
            id: this.state.nextId,
            userId: this.state.userId,
            title: this.state.title,
            body: this.state.body,
        };

        var data = JSON.parse(localStorage.getItem('data'));

        data.push(item);

        var max = Math.max.apply(Math, data.map(i => i.id)) + 1;
        this.setState({
            data: data,
            nextId: max,
            showCreateModal: false
        });
        localStorage.setItem('data', JSON.stringify(data));

        alert("Create Item Success");
    }

    handleEditItem = () => {
        var item = {
            id: this.state.id,
            userId: this.state.userId,
            title: this.state.title,
            body: this.state.body,
        };

        var data = JSON.parse(localStorage.getItem('data'));
        var existingObj = data.find(i => i.id === item.id);

        if (existingObj) {
            Object.assign(existingObj, item);

            this.setState({
                data: data,
                showEditModal: false
            });

            localStorage.setItem('data', JSON.stringify(data));
            alert("Edit Item Success");
        } else {
            alert("Item not exist");
        }
    }

    handleDeleteItem = () => {
        var id = this.state.id;

        var data = JSON.parse(localStorage.getItem('data'));
        data = data.filter(i => i.id !== id);

        this.setState({
            data: data,
            showDeleteModal: false
        });

        localStorage.setItem('data', JSON.stringify(data));
        alert("Delete Item Success");
    }

    render() {
        const { data, isLoaded, showCreateModal, showEditModal, showDeleteModal } = this.state;
        if (!isLoaded) {
            return (
                <div style={{ textAlign: 'center', marginTop: '10%' }}>
                    <h1>Loading ....</h1>
                    <h1>This may take awhile depends on your internet connection</h1>
                </div>
            );
        } else {
            return (
                <div style={{ textAlign: 'center', marginTop: '10%' }}>
                    <h1 style={{ marginBottom: '2%' }}>Table</h1>
                    <Button style={{ marginBottom: '2%' }} onClick={this.handleShowCreateModal}>Create new item</Button>
                    <Button style={{ marginBottom: '2%', marginLeft: '2%' }} onClick={this.refresh}>Refresh</Button>
                    <Button style={{ marginBottom: '2%', marginLeft: '2%' }} onClick={this.loadData}>Reload</Button>
                    <Table striped bordered hover variant="dark">
                        <tr>
                            <th style={{ width: '5%' }}>Id</th>
                            <th style={{ width: '5%' }}>User Id</th>
                            <th style={{ width: '30%' }}>Title</th>
                            <th style={{ width: '45%' }}>Body</th>
                            <th style={{ width: '15%' }}>Action</th>
                        </tr>
                        {
                            //console.log(data)
                            data.map(item => (
                                <tr key={item.id}>
                                    <td style={{ textAlign: 'center' }}>{item.id}</td>
                                    <td style={{ textAlign: 'center' }}>{item.userId}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button onClick={() => this.handleShowEditModal(item.id)} style={{ marginRight: '15%', marginLeft: '5%' }}>Edit</Button>
                                        <Button variant="danger" onClick={() => this.handleShowDeleteModal(item.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </Table>

                    <Modal show={showCreateModal} onHide={this.handleCloseCreateModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create New Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Form>
                                    <Form.Group controlId="formId">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" value={this.state.nextId} disabled onChange={this.handleChange('id')} />
                                    </Form.Group>

                                    <Form.Group controlId="formUserId">
                                        <Form.Label>User Id</Form.Label>
                                        <Form.Control type="number" onChange={this.handleChange('userId')} min={0} />
                                    </Form.Group>

                                    <Form.Group controlId="formId">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" onChange={this.handleChange('title')} />
                                    </Form.Group>

                                    <Form.Group controlId="formId">
                                        <Form.Label>Body</Form.Label>
                                        <Form.Control as="textarea" rows={3} onChange={this.handleChange('body')} />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseCreateModal}>Close</Button>
                            <Button variant="primary" onClick={this.handleCreateItem}>Create Item</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showEditModal} onHide={this.handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Form>
                                    <Form.Group controlId="formId">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" value={this.state.id} disabled onChange={this.handleChange('id')} />
                                    </Form.Group>

                                    <Form.Group controlId="formUserId">
                                        <Form.Label>User Id</Form.Label>
                                        <Form.Control type="number" value={this.state.userId} onChange={this.handleChange('userId')} min={0} />
                                    </Form.Group>

                                    <Form.Group controlId="formId">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" value={this.state.title} onChange={this.handleChange('title')} />
                                    </Form.Group>

                                    <Form.Group controlId="formId">
                                        <Form.Label>Body</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={this.state.body} onChange={this.handleChange('body')} />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseEditModal}>Close</Button>
                            <Button variant="primary" onClick={this.handleEditItem}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showDeleteModal} onHide={this.handleCloseDeleteModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Do you want to delete this item?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseDeleteModal}>Close</Button>
                            <Button variant="danger" onClick={this.handleDeleteItem}>Delete Item</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
    }
}

export default Home;