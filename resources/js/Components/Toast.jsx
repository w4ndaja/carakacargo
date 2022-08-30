import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
function Toast(props, ref) {
    const [messages, setMessages] = useState([]);
    const [show, setShow] = useState(false);
    useImperativeHandle(ref, () => ({
        push: message => {
            setMessages(messages => [message, ...messages]);
            setShow(true);
        }
    }));
    useEffect(() => {
        const timer = () => setTimeout(() => setShow(false), 2000);
        const timerId = timer();
        if (messages.length > 3) {
            setMessages(messages => {
                let _messages = [...messages];
                _messages.shift();
                return _messages;
            });
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [messages]);

    return show && (
        <div className='flex flex-col gap-2 fixed top-0 right-0 z-10 mr-5 mt-5'>
            { messages.map((item, i) => <div key={ i } className=' bg-green-600/20 text-green-500 font-bold border-green-500 shadow-green-700 px-4 py-2 rounded-xl'>{ item }</div>) }
        </div>
    );
}

Toast = forwardRef(Toast);
export default Toast;
