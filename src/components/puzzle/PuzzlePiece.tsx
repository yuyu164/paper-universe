import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { PuzzlePiece as PuzzlePieceType } from '@/types/puzzle'
import { cn } from '@/lib/cn'

interface Props {
  piece: PuzzlePieceType
  size: number
  isInPool?: boolean
  isOverlay?: boolean
}

export default function PuzzlePiece({ piece, size, isInPool = false, isOverlay = false }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `piece-${piece.id}`,
    data: { piece },
    disabled: isOverlay
  })
  
  const style = {
    transform: (isOverlay || isDragging) ? undefined : CSS.Translate.toString(transform),
    width: size,
    height: size,
    backgroundImage: `url(${piece.imageUrl})`,
    backgroundSize: 'cover',
    borderRadius: '2px'
  }
  
  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={cn(
        'cursor-grab active:cursor-grabbing transition-shadow touch-none',
        isOverlay ? 'shadow-2xl scale-110 z-50 opacity-90' : (isDragging ? 'opacity-30' : 'shadow-md'),
        isInPool ? '' : 'ring-1 ring-white/50'
      )}
    />
  )
}
