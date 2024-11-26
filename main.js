const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let flaskProcess;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadURL('http://localhost:5000');

    mainWindow.on('closed', () => {
        mainWindow = null;
        if (flaskProcess) {
            flaskProcess.kill(); // Завершение процесса Flask
        }
    });
}

app.on('ready', () => {
    flaskProcess = exec('python app.py');

    setTimeout(createWindow, 1000);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});