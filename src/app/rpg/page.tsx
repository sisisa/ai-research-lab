"use client";

import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 10;
const API_BASE_URL = 'http://localhost:8000/api/player/position';

export default function RPGPage() {
  const [position, setPosition] = useState({ x: 5, y: 5 });
  const [isLoading, setIsLoading] = useState(true);

  // 初期位置をバックエンドから取得
  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (response.ok) {
          const data = await response.json();
          setPosition(data);
        }
      } catch (error) {
        console.error('Failed to fetch position:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosition();
  }, []);

  // 位置をバックエンドに保存
  const savePosition = async (newPos: { x: number; y: number }) => {
    try {
      await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPos),
      });
    } catch (error) {
      console.error('Failed to save position:', error);
    }
  };

  // 移動ロジック
  const movePlayer = useCallback((dx: number, dy: number) => {
    setPosition((prev) => {
      const nextPos = {
        x: Math.max(0, Math.min(GRID_SIZE - 1, prev.x + dx)),
        y: Math.max(0, Math.min(GRID_SIZE - 1, prev.y + dy)),
      };
      
      // 実際に移動した場合のみ保存
      if (nextPos.x !== prev.x || nextPos.y !== prev.y) {
        savePosition(nextPos);
      }
      return nextPos;
    });
  }, []);

  // キーボードイベントの登録
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading Map...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-3xl font-black mb-8 tracking-tighter text-emerald-400">2D OPEN WORLD RPG</h1>
      
      <div className="relative bg-slate-800 p-2 rounded-lg shadow-2xl border-4 border-slate-700">
        <div 
          className="grid gap-1"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: 'min(80vw, 500px)',
            height: 'min(80vw, 500px)'
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isPlayer = position.x === x && position.y === y;

            return (
              <div 
                key={i}
                className={`
                  relative flex items-center justify-center rounded-sm transition-all duration-200
                  ${(x + y) % 2 === 0 ? 'bg-slate-700' : 'bg-slate-750'}
                  border border-slate-600/30
                `}
              >
                {isPlayer && (
                  <div className="absolute inset-1 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse flex items-center justify-center">
                    <div className="w-1/2 h-1/2 bg-white rounded-full opacity-50" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700 text-sm font-mono">
        <p className="text-emerald-400 mb-2">PLAYER STATS</p>
        <div className="grid grid-cols-2 gap-4">
          <div>X-COORD: <span className="text-white">{position.x}</span></div>
          <div>Y-COORD: <span className="text-white">{position.y}</span></div>
        </div>
        <div className="mt-4 text-slate-500 text-xs">USE WASD OR ARROW KEYS TO MOVE</div>
      </div>
    </div>
  );
}
