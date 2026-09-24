const STEPS = ["placeholder feature one", "placeholder feature two", "placeholder feature three"];

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-[1100px] flex-col items-center py-16 text-center">
      <h1 className="text-[length:clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#382314]">
        Welcome to NoteWorks!
      </h1>
      <p className="mt-6 text-[length:clamp(1.1rem,2.2vw,1.6rem)] text-[#4a5160]">
        uhh snappy taglines go here
      </p>

      <ol className="mt-10 flex flex-wrap justify-center gap-x-20 gap-y-4">
        {STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-3 text-lg text-[#4a5160]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#382314] text-[0.95rem] font-bold text-[#fdfdfd]">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <a
        className="mt-20 rounded-[10px] border-2 border-black bg-white px-11 py-6 text-[1.4rem] font-bold text-black shadow-[-8px_8px_0_0_#000] transition hover:-translate-x-0.5 hover:translate-y-0.5 hover:shadow-[-6px_6px_0_0_#000]"
        href="#"
      >
        get started!
      </a>
    </section>
  );
}
