"use client";

import React, { useEffect, useRef, useState } from "react";

interface StatItem {
  number: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { number: 50, suffix: "+", label: "Clients Served" },
  { number: 50, suffix: "+", label: "Satisfied Clients" },
  { number: 100, suffix: "+", label: "Projects" }
];

const AnimatedCounter = ({ target, suffix }: { target: number, suffix: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const incrementTime = 30;
          const steps = duration / incrementTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, incrementTime);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return <span ref={nodeRef} className="stat-number-value">{count}{suffix}</span>;
};

interface AnimatedStatsProps {
  statsData?: {
    bgImage?: string | null;
    items?: {
      number: number;
      suffix: string;
      label: string;
    }[];
  };
}

export default function AnimatedStats({ statsData }: AnimatedStatsProps) {
  const displayStats = statsData?.items && statsData.items.length > 0 
    ? statsData.items 
    : stats;

  const bgUrl = statsData?.bgImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920';

  return (
    <section className="animated-stats-section" style={{ backgroundImage: `url('${bgUrl}')` }}>
      <div className="stats-bg-overlay"></div>
      <div className="stats-container">
        <div className="stats-list">
          {displayStats.map((stat, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-value-container">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="stat-label-container">
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animated-stats-section {
          position: relative;
          width: 100%;
          padding: 8rem 1rem;
          background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stats-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.75);
          z-index: 1;
        }

        .stats-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          width: 100%;
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items:center;
          gap: 0.5rem;
          border: none !important;
        }

        .stat-value-container {
          font-size: 4.5rem;
          font-weight: 300;
          color: #ffb600; /* Gold/Yellow matching the reference */
          line-height: 1;
        }

        .stat-label-container {
          margin-top: 0.5rem;
          border: none !important;
          text-align : center;
        }

        .stat-label {
          font-size: 1.35rem;
          color: #ffffff;
          text-align:center;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        @media (max-width: 768px) {
          .animated-stats-section {
            padding: 4rem 1rem;
          }
          .stats-list {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .stat-value-container {
            font-size: 3.5rem;
          }
          .stat-label {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
}
