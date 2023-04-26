import handlers
import db
from starlette.responses import FileResponse
from fastapi import FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

db_handler = db.DB()

app = FastAPI(debug=True)


app.mount('/static', StaticFiles(directory='static'), name='static')
templates = Jinja2Templates('templates')
connection_handler = handlers.ConnectionHandler()

cur_id = 0

fake_db = {
    "Mike": {
        "password": "password123",
        "pfp": "static/img/guy.jpeg"
    },
    "John": {
        "password": "password123",
        "pfp": "static/img/john-cena.png"
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

    user = await db_handler.auth_user(username, password)

    if not user:
        return
    
    data = await request.json()
    if not username or not password:
        raise HTTPException(400, "Username or password not specified")
    
    user_obj = fake_db.get(username)

    if not user_obj:
        raise HTTPException(403, "Incorrect username")
    
    if not password == user_obj['password']:
        raise HTTPException(403, "Incorrect password")

    return {'data': {'username': username, 'pfp': fake_db[username]['pfp']}}

@app.websocket('/chat')
async def ws_connect(ws: WebSocket):
    global cur_id
    await connection_handler.connect(ws)
    try:
        while True:
            msg = await ws.receive_json()
            print(msg)
            await connection_handler.broadcast({'id': cur_id, 'data': msg, 'author': {'username': msg['author'], 'pfp': fake_db[msg['author']]['pfp']}})
            cur_id += 1
    except WebSocketDisconnect:
        connection_handler.disconnect(ws)
