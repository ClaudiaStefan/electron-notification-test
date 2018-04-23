import React from 'react';
import { ipcRenderer } from 'electron';

import './../styles/Main.styl';
import Headline from './Headline.jsx';

ipcRenderer.on('show-alert', () => {
    alert('Notification has been clicked!');
});

export default class Main extends React.Component {
    showNotification() {
        ipcRenderer.send('show-notification', {
            title: 'test notification',
            body: `test body ${ Date.now() }`,
        });
    }
    render() {
        return (
        <div className="container">
            <h1>Notification Test App</h1>
            <p>We are using node {process.versions.node}</p>
            <p>Chrome {process.versions.chrome}</p>
            <p>Electron {process.versions.electron}</p>
            <p>and <Headline />.</p>
            <p> After you click the show notification button and you click on the notification in notification center, you should see an alert!</p>
            <p>Test clicking the notification in the notification center, after you wait at least 1 minute</p>
            <button onClick={this.showNotification}>Show notification</button>
        </div>
        );
    }
}