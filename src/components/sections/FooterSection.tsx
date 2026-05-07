export default function FooterSection() {
  return (
    <footer className="bg-paper-950 py-16 px-6 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <blockquote className="mb-8">
          <p className="text-xl md:text-2xl font-serif text-rice-200 leading-relaxed">
            &ldquo;每一刀剪下去的，不只是纸，是时间。&rdquo;
          </p>
          <cite className="block mt-3 text-sm font-sans font-light text-rice-400 not-italic">
            —— 一位剪纸老艺人
          </cite>
        </blockquote>

        <div className="w-32 h-px bg-paper-800 mx-auto mb-8" aria-hidden="true" />

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {['Next.js', 'Tailwind CSS', 'TypeScript'].map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 border border-paper-800 text-paper-400 font-sans"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-sm font-sans font-light text-rice-500 mb-2">
          参考资源：
          <a
            href="https://ihchina.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper-400 hover:text-paper-300 transition-colors duration-200 underline underline-offset-2 focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none"
          >
            中国非物质文化遗产网 ihchina.cn
          </a>
        </p>

        <p className="text-xs font-sans font-light text-rice-600 mt-4">
          © 2026 纸间万象 | 课程作业
        </p>
      </div>
    </footer>
  )
}
