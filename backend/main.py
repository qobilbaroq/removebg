from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
from rembg import remove, new_session
from typing import List
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

sessions = {}
downloading = set()

def get_session(model: str):
    if model not in sessions:
        downloading.add(model)
        sessions[model] = new_session(model)
        downloading.discard(model)
    return sessions[model]

@app.post("/api/remove-bg")
async def remove_bg(
    file: UploadFile = File(...),
    model: str = Form(default="u2net"),
    alpha_matting: bool = Form(default=False),
):
    input_bytes = await file.read()
    session = get_session(model)
    output_bytes = remove(
        input_bytes,
        session=session,
        alpha_matting=alpha_matting,
    )
    return Response(content=output_bytes, media_type="image/png")

@app.post("/api/remove-bg/batch")
async def remove_bg_batch(
    files: List[UploadFile] = File(...),
    model: str = Form(default="u2net"),
    alpha_matting: bool = Form(default=False),
):
    session = get_session(model)
    results = []
    for file in files:
        input_bytes = await file.read()
        output_bytes = remove(
            input_bytes,
            session=session,
            alpha_matting=alpha_matting,
        )
        results.append({
            "filename": file.filename,
            "data": output_bytes.hex(),
        })
    return JSONResponse(content={"results": results})

@app.get("/api/models")
def get_models():
    return {
        "models": [
            {"id": "u2net", "label": "u2net", "desc": "Umum, cocok untuk semua gambar"},
            {"id": "u2net_human_seg", "label": "u2net human seg", "desc": "Khusus foto orang"},
            {"id": "birefnet-general", "label": "birefnet", "desc": "Kualitas tinggi, lebih lambat"},
            {"id": "silueta", "label": "silueta", "desc": "Paling ringan, 43MB"},
        ]
    }