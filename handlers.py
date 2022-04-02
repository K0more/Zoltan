from typing import List
from fastapi import WebSocket

class ConnectionHandler:
    def __init__(self) -> None:
        self.active_connections: List[WebSocket] = []
    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active_connections.append(ws)
    def disconnect(self, ws: WebSocket):
        self.active_connections.remove(ws)
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)
