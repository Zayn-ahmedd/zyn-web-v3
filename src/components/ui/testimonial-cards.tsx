"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: string;
  id: number;
  author: string;
  role: string;
  company: string;
  avatarGradient: string;
  avatarText: string;
  flag: string;
}

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author,
  role,
  company,
  avatarGradient,
  avatarText,
  flag,
}: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const xOffset = isMobile
    ? position === "front"
      ? 0
      : position === "middle"
        ? 15
        : 30
    : position === "front"
      ? 0
      : position === "middle"
        ? 90
        : 180;

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 30 : position === "middle" ? 20 : 10,
      }}
      animate={{
        rotate: position === "front" ? -5 : position === "middle" ? 0 : 5,
        x: xOffset,
        scale: position === "front" ? 1 : position === "middle" ? 0.95 : 0.9,
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={(_, info) => {
        dragRef.current = info.point.x;
      }}
      onDragEnd={(_, info) => {
        if (dragRef.current - info.point.x > 120) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`absolute left-0 top-0 flex h-[410px] w-[295px] sm:w-[320px] flex-col justify-between rounded-[28px] border border-white/50 bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-elegant select-none ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div>
        {/* Rating Stars */}
        <div className="flex gap-0.5 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-4 fill-amber-400 stroke-amber-400" />
          ))}
        </div>

        {/* Quote Block */}
        <blockquote className="text-[14px] sm:text-[15px] text-ink-soft leading-relaxed italic relative">
          <Quote className="size-8 text-border/60 absolute -top-4 -left-2 -z-10 opacity-30 rotate-180" />
          <span className="relative z-10">"{testimonial}"</span>
        </blockquote>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-3 pt-5 border-t border-border/80">
        <div
          className={`size-11 rounded-full bg-gradient-to-tr ${avatarGradient} flex items-center justify-center text-white font-semibold text-xs tracking-tight shadow-elegant`}
        >
          {avatarText}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-ink flex items-center gap-1.5 truncate">
            {author} <span className="text-base select-none">{flag}</span>
          </div>
          <div className="text-xs text-ink-soft mt-0.5 leading-snug truncate">
            {role} · <span className="font-semibold text-ink/80">{company}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
