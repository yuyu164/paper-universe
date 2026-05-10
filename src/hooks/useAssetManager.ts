import { useState, useCallback, useEffect } from 'react'
import { PuzzleAsset, AssetStatus } from '@/types/puzzle'

const STORAGE_KEY = 'puzzle-assets'

const INITIAL_ASSETS: PuzzleAsset[] = [
  { id: 'crane', src: '/images/puzzle/crane.png', status: 'fresh', lastUsedAt: 0 },
  { id: 'horse', src: '/images/puzzle/horse.png', status: 'fresh', lastUsedAt: 0 },
  { id: 'magpie', src: '/images/puzzle/magpie.png', status: 'fresh', lastUsedAt: 0 },
  { id: 'cock', src: '/images/puzzle/cock.png', status: 'fresh', lastUsedAt: 0 },
  { id: 'fu', src: '/images/puzzle/fu.png', status: 'fresh', lastUsedAt: 0 },
  { id: 'bird_flower', src: '/images/puzzle/bird_flower.png', status: 'fresh', lastUsedAt: 0 },
]

export function useAssetManager() {
  const [assets, setAssets] = useState<PuzzleAsset[]>(INITIAL_ASSETS)
  const [currentAssetId, setCurrentAssetId] = useState<string | null>(INITIAL_ASSETS[0].id)

  // 客户端挂载后读取本地存储并随机选择
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    let storedAssets: PuzzleAsset[] = stored ? JSON.parse(stored) : []

    if (storedAssets.length > 0) {
      const merged = [...storedAssets]
      INITIAL_ASSETS.forEach(initAsset => {
        if (!merged.find(a => a.id === initAsset.id)) {
          merged.push(initAsset)
        }
      })
      setAssets(merged)

      const fresh = merged.filter(a => a.status === 'fresh')
      if (fresh.length > 0) {
        setCurrentAssetId(fresh[Math.floor(Math.random() * fresh.length)].id)
      } else {
        setCurrentAssetId(merged[0]?.id || null)
      }
    } else {
      // 如果没有存储，随机选一个 fresh 的
      const fresh = INITIAL_ASSETS.filter(a => a.status === 'fresh')
      if (fresh.length > 0) {
        setCurrentAssetId(fresh[Math.floor(Math.random() * fresh.length)].id)
      }
    }
  }, [])

  // 持久化
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets))
  }, [assets])

  // 获取当前素材
  const currentAsset = assets.find(a => a.id === currentAssetId) || null

  // 选择新素材（换一换）
  const selectNewAsset = useCallback(() => {
    // 1. 标记当前为 skipped（如果有）
    setAssets(prev => {
      if (!currentAssetId) return prev
      return prev.map(a =>
        a.id === currentAssetId
          ? { ...a, status: 'skipped' as AssetStatus, lastUsedAt: Date.now() }
          : a
      )
    })

    // 2. 等待 state 更新后，筛选 fresh 素材并随机选择
    setAssets(prev => {
      let freshAssets = prev.filter(a => a.status === 'fresh' && a.id !== currentAssetId)

      // 3. 如果没有 fresh，重置所有为 fresh
      if (freshAssets.length === 0) {
        const resetAssets = prev.map(a => ({ ...a, status: 'fresh' as AssetStatus }))
        freshAssets = resetAssets.filter(a => a.id !== currentAssetId)
        if (freshAssets.length === 0) freshAssets = resetAssets // 兜底：如果总共只有1张图

        const randomAsset = freshAssets[Math.floor(Math.random() * freshAssets.length)]
        setCurrentAssetId(randomAsset.id)
        return resetAssets
      }

      // 4. 随机选择
      const randomAsset = freshAssets[Math.floor(Math.random() * freshAssets.length)]
      setCurrentAssetId(randomAsset.id)
      return prev
    })
  }, [currentAssetId])

  // 标记当前为 played
  const markAsPlayed = useCallback(() => {
    if (!currentAssetId) return
    setAssets(prev =>
      prev.map(a =>
        a.id === currentAssetId
          ? { ...a, status: 'played' as AssetStatus, lastUsedAt: Date.now() }
          : a
      )
    )
  }, [currentAssetId])

  // 重置所有状态（用于测试）
  const resetAll = useCallback(() => {
    setAssets(INITIAL_ASSETS)
    setCurrentAssetId(INITIAL_ASSETS[0]?.id || null)
  }, [])

  return {
    assets,
    currentAsset,
    currentAssetId,
    selectNewAsset,
    markAsPlayed,
    resetAll
  }
}
