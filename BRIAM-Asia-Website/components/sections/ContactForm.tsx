"use client";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { motion } from "motion/react";
import { useState } from "react";

const TOPICS = [
  "Standalone steel structures",
  "Silo-based turnkey project",
  "Silbloxx products",
  "General enquiry",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[15px] text-ink/80">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "h-12 rounded-sm border border-line/70 bg-white px-3 text-ink outline-none transition-all duration-200 placeholder:text-ink/35 focus:border-accent focus:ring-4 focus:ring-accent/20";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [accepted, setAccepted] = useState(false);

  return (
    <section id="contact" className="scroll-mt-24 bg-cloud section-pad">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + contact details */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="type-h2 text-ink">
                Contact us
              </h2>
            </div>

            <div className="mt-10 flex flex-col gap-8 lg:mt-0">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </span>
                <h3 className="font-display mt-4 text-2xl uppercase leading-none tracking-[-0.02em] text-ink">
                  Archit Newaskar
                </h3>
                <a href="mailto:archit.newaskar@briamgroup.com" className="mt-2 block text-ink underline decoration-line hover:decoration-accent">
                  archit.newaskar@briamgroup.com
                </a>
                <p className="mt-1 text-ink/80">T <a href="tel:+6565956689" className="underline decoration-line hover:decoration-accent">+65 6595 6689</a></p>
                <p className="text-ink/80">M <a href="tel:+6582229096" className="underline decoration-line hover:decoration-accent">+65 8222 9096</a></p>
              </div>
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                </span>
                <h3 className="font-display mt-4 text-2xl uppercase leading-none tracking-[-0.02em] text-ink">Office</h3>
                <p className="mt-2 text-ink/80">75 High Street,<br />Singapore 179435</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          {sent ? (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center rounded-lg border border-line/70 bg-white p-12 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display mt-6 text-3xl uppercase leading-none tracking-[-0.02em] text-ink">Message sent</h3>
              <p className="mt-3 max-w-sm text-ink/70">Thanks for reaching out — our team will get back to you shortly.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-sm font-medium text-accent hover:underline">
                Send another message
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Full Name">
                  <input name="fullName" required placeholder="Jane Tan" className={inputCls} />
                </Field>
                <Field label="Company">
                  <input name="company" placeholder="Company Pte Ltd" className={inputCls} />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Email">
                  <input name="email" required type="email" placeholder="jane@company.com" className={inputCls} />
                </Field>
                <Field label="Phone number">
                  <input name="phone" type="tel" placeholder="+65 0000 0000" className={inputCls} />
                </Field>
              </div>
              <Field label="Choose a topic">
                <select name="topic" required defaultValue="" className={cn(inputCls, "cursor-pointer")}>
                  <option value="" disabled>Select one…</option>
                  {TOPICS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Message">
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Type your message…"
                  className={cn(inputCls, "h-auto resize-y py-3 leading-[1.2]")}
                />
              </Field>
              <div className="flex items-center gap-3 text-sm text-ink/80">
                <input
                  id="accept-terms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  required
                  className="h-[18px] w-[18px] accent-accent"
                />
                {/* Terms link is a sibling of the label so clicking it doesn't toggle the box */}
                <span>
                  <label htmlFor="accept-terms">I accept the</label>{" "}
                  <a href="#" className="underline decoration-line hover:decoration-accent">Terms</a>
                </span>
              </div>
              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex w-fit items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-accent-600 hover:shadow-[0_12px_40px_-8px_rgba(119,61,189,0.8)]"
              >
                Submit
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
