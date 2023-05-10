// react js phone number book view
import React, { Component } from 'react';
import { ref, getDatabase, onValue, push,set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import {HiUserRemove} from 'react-icons/hi';
import {HiUserAdd} from 'react-icons/hi';

let auth = getAuth();

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            address: '',
            notes: '',
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
        const contactsRef = push(ref(db, 'contacts'));
        set(contactsRef, this.state);
        this.setState({
            name: '',
            phone: '',
            email: '',
            address: '',
            notes: '',
            uid: auth.currentUser.uid
        })
    }

    

    render() {
        return (
            <div class="container text-center">
                <h1>Add Contact</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" className="form-control" onChange={this.handleChange} value={this.state.name} />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" name="phone" className="form-control" onChange={this.handleChange} value={this.state.phone} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" name="email" className="form-control" onChange={this.handleChange} value={this.state.email} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" name="address" className="form-control" onChange={this.handleChange} value={this.state.address} />
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <textarea name="notes" className="form-control" onChange={this.handleChange} value={this.state.notes} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary"><HiUserAdd/></button>
                    </div>
                </form>
            </div>
        )
    }
}

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            uid: auth.currentUser.uid
        }
    }
    handleDelete(event, contantId) {
        event.preventDefault();
        const db = getDatabase();
        const contactsRef = ref (db, 'contacts/' + contantId);
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
            <div class="container text-center">
                <h1>Contacts</h1>
                <ul>
                    {
                        this.state.contacts.map((contact) => {
                            return (
                                <li key={contact.id}>
                                    <h3>{contact.name}</h3>
                                    <p>{contact.phone}</p>
                                    <p>{contact.email}</p>
                                    <p>{contact.address}</p>
                                    <p>{contact.notes}</p>
                                    <button onClick={(event) => this.handleDelete(event, contact.id)}><HiUserRemove scale="5" width={"50"} size="50px"/></button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export class PhoneBook extends Component {
    // ensure user is logged in
    componentDidMount() {
        if (!auth.currentUser) {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div>
                <AddContact />
                <ContactList />
            </div>
        )
    }
}
export default PhoneBook;