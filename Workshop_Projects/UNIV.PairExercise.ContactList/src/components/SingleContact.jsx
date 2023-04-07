import React from "react";

const SingleContact = (props) => {
    return (
        <div id="single-contact">
    <div id="contact-info">
        <p><b>Name:</b> {props.selectedContact.name} </p>
        <p><b>Email:</b> {props.selectedContact.email} </p>
        <p><b>Phone:</b> {props.selectedContact.phone} </p>
        <div>
            <b>Address:</b>
            <p>
                <b>Street:</b> {props.selectedContact.address.street} 
                <br />
                <b>City/State:</b> {props.selectedContact.address.city} {props.selectedContact.address.zipcode}
            </p>
        </div>
        <p><b>Company:</b>{props.selectedContact.company.name} </p>
    </div>
</div>
    )
}

export default SingleContact;