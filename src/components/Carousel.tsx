import { useEffect, useMemo, useState } from 'react'

type CarouselProps = {
  title: string
  caption: string
  images: string[]
}

type Slide = {
  gradient: string
  image: string
}

export function Carousel({ title, caption, images }: CarouselProps) {
  const slides = useMemo<Slide[]>(
    () =>
      images.map((img, idx) => ({
        gradient:
          idx % 2 === 0
            ? 'linear-gradient(135deg, rgba(255,196,112,0.85), rgba(255,231,170,0.85))'
            : 'linear-gradient(135deg, rgba(255,177,71,0.85), rgba(255,222,160,0.85))',
        image: img,
      })),
    [images],
  )

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 3500)
    return () => clearInterval(id)
  }, [slides.length])

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length)

  return (
    <section className="space-y-3 px-4 md:px-6">
      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{caption}</p>
      </div>
      <div className="relative overflow-hidden">
        {slides.length > 1 ? (
          <>
           <div
              className="pointer-events-none absolute inset-6 overflow-hidden rounded-3xl opacity-50"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 20%, black)',
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 20%, black)',
                WebkitMaskComposite: 'multiply',
                maskComposite: 'intersect',
              }}
            >
              <img
                src={slides[(index + 1) % slides.length].image}
                alt=""
                className="h-full w-full object-cover blur-lg m-4  "
                style={{ aspectRatio: '9 / 16' }}
                loading="lazy"
              />
            </div>

          </>
        ) : null}
        <div className="relative mx-auto flex h-full w-full max-w-[320px] items-center justify-center px-4 py-6 animate-float">
          <div className="relative w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-lg shadow-black/10">
            <div
              className="absolute inset-0"
              style={{ backgroundImage: slides[index].gradient }}
            />
            <div className="relative" style={{ aspectRatio: '9 / 16' }}>
              <img
                src={slides[index].image}
                alt={`Slide ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.3))]" />
            </div>
            <div className="absolute -left-6 -top-6 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,201,80,0.35),transparent_60%)]" />
            <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(255,170,20,0.35),transparent_60%)]" />
            <div className="absolute bottom-3 right-3 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-800 shadow">
              {index + 1} / {slides.length}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
          {slides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => goTo(dotIdx)}
              className={`h-2.5 rounded-full transition-all ${dotIdx === index ? 'w-6 bg-accent' : 'w-2 bg-slate-300'}`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel
