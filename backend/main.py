from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS設定: フロントエンド（Next.js）からのアクセスのみを許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# プレイヤーの位置情報の型定義
class Position(BaseModel):
    x: int
    y: int

# メモリ内での位置情報保存（初期位置: 5, 5）
player_position = {"x": 5, "y": 5}

@app.get("/api/player/position")
async def get_position():
    """現在のプレイヤー位置を取得する"""
    return player_position

@app.post("/api/player/position")
async def update_position(position: Position):
    """プレイヤーの新しい位置を保存する"""
    global player_position
    player_position["x"] = position.x
    player_position["y"] = position.y
    return {"message": "Position updated", "position": player_position}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
