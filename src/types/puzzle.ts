// 拼图块
export interface PuzzlePiece {
  id: number
  correctRow: number
  correctCol: number
  currentRow: number | null    // null 表示在候选区
  currentCol: number | null
  imageUrl: string             // Blob URL
}

// 难度
export type Difficulty = 3 | 4

// 素材状态
export type AssetStatus = 'fresh' | 'played' | 'skipped'

export interface PuzzleAsset {
  id: string
  src: string
  status: AssetStatus
  lastUsedAt: number
}

// 游戏状态
export interface GameState {
  assetId: string | null
  difficulty: Difficulty
  pieces: PuzzlePiece[]
  isCompleted: boolean
  startTime: number
  endTime: number | null
}

// 拖拽状态
export interface DragState {
  pieceId: number | null
  isDragging: boolean
  dragOffset: { x: number; y: number }
}

// 放置判定结果
export type DropResult = 
  | { type: 'success'; row: number; col: number }
  | { type: 'fail'; reason: 'out-of-range' | 'wrong-position' | 'occupied-wrong' }
  | { type: 'swap'; row: number; col: number; targetPieceId: number }
