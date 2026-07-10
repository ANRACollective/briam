"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { motion } from "motion/react";
import Image from "next/image";

const MARKETS = [
  { name: "Singapore", img: "/images/city-singapore-2.jpg" },
  { name: "Thailand", img: "/images/city-skyline.jpg" },
  { name: "Vietnam", img: "/images/city-oldtown.jpg" },
  { name: "Indonesia", img: "/images/city-skyline-2.jpg" },
  { name: "Malaysia", img: "/images/city-kl.jpg" },
  { name: "Philippines", img: "/images/city-nightmarket.jpg" },
  { name: "Myanmar", img: "/images/city-myanmar.jpg" },
  { name: "Cambodia", img: "/images/city-oldtown-2.jpg" },
];

export function MarketsServed() {
  return (
    <section id="markets" className="scroll-mt-24 bg-cloud py-20 md:py-28">
      <Container>
        <div className="mb-10 md:mb-14">
          <Eyebrow className="mb-5">Coverage</Eyebrow>
          <h2 className="font-display text-[clamp(2.6rem,5vw,4rem)] uppercase leading-[0.85] tracking-[-0.02em] text-accent">
            Markets served
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {MARKETS.map((market, i) => (
            <motion.div
              key={market.name}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex h-[200px] items-end overflow-hidden rounded-md p-5"
            >
              <Image
                src={market.img}
                alt={`${market.name} — a market served by BRIAM Asia`}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/45 transition-colors duration-300 group-hover:bg-ink/25" />
              <span className="absolute left-0 top-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              <h3 className="font-display relative text-[2rem] uppercase leading-[0.85] tracking-[-0.02em] text-white">
                {market.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
