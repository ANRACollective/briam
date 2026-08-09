"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "motion/react";
import Image from "next/image";

// Copy is deliberately static custom text, not CMS-dynamic (boss comment #7).
// Images exported from the updated Figma "Featured projects" cards.
const PROJECTS = [
  {
    title: "Multi-story parking building",
    meta: "12 × 5,000T silos • SCE / BRIAM • Vietnam",
    img: "/images/project-parking.jpg",
  },
  {
    title: "Large warehouse project",
    meta: "8 × 2,000T silos • Silbloxx • Thailand",
    img: "/images/project-warehouse.jpg",
  },
  {
    title: "Full-scope flour mill",
    meta: "4 × 1,500T flat-bottom • Turnkey • Indonesia",
    img: "/images/project-flourmill.jpg",
  },
];

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 bg-cloud section-pad">
      <Container wide>
        <div className="mb-12 text-center md:mb-16">
          <h2 className="type-h2 text-accent">
            Featured projects
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href="#contact"
              aria-label={`${project.title} — enquire about a similar project`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group block cursor-pointer overflow-hidden rounded-md bg-white transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(33,46,54,0.55)]"
            >
              <div className="relative h-[277px] overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/20 transition-colors duration-300 group-hover:bg-ink/35" />
                <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center bg-accent text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-[2rem] uppercase leading-[0.85] tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-3 text-[15px] text-ink/70">{project.meta}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
