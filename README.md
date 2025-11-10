🎨 Real-Time Collaborative Drawing Canvas

A multi-user real-time drawing application built using Vanilla JavaScript, HTML5 Canvas, and Node.js (WebSockets).
Multiple users can draw simultaneously on the same canvas with live synchronization, user tracking, and global undo/redo.

🚀 Features

🖌️ Drawing Tools

1.Brush and eraser tools

2.Adjustable stroke width and color picker

3.Smooth line rendering using optimized canvas paths

⚡ Real-Time Collaboration

1.All users see each other’s drawings instantly via WebSocket communication

2.Live cursor tracking — shows where others are drawing

3.Conflict handling for overlapping strokes

♻️ Undo / Redo (Global)

1.Maintains a shared operation history across all users

2.Handles undo/redo requests for collaborative actions

👥 User Management

1.Displays active users in the session

2.Each user is assigned a unique color

3.Automatically handles new user joins and disconnects

🧰 Tech Stack

Layer	Technology

Frontend:	HTML5, CSS3, Vanilla JavaScript
Backend:	Node.js, Express, WebSocket (Socket.io)
Communication:	WebSocket protocol for low-latency bi-directional messaging
Storage (optional):	In-memory (can extend to Redis for persistent state)

1. Install Dependencies
npm install

2.Start the Server
npm start

🌐 How It Works

1.User joins → assigned a unique ID and color.

2.Canvas events (mousedown, mousemove, mouseup) are captured.

3.Stroke data (coordinates, color, width) is sent via WebSocket to the server.

4.Server broadcasts drawing events to all other clients in the same room.

5.Clients render received strokes immediately on their canvases.

6.Undo/Redo is synchronized globally using a shared operation stack.

💬 WebSocket Message Protocol

Event	Direction	Description

join	Client → Server	Sent when user connects
draw	Client ↔ Server	Broadcasts drawing coordinates and stroke info
cursor_move	Client ↔ Server	Updates other users’ cursor positions
undo / redo	Client ↔ Server	Requests or broadcasts undo/redo operations
user_list	Server → Client	Sends updated active user list

🔁 Undo/Redo Strategy

Each stroke is stored as an operation object:

{ id, userId, path: [...points], color, width, type: 'draw' }


When a user triggers undo, the latest operation (global order) is removed and redrawn on all clients.

Redo re-applies the last undone operation.

Operation stack is synchronized across clients to ensure consistent state.

🧠 Conflict Resolution

1.Overlapping strokes are drawn in the order they were received.

2.Each operation includes a timestamp to maintain causal order.

3.Clients use double-buffering (off-screen canvas) for efficient redraws when undo/redo occurs.

⚡ Performance Considerations

1.Mouse move events are throttled to reduce network load.

2.Stroke data is batched for smooth real-time drawing.

3.Off-screen rendering avoids flickering during rapid updates.

4.Lightweight data format (JSON-encoded strokes) for fast serialization.

🧩 Known Limitations

1.Global undo may show minor lag under high latency.

2.Server restarts clear canvas state (no persistence yet).

3.No authentication (all users are anonymous).

⏱️ Time Spent
Phase	Hours

Canvas drawing logic-	3 hrs
WebSocket setup-	2 hrs
Undo/Redo system- 2.5 hrs
UI & Testing-	1.5 hrs
Total	~9 hours

High-Level Architecture

 ┌─────────────────────┐       WebSocket       ┌─────────────────────┐
 │      Browser 1      │ <──────────────────→ │       Server         │
 │ (HTML + JS Canvas)  │                     │ (Node.js + Socket.io)│
 └─────────────────────┘                     └─────────────────────┘
          ↑     ↓                                     ↑     ↓
 ┌─────────────────────┐       WebSocket       ┌─────────────────────┐
 │      Browser 2      │ <──────────────────→ │   Shared State Mgmt  │
 │ (HTML + JS Canvas)  │                     │ (drawing-state.js)   │
 └─────────────────────┘                     └─────────────────────┘



Data Flow Diagram

 User draws → (mousemove event)
      ↓
Canvas.js captures stroke (coordinates, color, width)
      ↓
websocket.js sends JSON event → Server
      ↓
Server validates + timestamps stroke
      ↓
Server broadcasts stroke → All clients
      ↓
Each client renders stroke on its local canvas

Canvas Rendering Flow

+-----------------------------+
| MouseDown → Start new path  |
| MouseMove → Add coordinates |
| MouseUp → End path, send to server |
+-----------------------------+
             ↓
   Broadcast to all clients
             ↓
+-----------------------------+
| drawPath(path, color, width)|
| Render line segment         |
+-----------------------------+

System Flow Summary

1. User connects
2. Server assigns userId and color
3. User starts drawing → sends events
4. Server broadcasts draw events
5. All clients render updates
6. Any user can undo/redo (global sync)
7. User disconnects → server updates user list

