/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import Logo from "./components/Logo";
import NotifyForm from "./components/NotifyForm";

export default function App() {
  const cinematicTransition = {
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1],
  };

  const copy = [
    ["You're a little early. That's the point."],
    [
      "We're building what comes next.",
      "Faster, more opinionated, and designed to replace the fragmented process that breaks most stories before they start."
    ],
    [
      "Built to drive conversion across every marketing surface.",
      "AI to find the signal. Journalistic instinct to shape it.",
      "A system that learns and shifts autonomously."
    ],
    ["If you've felt the gap, you're in the right place."]
  ];

  return (
    <main className="relative min-h-[100svh] bg-black flex flex-col items-center justify-center overflow-x-hidden p-4">
      {/* Outer Padding Wrapper */}
      <div className="relative z-10 w-full flex flex-col items-center max-h-full">

        {/* The Container with Glow Beam */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cinematicTransition}
          className="relative w-full max-w-[600px] p-[1px] overflow-hidden rounded-xl shadow-2xl flex flex-col max-h-[90svh] md:max-h-none group"
        >
          {/* Rotating Glow Beam Layer */}
          <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,white_0deg,white_330deg,transparent_345deg,white_360deg)] opacity-40 animate-spin-slow pointer-events-none z-0" />

          {/* Inner Card Content */}
          <div className="relative z-10 w-full h-full bg-black rounded-[calc(0.75rem-1px)] flex flex-col border border-white/10">
            <div className="flex-1 flex flex-col px-6 py-8 md:px-10 md:py-16 lg:py-20 text-center h-full md:min-h-[700px]">

              {/* Top Spacer */}
              <div className="flex-[0.4] md:flex-[0.5]" />

              {/* Masthead */}
              <div className="mb-8 md:mb-12 flex flex-col items-center">
                <Logo />
                <div className="mt-2 text-[10px] md:text-[13px] font-display font-medium text-white tracking-[0.15em] uppercase">
                  Slugline Studio
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">

                {/* Copy — always visible, staggered in */}
                <div className="space-y-4 md:space-y-6 font-display w-full mb-8 md:mb-12">
                  {copy.map((paragraph, pIndex) => (
                    <div key={pIndex} className={pIndex === 3 ? "pt-4 md:pt-6" : "space-y-1"}>
                      {paragraph.map((line, lIndex) => (
                        <p key={lIndex} className="text-white/90 text-[13px] md:text-base leading-relaxed font-light max-w-[480px] mx-auto overflow-hidden">
                          <motion.span
                            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                              duration: 1,
                              delay: 0.2 + (pIndex * 0.3) + (lIndex * 0.15),
                              ease: [0.16, 1, 0.3, 1]
                            }}
                            className="block"
                          >
                            {line}
                          </motion.span>
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...cinematicTransition, delay: 1.4 }}
                  className="w-full"
                >
                  <NotifyForm />
                </motion.div>

              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.8 }}
                className="mt-8 md:mt-12 text-[9px] uppercase tracking-[0.1em] font-medium text-white/60"
              >
                © 2026 Slugline Studio. All rights reserved.
              </motion.div>

              {/* Bottom Spacer */}
              <div className="flex-[1.5] md:flex-[2]" />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
