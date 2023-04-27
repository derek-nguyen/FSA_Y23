import React, { useState } from "react";
import { fetchFromAPI } from "../utilities/apiClient";

const SendMessage = ({ postItem, storedToken }) => {
    const [message, setMessage] = useState('');
    // console.log(typeof message, message)

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(postItem);

        const messageBody = {
            message: {
                content: message
            }
        }

        if (storedToken) {
            const response = await fetchFromAPI({
                endpoint: 'sendMessage',
                method: 'post',
                token: storedToken,
                body: messageBody,
                // need to set body: message: { content: STRING_MESSAGE_HERE}
            }, postItem._id);

            if (response) {
                setMessage('')
                alert(`Message sent successful: ${message}`)
                console.log(response)
            }
        } else {
            alert('Must log in before sending a message!')
            setMessage('')
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="message-box">
                    <label htmlFor="textbox">Send A Message</label>
                    <br />
                    <input
                        name="textbox"
                        type="text"
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    >
                    </input>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </>
    )
}

export default SendMessage;