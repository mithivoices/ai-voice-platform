from fastapi import APIRouter
from app.api.v1.endpoints import tts, stt

api_router = APIRouter()

api_router.include_router(tts.router, prefix="/tts", tags=["Text-to-Speech"])
api_router.include_router(stt.router, prefix="/stt", tags=["Speech-to-Text"])
