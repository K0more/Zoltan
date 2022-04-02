from typing import final
import handlers
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI(debug=True)

app.mount('/static', StaticFiles(directory='static'), name='static')
templates = Jinja2Templates('templates')
connection_handler = handlers.ConnectionHandler()

cur_id = 0

@app.route('/')
async def home(request):
    return templates.TemplateResponse('chat.html', {'request': request})

@app.websocket('/chat')
async def ws_connect(ws: WebSocket):
    global cur_id
    await connection_handler.connect(ws)
    try:
        while True:
            msg = await ws.receive_text()
            await connection_handler.broadcast({'id': cur_id, 'data': msg})
            cur_id += 1
    except WebSocketDisconnect:
        connection_handler.disconnect(ws)
