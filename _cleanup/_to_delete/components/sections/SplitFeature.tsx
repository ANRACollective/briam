"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export type SplitFeatureProps = {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  body: React.ReactNode;
  image: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  cta?: { label: string; href: string };
  className?: string;
};

export function SplitFeature({
  id,
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  imageSide = "right",
  cta,
  className,
}: SplitFeatureProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const text = (
    <div className="flex flex-col justify-center py-14 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[560px]"
      >
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
        <h2 className="font-display text-[clamp(2.6rem,5vw,4.1rem)] leading-[0.85] tracking-[-0.02em] text-accent">
          {title}
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/80">
          {body}
        </div>
        {cta && (
          <div className="mt-8">
            <Button href={cta.href} variant="accent">
              {cta.label}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );

  const media = (
    <div
      ref={ref}
      className="relative min-h-[340px] overflow-hidden rounded-lg lg:min-h-[560px]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y, scale: 1.12 }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
      {/* Clip-reveal wipe */}
      {!reduce && (
        <motion.div
          className="absolute inset-0 z-10 bg-cloud"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ originY: 0 }}
        />
      )}
    </div>
  );

  return (
    <section id={id} className={cn("scroll-mt-24 bg-cloud", className)}>
      <Container>
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-16">
          {imageSide === "left" ? (
            <>
              <div className="order-2 lg:order-1">{media}</div>
              <div className="order-1 lg:order-2">{text}</div>
            </>
          ) : (
            <>
              {text}
              {media}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
