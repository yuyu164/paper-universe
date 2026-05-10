import { CollisionDetection } from '@dnd-kit/core'

/**
 * 自定义碰撞检测：距离中心点阈值以内才算碰撞
 */
export function createSnapCollision(threshold: number): CollisionDetection {
  return (args) => {
    const { droppableContainers, pointerCoordinates } = args
    
    if (!pointerCoordinates) return []
    
    const collisions = []
    
    for (const container of droppableContainers) {
      const rect = container.rect.current
      if (!rect) continue
      
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distance = Math.sqrt(
        Math.pow(pointerCoordinates.x - centerX, 2) +
        Math.pow(pointerCoordinates.y - centerY, 2)
      )
      
      // 距离在阈值内才算碰撞
      if (distance <= threshold) {
        collisions.push({
          id: container.id,
          data: { droppableContainer: container, value: distance }
        })
      }
    }
    
    // 按距离排序，返回最近的
    return collisions.sort((a, b) => (a.data?.value ?? 0) - (b.data?.value ?? 0))
  }
}
