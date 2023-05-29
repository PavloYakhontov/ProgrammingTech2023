import uvicorn
from typing import List
from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, Path
from fastapi.responses import FileResponse, StreamingResponse, Response
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware
import io

from backend.apps.converter.services.converter_service import ConverterService

from backend.apps.database.engine import SessionLocal, engine, Base
from backend.apps.database import models
from sqlalchemy.orm import Session
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from passlib.context import CryptContext


app = FastAPI()

Base.metadata.create_all(bind=engine)

security = HTTPBasic()
password_context = CryptContext(schemes=['bcrypt'])


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)


def authenticate_user(username: str, password: str):
    session = SessionLocal()
    user = session.query(models.User).filter_by(username=username).first()
    if not user:
        return False
    if not password_context.verify(password, user.password_hash):
        return False
    return user


def get_current_user(credentials: HTTPBasicCredentials = Depends(security)):
    user = authenticate_user(credentials.username, credentials.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail='Invalid username or password',
            headers={'WWW-Authenticate': 'Basic'},
        )
    return user


@app.post('/users/login')
def get_user_by_username(user_data: dict):
    session = SessionLocal()
    username = user_data.get('username')
    password = user_data.get('password')
    user = session.query(models.User).filter_by(username=username).first()
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    if not password_context.verify(password, user.hashed_password):
        raise HTTPException(status_code=404, detail='Incorrect password')
    return user


@app.post('/users')
def create_user(user_data: dict):
    username = user_data.get('username')
    password = user_data.get('password')
    hashed_password = password_context.hash(password)
    user = models.User(username=username, hashed_password=hashed_password)
    session = SessionLocal()
    session.add(user)
    session.commit()
    return {'message': 'User created successfully'}


@app.post("/upload/")
async def resolve_convert_files(request: Request, files: List[UploadFile] = File(...)):
    zipped_files: io.BytesIO = await ConverterService(files, request.headers['x-user-uuid'], request.headers['x-from-format'], request.headers['x-to-format']).convert()
    return StreamingResponse(iter([zipped_files.getvalue()]),
                             media_type="application/x-zip-compressed",
                             headers={"Content-Disposition": "attachment; filename=upload.zip"})

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="debug")
