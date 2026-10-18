# 📡 WebCalling

Private & Secure video calling, voice calling, screen sharing, chat and file transfer for 2 users.

## Users
| Name | Email |
|---|---|
| RaviKant Singh | ravikant.s2@gmail.com |
| Rekha Kumari | rekhasingh@gmail.com |

Password: `Pass@123` (both users)

## Features
- 🔐 Login with predefined users
- 🟢 Live online/offline presence indicator
- 💬 Real-time chat
- 📞 Voice call
- 📹 Video call
- 🖥️ Screen sharing
- 📎 P2P file transfer (WebRTC DataChannel)

## Deploy

### 1. Deploy Signaling Server → Railway (free)
1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Select this repo
3. Railway auto-runs `npm start`
4. Copy your URL e.g. `https://webcalling-server.up.railway.app`

### 2. Update SIGNALING_SERVER in index.html
```js
const SIGNALING_SERVER = 'https://YOUR-RAILWAY-URL.up.railway.app';
```

### 3. Push to GitHub
```bash
git remote add origin https://github.com/Ravikants2/webcalling.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages
Repo → Settings → Pages → Source: **GitHub Actions**

App live at: `https://ravikants2.github.io/webcalling/`
