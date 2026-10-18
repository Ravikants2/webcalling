# 📡 WebCalling

Private & Secure video calling, voice calling, screen sharing, chat and file transfer.
**Zero server dependency** — runs 100% on GitHub Pages using PeerJS public cloud.

## Users
| Name | Email | Password |
|---|---|---|
| RaviKant Singh | ravikant.s2@gmail.com | Pass@123 |
| Rekha Kumari | rekhasingh@gmail.com | Pass@123 |

## Features
- 🔐 Login with predefined users
- 🟢 Live online/offline presence (auto-detects every 8s)
- 💬 Real-time P2P chat
- 📞 Voice call
- 📹 Video call
- 🖥️ Screen sharing
- 📎 P2P file transfer
- **No server. No limits. No cost.**

## Live App
**https://ravikants2.github.io/webcalling/**

## How to Enable GitHub Pages
1. Go to repo → Settings → Pages
2. Source → **GitHub Actions** → Save
3. Done — auto-deploys on every push to `main`

## Architecture
```
Browser A ──── PeerJS Cloud (free signaling) ──── Browser B
         └──────────── WebRTC P2P ───────────────┘
```
All media, chat and files go directly peer-to-peer.
PeerJS cloud only handles the initial handshake (no data stored).
