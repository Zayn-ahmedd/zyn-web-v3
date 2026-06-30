"use client";
import React from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  region: string;
  flag: string;
  avatarGradient: string;
  avatarText: string;
  rating: number;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 10,
}: TestimonialsColumnProps) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map((r, i) => (
                <div
                  key={`${index}-${i}`}
                  className="group relative rounded-[28px] border border-border bg-white p-6 sm:p-8 hover:shadow-elegant transition-all duration-300 flex flex-col justify-between w-[320px] sm:w-[350px] shrink-0"
                >
                  <div>
                    {/* Rating Stars */}
                    <div className="flex gap-0.5 mb-6">
                      {[...Array(r.rating)].map((_, starIdx) => (
                        <Star key={starIdx} className="size-4 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>

                    <blockquote className="text-[15px] sm:text-base text-ink-soft leading-relaxed italic mb-8 relative">
                      <Quote className="size-8 text-border/60 absolute -top-4 -left-2 -z-10 opacity-40 rotate-180" />
                      <span className="relative z-10">"{r.quote}"</span>
                    </blockquote>
                  </div>

                  {/* Profile block */}
                  <div className="flex items-center gap-3 pt-6 border-t border-border/80">
                    <div
                      className={`size-11 rounded-full bg-gradient-to-tr ${r.avatarGradient} flex items-center justify-center text-white font-semibold text-xs tracking-tight shadow-elegant`}
                    >
                      {r.avatarText}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink flex items-center gap-1.5">
                        {r.author} <span className="text-base select-none">{r.flag}</span>
                      </div>
                      <div className="text-xs text-ink-soft mt-0.5 leading-snug">
                        {r.role} · <span className="font-semibold text-ink/80">{r.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
