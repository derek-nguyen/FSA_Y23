import React, { useState } from "react";
import { fetchFromAPI } from "../utilities/apiClient";

const SendMessage = ({ postItem, storedToken }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            }, postItem._id);

            if (response) {
                setMessage('')
                alert(`Message sent successful: ${message}`)
            }
        } else {
            alert('Must log in before sending a message!')
            setMessage('')
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="send-message">
                <div className="message-box">
                    <label htmlFor="textbox">Send A Message</label>
                    <br />
                    <input
                        name="textbox"
                        type="text"
                        required
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    >
                    </input>
                </div>
                <button type="submit" className="post-btn">Send Message</button>
            </form>
        </>
    )
}

export default SendMessage;