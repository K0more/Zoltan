import handlers
from starlette.responses import FileResponse
from fastapi import FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI(debug=True)

app.mount('/static', StaticFiles(directory='static'), name='static')
templates = Jinja2Templates('templates')
connection_handler = handlers.ConnectionHandler()

cur_id = 0

fake_db = {
    "Mike": {
        "password": "fakepassword123"
    },
    "John": {
        "password": "fakepassword123"
    }
}

@app.route('/')
async def home(request):
    return templates.TemplateResponse('chat.html', {'request': request})

@app.route('/favicon.ico')
async def favicon(request):
    return FileResponse('static/img/favicon.ico')

@app.post('/auth')
async def auth(request: Request):
    data = await request.json()
    username = data.get('username')
    password = data.get('password')
    data = await request.json()
    if not username or not password:
        raise HTTPException(400, "Username or password not specified")
    
    user_obj = fake_db.get(username)

    if not user_obj:
        raise HTTPException(403, "Incorrect username")
    
    if not password == user_obj['password']:
        raise HTTPException(403, "Incorrect password")

    return {'data': {'username': username}}

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
