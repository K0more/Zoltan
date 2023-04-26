import aiosqlite

class User:
    def __init__(self, **kwargs) -> None:
        self.username = kwargs.pop('username')
        self.password = kwargs.pop('password')
        self.name = kwargs.pop('name')
        self.email = kwargs.pop('email')
    
    @classmethod
    async def get(cls, con, pk: str):
        query = 'SELECT username, password, name, email FROM users WHERE username = ?'
        z = await con.execute(query, (pk,))
        data = await z.fetchone()
        username, password, name, email = data
        return cls(username=username, password=password, name=name, email=email)
    
    @classmethod
    async def create(cls, con, **kwargs):
        username = kwargs.get('username')
        password = kwargs.get('password')
        name = kwargs.get('name')
        email = kwargs.get('email')

        query = 'INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?)'
        await con.execute(query, (username, password, name, email))
        return cls(**kwargs)

    @classmethod
    async def authenticate(cls, con, username: str, password: str):
        user = await cls.get(con, username)

        if password == user.password:
            return user
        
        return None

class DB:
    def __init__(self) -> None:
        pass

    async def create_user(self, **kwargs):
        async with aiosqlite.connect('data.sqlite3') as con:
            return await User.create(con, **kwargs)

    async def auth_user(self, username, password):
        async with aiosqlite.connect('data.sqlite3') as con:
            return await User.authenticate(con, username, password)

    async def get_user(self, pk: str):
        async with aiosqlite.connect('data.sqlite3') as con:
            return await User.get(con, pk)
