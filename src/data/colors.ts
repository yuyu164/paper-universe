import type { ColorScheme } from '@/types'

export const colorSchemes: Record<string, ColorScheme> = {
  red: {
    bg: '#DC2626',
    fg: '#FFFFFF',
    name: '传统红',
    desc: '最经典的剪纸配色，象征喜庆与吉祥。红色是中国剪纸的灵魂色彩，承载着千年来人们对美好生活的祈愿。',
  },
  blue: {
    bg: '#1e3a5f',
    fg: '#FFFFFF',
    name: '蓝印花',
    desc: '江南蓝印花布风格，清新淡雅。蓝色剪纸别具一格，如同水乡烟雨中的一抹宁静。',
  },
  mono: {
    bg: '#111827',
    fg: '#F5F0E8',
    name: '黑白极简',
    desc: '现代极简风格，突出剪纸的线条之美。黑白之间，尽显剪纸艺术的纯粹与力量。',
  },
  colorful: {
    bg: 'linear-gradient(135deg, #DC2626, #eab308, #22c55e)',
    fg: '#FFFFFF',
    name: '现代彩色',
    desc: '当代创新配色，打破传统束缚。多彩的剪纸如同绽放的烟火，展现这门艺术的无限可能。',
  },
}

export const colorLabColors = [
  { id: 'red', bg: '#DC2626', fg: '#FFFFFF', name: '喜庆红', desc: '红色 —— 喜庆与吉祥。中国剪纸最经典的配色，象征着热烈、欢快与祝福。' },
  { id: 'blue', bg: '#1e3a5f', fg: '#FFFFFF', name: '青花蓝', desc: '蓝色 —— 静谧与深远。如同青花瓷般的典雅，赋予剪纸一份江南水乡的诗意。' },
  { id: 'gold', bg: '#92400e', fg: '#facc15', name: '皇家金', desc: '金色 —— 尊贵与辉煌。金色剪纸如同帝王御用，彰显剪纸艺术的至高规格。' },
  { id: 'green', bg: '#14532d', fg: '#86efac', name: '生机绿', desc: '绿色 —— 生命与希望。绿色剪纸如同春日新芽，寓意万物生长、生生不息。' },
]
