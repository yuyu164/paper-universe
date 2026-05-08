export interface HistoryEvent {
  year: string
  title: string
  description: string
  image: string
}

export interface PaperStyle {
  id: string
  name: string
  region: string
  description: string
  tags: string[]
  image: string
  detail: string
  features: string[]
}

export interface Pattern {
  id: string
  name: string
  meaning: string
  description: string
  image: string
  category: '吉祥纹' | '生肖' | '花鸟' | '人物'
}

export interface Artisan {
  id: string
  name: string
  style: string
  years: number
  quote: string
  image: string
  bio: string
}

export interface ModernApp {
  id: string
  title: string
  description: string
  category: '品牌设计' | '包装' | '服装' | '空间装饰' | '数字艺术'
  image: string
}

export interface ColorScheme {
  bg: string
  fg: string
  name: string
  desc: string
}

export type FoldType = 'half' | 'quarter' | 'eighth'

export interface CutPattern {
  id: string
  name: string
  image: string
  resultImage: string
  compatibleFolds: FoldType[]
}
