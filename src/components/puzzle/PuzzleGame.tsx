import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { useState } from 'react'
import { usePuzzleGame } from '@/hooks/usePuzzleGame'
import { useAssetManager } from '@/hooks/useAssetManager'
import PuzzleBoard from './PuzzleBoard'
import PiecePool from './PiecePool'
import PuzzlePiece from './PuzzlePiece'
import CompletionModal from './CompletionModal'
import PaperConfetti from './PaperConfetti'
import { Difficulty } from '@/types/puzzle'
import { createSnapCollision } from '@/lib/dragUtils'

interface Props {
  onBack: () => void
}

export default function PuzzleGame({ onBack }: Props) {
  const { currentAsset, selectNewAsset, markAsPlayed } = useAssetManager()
  const [difficulty, setDifficulty] = useState<Difficulty>(3)
  
  const { state, isLoading, placePiece, returnToPool, reset } = 
    usePuzzleGame(currentAsset?.src || null, difficulty)
  
  const [activePiece, setActivePiece] = useState<any>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  
  // 拖拽开始
  const handleDragStart = (event: DragStartEvent) => {
    setActivePiece(event.active.data.current?.piece)
  }
  
  // 拖拽结束
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) {
      // 没有放置到有效区域，飞回候选区
      const pieceId = active.data.current?.piece?.id
      if (pieceId !== undefined) returnToPool(pieceId)
      setActivePiece(null)
      return
    }
    
    const pieceId = active.data.current?.piece?.id
    
    if (over.id === 'pool') {
       if (pieceId !== undefined) returnToPool(pieceId)
       setActivePiece(null)
       return
    }

    const dropData = over.data.current
    if (dropData?.row !== undefined && dropData?.col !== undefined) {
      // 放置到拼图板
      const result = placePiece(pieceId, dropData.row, dropData.col)
      
      if (result.type === 'fail') {
        // 失败，飞回
        returnToPool(pieceId)
        
        if (result.reason === 'wrong-position') {
          setToastMessage("错误，再试试")
          setTimeout(() => setToastMessage(null), 1000)
        }
      }
    }
    
    setActivePiece(null)
  }

  // 完成时标记为已玩
  if (state.isCompleted && currentAsset?.status === 'fresh') {
    markAsPlayed()
  }
  
  // 计算尺寸参数
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const boardSize = isMobile ? 300 : 400
  const cellSize = boardSize / difficulty
  // 吸附阈值：格子尺寸的 30%
  const snapThreshold = cellSize * 0.3
  
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={createSnapCollision(snapThreshold)}
    >
      <div className="min-h-screen bg-ink-950 p-4 md:p-8 flex flex-col relative overflow-hidden text-rice-50">
        
        {/* 纸屑特效 */}
        <PaperConfetti active={state.isCompleted} />

        {/* 顶栏 */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-ink-900/50 p-4 rounded-lg border border-ink-800">
          <button 
            onClick={onBack} 
            className="text-rice-400 hover:text-white transition-colors flex items-center self-start sm:self-auto"
          >
            ← 返回主页
          </button>
          
          <h1 className="text-xl md:text-2xl font-serif font-bold text-white tracking-widest">纹样拼图</h1>
          
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value) as Difficulty)}
              className="bg-ink-800 border border-ink-700 text-rice-200 rounded px-3 py-1.5 outline-none focus:border-paper-500 text-sm"
            >
              <option value={3}>入门 3×3</option>
              <option value={4}>进阶 4×4</option>
            </select>
            <button 
              onClick={selectNewAsset}
              className="flex items-center gap-1 px-4 py-1.5 bg-paper-500 hover:bg-paper-600 text-white rounded text-sm transition-colors"
            >
              <span>🔄</span>
              <span>换一换</span>
            </button>
          </div>
        </header>
        
        {/* 主内容 */}
        <div className="flex-1 flex flex-col xl:flex-row gap-8 items-center xl:items-start justify-center max-w-6xl mx-auto w-full relative">
          
          {/* Toast 错误提示 */}
          {toastMessage && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-50 animate-fade-up">
              <div className="bg-paper-500 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2">
                <span>⚠️</span>
                {toastMessage}
              </div>
            </div>
          )}

          {/* 左侧：预览/完成信息 */}
          <div className="w-full xl:w-64 flex flex-col gap-4">
            <div className="bg-ink-900 border border-ink-800 rounded-lg p-4 shadow-xl">
              <h3 className="text-rice-400 text-xs tracking-widest mb-3 font-medium uppercase">目标图样预览</h3>
              {state.isCompleted ? (
                <div className="text-center animate-fade-in">
                  <img 
                    src={currentAsset?.src} 
                    alt="完成"
                    className="w-full aspect-square object-cover rounded shadow-lg border-2 border-paper-500"
                  />
                </div>
              ) : (
                <div className="w-full aspect-square bg-ink-950 border border-ink-800 border-dashed rounded flex flex-col items-center justify-center text-ink-700">
                  <div className="text-4xl mb-2 opacity-50">🧩</div>
                  <p className="text-xs">拼完揭晓</p>
                </div>
              )}
            </div>

            {/* 状态统计卡片 */}
            <div className="bg-ink-900 border border-ink-800 rounded-lg p-4 shadow-xl flex justify-between items-center xl:flex-col xl:items-start xl:gap-2">
               <div>
                 <p className="text-rice-500 text-xs">碎片进度</p>
                 <p className="text-white font-mono text-xl">
                   {state.pieces.filter(p => p.currentRow !== null).length} <span className="text-sm text-rice-500">/ {state.pieces.length}</span>
                 </p>
               </div>
               {state.isCompleted && state.endTime && (
                 <div className="text-right xl:text-left animate-fade-in">
                   <p className="text-rice-500 text-xs">用时</p>
                   <p className="text-paper-400 font-mono text-xl font-bold">
                     {Math.floor((state.endTime - state.startTime) / 1000)}s
                   </p>
                 </div>
               )}
            </div>
          </div>
          
          {/* 右侧：拼图主区域 */}
          <div className="flex-1 w-full max-w-2xl flex flex-col relative">
            {isLoading ? (
               <div className="w-full h-64 flex items-center justify-center text-rice-400 animate-pulse">
                 加载碎片中...
               </div>
            ) : (
               <>
                 <PuzzleBoard
                   difficulty={difficulty}
                   pieces={state.pieces}
                   boardSize={boardSize}
                 />
                 
                 <PiecePool 
                   pieces={state.pieces.filter(p => p.currentRow === null)}
                   pieceSize={cellSize}
                 />
               </>
            )}

            {/* 完成弹层覆盖在拼图板上方 */}
            {state.isCompleted && state.endTime && (
              <CompletionModal 
                onNext={selectNewAsset}
                onReplay={reset}
                timeUsed={Math.floor((state.endTime - state.startTime) / 1000)}
              />
            )}
          </div>
        </div>
        
        {/* 拖拽时的浮动预览 */}
        <DragOverlay>
          {activePiece ? (
            <PuzzlePiece 
              piece={activePiece} 
              size={cellSize}
              isInPool={false}
              isOverlay={true}
            />
          ) : null}
        </DragOverlay>
        
      </div>
    </DndContext>
  )
}
