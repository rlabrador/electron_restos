
// eventEmitter de Node.js est utilisé ici
//const {app, BrowserWindow} = require('electron');
const {app, ipcMain, BrowserWindow} = require('electron');
//ici ipcMain est une sous instance de eventEmitter de Node.js

// var app = require('app');  // Module to control application life.
// //var app = require('electron');  // Module to control application life.
// var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
//var mainWindow = null;

let mainWindow = null;

app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 300,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
  });
  // and load the index.html of the app.
  //mainWindow.webContents.loadURL('file://$(__dirname)/index.html');
  mainWindow.loadURL('file://' + __dirname + '/dashboard.html');
  mainWindow.maximize(true);
  // Open the DevTools.
  //mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

ipcMain.on('close-main-window', (event, arg) =>{
  app.quit();
});