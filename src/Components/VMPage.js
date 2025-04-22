import React from 'react';

const VMPage = ({ viewOnly, shouldReconnect, password, vm = 1}) => {
    const vncUrl = `https://72.209.113.80/vnc.html?autoconnect=true&reconnect=${shouldReconnect}&view_only=${viewOnly}&password=${password}`;
    const vncUrl2 = `https://72.209.113.80:8443/novnc/vnc.html?autoconnect=true&reconnect=${shouldReconnect}&view_only=${viewOnly}&password=${password}`;
    //const vncUrl2 = `http://72.209.113.80:6081/vnc_auto.html?autoconnect=true&reconnect=${shouldReconnect}&view_only=${viewOnly}&password=${password}`;

    const url = vm === 1 ? vncUrl : vncUrl2;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <h1 style={{ textAlign: 'center', margin: '0 0 10px 0', color: 'white', fontSize: '20px' }}>
                Virtual Machine Access
            </h1>
            <iframe
                src={url}
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
