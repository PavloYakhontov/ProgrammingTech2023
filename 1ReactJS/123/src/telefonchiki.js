// react js phone number book view
import React, { Component } from 'react';
import { ref, getDatabase, onValue, push, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { HiUserRemove } from 'react-icons/hi';
import { HiUserAdd } from 'react-icons/hi';
import { FaUserEdit } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { browserLocalPersistence, setPersistence } from "firebase/auth";

let auth = getAuth();
setPersistence(auth, browserLocalPersistence)

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id || ''+ Math.floor(Math.random() * 1000000000).toString(16),
            editor: props.id || false,
            name: props.name || '',
            phone: props.phone || '',
            email: props.email || '',
            address: props.address || '',
            notes: props.notes || '',
            uid: auth.currentUser.uid
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const db = getDatabase();
        const contactsRef = ref(db, 'contacts/' + this.state.id);
        set(contactsRef, this.state);
        if (!this.state.editor) {
            this.setState({
                id: ''+ Math.floor(Math.random() * 1000000000).toString(16),
                name: '',
                phone: '',
                email: '',
                address: '',
                notes: ''
            })
        }      
    }



    render() {
        return (
            <form className='AddContact' onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" name="name" className="form-control" placeholder='Name' onChange={this.handleChange} value={this.state.name} />
                </div>
                <div className="form-group">
                    <input type="text" name="phone" className="form-control" placeholder='phone' onChange={this.handleChange} value={this.state.phone} />
                </div>
                <div className="form-group">
                    <input type="text" name="email" className="form-control" placeholder='email' onChange={this.handleChange} value={this.state.email} />
                </div>
                <div className="form-group">
                    <input type="text" name="address" className="form-control" placeholder='address' onChange={this.handleChange} value={this.state.address} />
                </div>
                <div className="form-group">
                    <input name="notes" className="form-control" placeholder='notes' onChange={this.handleChange} value={this.state.notes} />
                </div>
                <button className='AddContact2'><HiUserAdd /></button>
            </form>
        )
    }
}

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            uid: auth.currentUser.uid,
            hidden1: false
        }
    }

    HideHide() {
        if (this.state.hidden1) { this.setState({ hidden1: false }) } else { this.setState({ hidden1: true }) };
    }

    handleDelete(event, contantId) {
        event.preventDefault();
        const db = getDatabase();
        const contactsRef = ref(db, 'contacts/' + contantId);
        remove(contactsRef);
    }


    componentDidMount() {
        const db = getDatabase();
        const contactsRef = ref(db, 'contacts');
        onValue(contactsRef, (snapshot) => {
            // show all contacts for current user only using uid
            let contacts = snapshot.val();
            let newState = [];
            for (let contact in contacts) {
                if (contacts[contact].uid === this.state.uid) {
                    newState.push({
                        id: contact,
                        contactid: contacts[contact].id,
                        name: contacts[contact].name,
                        phone: contacts[contact].phone,
                        email: contacts[contact].email,
                        address: contacts[contact].address,
                        notes: contacts[contact].notes
                    })
                }
            }
            this.setState({
                contacts: newState,
                uid: auth.currentUser.uid
            })
        })
    }


    render() {
        return (

            <div>
                <div className='ContactGred'>
                    {
                        this.state.contacts.map((contact) => {
                            return (
                                <div class="border border-warning mt-3" key={contact.id}>
                                    <div class="px-3">
                                        <h3>Name: {contact.name}</h3>
                                        <p>Phone: {contact.phone}</p>
                                        <p>ContactID: {contact.contactid}</p>
                                        <p>
                                        </p>
                                        <div class="collapse" id={contact.name}>
                                            <div>
                                                <p>Email: {contact.email}</p>
                                                <p>Adress: {contact.address}</p>
                                                <p>Note: {contact.notes}</p>
                                            </div>
                                        </div>
                                        <button  onClick={(event) => this.handleDelete(event, contact.id)}><HiUserRemove /></button>
                                        <button type="button" data-bs-toggle="collapse" data-bs-target={"#" + contact.name} aria-expanded="false" aria-controls={contact.name}> <FiMoreHorizontal/></button>
                                        <button id='' type="button" data-bs-toggle="collapse" data-bs-target={"#" + contact.contactid} aria-expanded="false" aria-controls={contact.name}>
                                        <FaUserEdit />
                                        </button>
                                    <div class="collapse" id={contact.contactid}>
                                        <div>
                                            <AddContact name={contact.name} phone={contact.phone} email={contact.email} address={contact.address} notes={contact.notes} id={contact.contactid} />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export class PhoneBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden1: false
        }
    }
    // ensure user is logged in
    componentDidMount() {
        if (!auth.currentUser) {
            this.props.history.push('/login')
        }

    }
    HideHide() {
        if (this.state.hidden1) { this.setState({ hidden1: false }) } else { this.setState({ hidden1: true }) };
    }

    render() {
        return (

            <div class="" >
                <nav class="navbar bg-dark fixed-top" data-bs-theme="dark">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">Тонко та зі смаком</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/login">Пійти геть</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </nav>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div class="row">
                    <div class="col">
                        <ContactList />
                    </div>
                    <div class="col"> <div>
                        <button className='AddContact2' onClick={() => { this.HideHide() }}>Add new contact</button>
                    </div>
                        <div className='AddContact1'>
                            {this.state.hidden1 && <AddContact />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PhoneBook;