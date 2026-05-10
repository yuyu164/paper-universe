import { useDroppable } from '@dnd-kit/core'
import { PuzzlePiece } from '@/types/puzzle'
import PuzzlePieceComponent from './PuzzlePiece'

interface Props {
  pieces: PuzzlePiece[]
  pieceSize: number
}

export default function PiecePool({ pieces, pieceSize }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'pool',
    data: { type: 'pool' }
  })
  
  return (
    <div
      ref={setNodeRef}
      className={`
        mt-8 p-4 bg-white/10 rounded-lg shadow-inner border border-ink-800
        ${isOver ? 'bg-paper-500/20' : ''}
      `}
    >
      <p className="text-center text-rice-500 mb-4 text-sm font-serif">候选区</p>
      
      <div 
        className="flex flex-wrap justify-center gap-3"
        style={{ minHeight: pieceSize + 20 }}
      >
        {pieces.map(piece => (
          <div
            key={piece.id}
            className="animate-fly-in"
          >
            <PuzzlePieceComponent
              piece={piece}
              size={pieceSize}
              isInPool={true}
            />
          </div>
        ))}
        {pieces.length === 0 && (
           <div className="flex items-center justify-center text-rice-600/50 w-full h-full text-sm">
             （碎片已全部取出）
           </div>
        )}
      </div>
    </div>
  )
}
