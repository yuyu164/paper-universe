import { useDroppable } from '@dnd-kit/core'
import { Difficulty, PuzzlePiece } from '@/types/puzzle'
import PuzzlePieceComponent from './PuzzlePiece'

interface Props {
  difficulty: Difficulty
  pieces: PuzzlePiece[]
  boardSize: number
}

export default function PuzzleBoard({ difficulty, pieces, boardSize }: Props) {
  const cellSize = boardSize / difficulty
  
  // 生成网格
  const cells = []
  for (let row = 0; row < difficulty; row++) {
    for (let col = 0; col < difficulty; col++) {
      const piece = pieces.find(
        p => p.currentRow === row && p.currentCol === col
      )
      
      cells.push(
        <DroppableCell
          key={`${row}-${col}`}
          row={row}
          col={col}
          size={cellSize}
          piece={piece}
        />
      )
    }
  }
  
  return (
    <div 
      className="grid border-4 border-paper-500 bg-white/20 mx-auto"
      style={{
        gridTemplateColumns: `repeat(${difficulty}, 1fr)`,
        width: boardSize,
        height: boardSize
      }}
    >
      {cells}
    </div>
  )
}

// 单个可放置格子
function DroppableCell({ row, col, size, piece }: {
  row: number
  col: number
  size: number
  piece?: PuzzlePiece
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `cell-${row}-${col}`,
    data: { row, col }
  })
  
  return (
    <div
      ref={setNodeRef}
      className={`
        border border-rice-300/30
        flex items-center justify-center relative
        ${isOver ? 'bg-paper-100/50' : ''}
      `}
      style={{ width: size, height: size }}
    >
      {/* 若有碎片，则渲染碎片组件（而不是仅作为背景，以便支持从板上拖走） */}
      {piece && (
        <div className="absolute inset-0 z-10">
           {/* 这里仅用于显示。真正的可拖拽件由于 DndContext 架构，应该独立于 DropZone，或者允许在此拖拽。
               由于我们将碎片的位置存在状态里，为了让它可从这里被拖走，我们直接渲染 PuzzlePieceComponent，
               并让外层（非 DND Overlay 时）显示。
           */}
           <PuzzlePieceComponent piece={piece} size={size} isInPool={false} />
        </div>
      )}
    </div>
  )
}
