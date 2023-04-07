import React from 'react';

const ContactRow = (props) => {
    const {selectContacts} = props;
    return (
        <tr onClick={() => props.selectContacts(props.contact.id)}>
            <td>{props.contact.name}</td>
            <td>{props.contact.phone}</td>
            <td>{props.contact.email}</td>
        </tr>
    )
}

export default ContactRow