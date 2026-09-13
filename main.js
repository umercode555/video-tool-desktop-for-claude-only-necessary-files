// ============================================================================
// HOOK & SHOWCASE — desktop wrapper
// ============================================================================
// This does NOT reimplement the app. It's the same index.html/app.min.js/
// styles.min.css from the browser version, loaded into a native window.
// The only reason this file exists is the switches below: in a normal Chrome
// tab you have zero control over Chromium's background-tab throttling. In
// Electron, YOU are the one launching the Chromium instance, so you can turn
// that throttling off entirely for this window. That's what fixes "render
// pauses at 51% the moment I switch to Instagram" — the window keeps full
// CPU/GPU priority even when it's not focused or is minimized.
// ============================================================================

const { app, BrowserWindow } = require('electron');
const path = require('path');

// --- disable every form of background/occlusion throttling Chromium has ---
// (must be called before app.whenReady())
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');
// Your MacBook Pro 2012 has an Intel HD Graphics 4000 iGPU — it does NOT
// support the newer hardware H.264 encode path some Chromium versions try
// first, which can make WebCodecs silently fail or fall back slowly. Forcing
// off hardware video encode makes it use the software encoder every time —
// slower per-frame than a modern GPU, but reliable and consistent on this
// machine instead of erroring out or stalling on a driver that doesn't
// support what's being asked of it.
app.disableHardwareAcceleration();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: '#050806', // matches --ink, avoids a white flash on launch
    title: 'HOOK & SHOWCASE',
    webPreferences: {
      // The app only uses browser-standard APIs (Canvas, WebCodecs, IndexedDB,
      // File/Drag-drop, fetch, Web Audio) — it never needs Node.js APIs, so
      // Node integration stays off. This is also just safer: a window with
      // Node integration on can be tricked into running local code if it ever
      // loads anything untrusted, and this one doesn't need that risk at all.
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false // belt-and-suspenders alongside the switches above
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Handy while you're getting this running the first few times — comment
  // this line out once everything works the way you want.
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
