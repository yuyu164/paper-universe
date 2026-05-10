interface Props {
  onNext: () => void
  onReplay: () => void
  timeUsed: number
}

export default function CompletionModal({ onNext, onReplay, timeUsed }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-ink-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-ink-900 border border-paper-500/50 p-8 rounded-lg shadow-2xl max-w-sm w-full text-center animate-fade-up">
        <h2 className="text-3xl font-serif font-bold text-white mb-2">拼图完成！</h2>
        <p className="text-rice-400 mb-8 text-sm">
          用时：<span className="text-paper-400 font-bold text-lg">{timeUsed}</span> 秒
        </p>
        
        <div className="space-y-3">
          <button 
            onClick={onNext}
            className="w-full py-3 bg-paper-500 hover:bg-paper-600 text-white rounded-sm font-bold tracking-widest transition-colors shadow-lg"
          >
            下一幅纹样 →
          </button>
          
          <button 
            onClick={onReplay}
            className="w-full py-3 bg-ink-800 hover:bg-ink-700 text-rice-300 rounded-sm font-medium transition-colors border border-ink-700"
          >
            再玩一次
          </button>
        </div>
      </div>
    </div>
  )
}
