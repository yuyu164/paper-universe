import { useState, useCallback, useEffect } from 'react'
import { 
  GameState, PuzzlePiece, Difficulty, DropResult 
} from '@/types/puzzle'
import { sliceImage, shuffleArray } from '@/lib/imageUtils'

export function usePuzzleGame(assetSrc: string | null, difficulty: Difficulty) {
  const [state, setState] = useState<GameState>({
    assetId: null,
    difficulty,
    pieces: [],
    isCompleted: false,
    startTime: 0,
    endTime: null
  })
  
  const [isLoading, setIsLoading] = useState(false)
  
  // 初始化游戏
  const initGame = useCallback(async () => {
    console.log("initGame called with assetSrc:", assetSrc, "difficulty:", difficulty)
    if (!assetSrc) return
    
    setIsLoading(true)
    
    try {
      // 1. 切片
      const imageUrls = await sliceImage(assetSrc, difficulty)
      console.log("imageUrls generated:", imageUrls.length)
      
      // 2. 创建拼图块
      const pieces: PuzzlePiece[] = imageUrls.map((url, index) => ({
        id: index,
        correctRow: Math.floor(index / difficulty),
        correctCol: index % difficulty,
        currentRow: null,
        currentCol: null,
        imageUrl: url
      }))
      
      // 3. 打乱顺序（用于候选区显示）
      const shuffledPieces = shuffleArray(pieces)
      
      setState({
        assetId: assetSrc,
        difficulty,
        pieces: shuffledPieces,
        isCompleted: false,
        startTime: Date.now(),
        endTime: null
      })
    } catch (e) {
      console.error("切片失败", e)
    } finally {
      setIsLoading(false)
    }
  }, [assetSrc, difficulty])
  
  // 素材或难度变化时重新初始化
  useEffect(() => {
    initGame()
    
    // 清理创建的 object URL 以防内存泄漏
    return () => {
      state.pieces.forEach(p => URL.revokeObjectURL(p.imageUrl))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetSrc, difficulty])
  
  // 放置拼图块
  const placePiece = useCallback((pieceId: number, row: number, col: number): DropResult => {
    const piece = state.pieces.find(p => p.id === pieceId)
    if (!piece) return { type: 'fail', reason: 'out-of-range' }
    
    // 严格位置校验：如果放错格子，直接拒绝
    if (piece.correctRow !== row || piece.correctCol !== col) {
      return { type: 'fail', reason: 'wrong-position' }
    }
    
    // 放置碎片
    setState(prev => ({
      ...prev,
      pieces: prev.pieces.map(p =>
        p.id === pieceId ? { ...p, currentRow: row, currentCol: col } : p
      )
    }))
    
    return { type: 'success', row, col }
  }, [state.pieces])
  
  // 移回候选区
  const returnToPool = useCallback((pieceId: number) => {
    setState(prev => ({
      ...prev,
      pieces: prev.pieces.map(p =>
        p.id === pieceId ? { ...p, currentRow: null, currentCol: null } : p
      )
    }))
  }, [])
  
  // 检查是否完成
  useEffect(() => {
    if (state.pieces.length === 0) return
    
    const allPlaced = state.pieces.every(
      p => p.currentRow === p.correctRow && p.currentCol === p.correctCol
    )
    
    if (allPlaced && !state.isCompleted) {
      setState(prev => ({
        ...prev,
        isCompleted: true,
        endTime: Date.now()
      }))
    }
  }, [state.pieces, state.isCompleted])
  
  // 重置
  const reset = useCallback(() => {
    initGame()
  }, [initGame])
  
  return {
    state,
    isLoading,
    placePiece,
    returnToPool,
    reset
  }
}
