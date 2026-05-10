import { Difficulty } from '@/types/puzzle'

/**
 * 将图片切片为拼图块
 * @param imageSrc 图片路径
 * @param difficulty 3 或 4
 * @returns 每个拼图块的 Blob URL 数组
 */
export async function sliceImage(
  imageSrc: string,
  difficulty: Difficulty
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('无法获取 Canvas 2D 上下文'))
        return
      }
      
      // 1. 确定正方形尺寸（取短边）
      const size = Math.min(img.width, img.height)
      
      // 2. 计算切片尺寸
      const pieceSize = size / difficulty
      
      // 3. 计算裁剪起点（居中裁剪）
      const startX = (img.width - size) / 2
      const startY = (img.height - size) / 2
      
      // 4. 生成每个切片
      const promises: Promise<{index: number, url: string}>[] = []
      
      for (let row = 0; row < difficulty; row++) {
        for (let col = 0; col < difficulty; col++) {
          const index = row * difficulty + col
          
          // 为每个切片创建一个独立的 canvas 以避免异步冲突
          const pieceCanvas = document.createElement('canvas')
          pieceCanvas.width = pieceSize
          pieceCanvas.height = pieceSize
          const pieceCtx = pieceCanvas.getContext('2d')
          
          if (pieceCtx) {
            pieceCtx.drawImage(
              img,
              startX + col * pieceSize,
              startY + row * pieceSize,
              pieceSize,
              pieceSize,
              0,
              0,
              pieceSize,
              pieceSize
            )
            
            promises.push(new Promise((res) => {
              pieceCanvas.toBlob((blob) => {
                if (blob) {
                  res({ index, url: URL.createObjectURL(blob) })
                } else {
                  res({ index, url: pieceCanvas.toDataURL('image/png') }) // fallback
                }
              }, 'image/png')
            }))
          }
        }
      }
      
      Promise.all(promises).then(results => {
        // 按正确的索引排序
        results.sort((a, b) => a.index - b.index)
        resolve(results.map(r => r.url))
      }).catch(reject)
    }
    img.onerror = reject
    img.src = imageSrc
  })
}

/**
 * 打乱数组（Fisher-Yates 算法）
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
