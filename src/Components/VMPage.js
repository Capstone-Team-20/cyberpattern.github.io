import React from 'react';

const VMPage = ({ viewOnly, shouldReconnect, password }) => {
    const vncUrl = `https://72.209.113.80/vnc.html?autoconnect=true&reconnect=${shouldReconnect}&view_only=${viewOnly}&password=${password}`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <h1 style={{ textAlign: 'center', margin: '0 0 10px 0', color: 'white', fontSize: '20px' }}>
                Virtual Machine Access
            </h1>
            <iframe
                src={vncUrl}
                title="Virtual Machine"
                style={{
                    flexGrow: 1,
                    width: '100%',
                    border: 'none',
                }}
            ></iframe>
        </div>
    );
};

export default VMPage;
