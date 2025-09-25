# 💬 Chat App (Node.js + Socket.io)


A **real-time chat application** built using **Node.js**, **Express**, and **Socket.io**.  
This is a **temporary chat app** – meaning messages and users are not saved anywhere.  
Once the browser is closed or refreshed, the chat history disappears.

---

## 🚀 Features
- Real-time bi-directional communication using WebSockets
- Join chat rooms
- Broadcast messages to all users in a room
- Share location with other users
- Auto-scrolling chat window
- Basic styling with CSS
- ❌ No database → chat is **temporary** (history is lost on refresh/close)


---

## 🛠 Tech Stack
- **Node.js** – Server-side runtime
- **Express.js** – Web framework
- **Socket.io** – Real-time communication
- **Mustache.js** – Template rendering
- **Bad Words** – Message filtering

---

## 📂 Project Structure
```
chat-app/
│-- public/ # Frontend files (HTML, CSS, JS)
│-- src/ # Server-side code
│ ├── index.js # Main server file
│ ├── utils/ # Utility functions (users, messages)
│-- package.json # Dependencies and scripts
```


---

## ⚡ Getting Started

### 1. Clone the repo
```
git clone https://github.com/Amith-Vignesh/chat-app-nodejs.git
cd chat-app-nodejs
```
### 2. Install dependencies
```
npm install
```
### 3. Run the server
```
npm run dev
```
### 4. Open in browser
```
http://localhost:3000
```

### This project is for learning purposes. Sample Image is attached below
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dc6aabac-cce5-4f07-8638-4734a0d92fc2" />



