from fastapi import FastAPI
import database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
@app.get("/")
async def root():
  return {"message": "Hello world"}

@app.get("/users/{username}")
async def get_user(username:str):
  return database.get_element_by_username(username)

@app.get("/users")
async def get_users():
  return database.get_all_elements()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)