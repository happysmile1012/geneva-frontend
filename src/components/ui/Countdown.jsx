import React, { useEffect, useState, memo } from "react";

const maxValue = (mode) => (mode === "consensus" ? 40 : 10);

const Countdown = memo(function Countdown({ waiting, mode, theme }) {
  const [count, setCount] = useState(maxValue(mode));

  useEffect(() => {
    if (!waiting) return;
    setCount(maxValue(mode));
    const id = setInterval(() => {
      setCount((prev) => {
        const next = prev - 1;
        return next < 0 ? maxValue(mode) : next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [waiting, mode]);

  if (!waiting) return null;

  return (
    <div className="mx-auto flex flex-col flex-1 md:max-w-3xl my-4">
      <div className="mx-4 py-4 flex items-center text-2xl">
        <img src="/image/logo.png" alt="logo" className="w-[37] mr-2" />
        <span
          style={{ color: theme === "light" ? "dark" : "white" }}
          className="flex items-center"
        >
          Consulting the council
          <span className="flex">
            <span
              className="dot dot1"
              style={{ color: theme === "light" ? "dark" : "white" }}
            >
              .
            </span>
            <span
              className="dot dot2"
              style={{ color: theme === "light" ? "dark" : "white" }}
            >
              .
            </span>
            <span
              className="dot dot3"
              style={{ color: theme === "light" ? "dark" : "white" }}
            >
              .
            </span>
          </span>
        </span>
        <div className="relative h-[100]">
          <img
            src="/image/counter.png"
            alt="logo"
            className={`w-[70px] transform float-animation transition-transform duration-300 ease-in-out`}
          />
        </div>
        <span>{count}</span>

        <style jsx>{`
          @keyframes float {
            0% {
              transform: translateY(5px);
            }
            50% {
              transform: translateY(-5px);
            }
            100% {
              transform: translateY(5px);
            }
          }
          .float-animation {
            animation: float 1s ease-in-out infinite;
          }
          .dot {
            animation: bounce 1.5s infinite;
            font-size: 2rem;
            line-height: 1;
            margin-top: -4px;
          }
          .dot1 {
            animation-delay: 0s;
          }
          .dot2 {
            animation-delay: 0.2s;
          }
          .dot3 {
            animation-delay: 0.4s;
          }
          @keyframes bounce {
            0%,
            80%,
            100% {
              transform: scale(1);
              opacity: 0.5;
            }
            40% {
              transform: scale(1.4);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
});

export default Countdown;
