import { useEffect, useState } from 'react'

interface Props {
  active: boolean
}

export default function PaperConfetti({ active }: Props) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    delay: number
    duration: number
    rotation: number
  }>>([])
  
  useEffect(() => {
    if (!active) return
    
    // 生成 30 个纸屑粒子
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,  // 随机水平位置
      delay: Math.random() * 0.5,  // 随机延迟
      duration: 1.5 + Math.random(),  // 随机下落时间
      rotation: Math.random() * 360  // 随机旋转
    }))
    
    setParticles(newParticles)
    
    // 2秒后清理
    const timer = setTimeout(() => setParticles([]), 3000)
    return () => clearTimeout(timer)
  }, [active])
  
  if (!active || particles.length === 0) return null
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute w-3 h-3 bg-paper-500 shadow-sm"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`
          }}
        />
      ))}
    </div>
  )
}
