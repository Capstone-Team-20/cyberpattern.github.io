// VMPage.js
import React from 'react';

const VMPage = ({ viewOnly, shouldReconnect, password }) => {
  // Construct the URL for the iframe directly
  //const vncUrl = `http://192.168.10.141:6080/vnc.html?autoconnect=true&reconnect=${shouldReconnect}&view_only=${viewOnly}&password=${password}`;
  const vncUrl2 = `http://72.209.113.80:6080/vnc.html?autoconnect=true&reconnect=${shouldReconnect}&view_only=${viewOnly}&password=${password}`;
  return (
    <div>
      <h1>Virtual Machine Access</h1>
      <iframe 
        src={vncUrl2}
        title="VNC Viewer"
        width="1024px"
        height="768px"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default VMPage;
