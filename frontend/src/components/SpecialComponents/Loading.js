import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../../styles/Loading.css";
import { pingDatabase } from "../../services/ping";

const greetings = ["Hello", "नमस्ते", "Bonjour", "こんにちは", "مرحبا"];

const Loading = ({ isBatterySavingOn, setIsBatterySavingOn, onComplete }) => {
  const [status, setStatus] = useState({ backend: false, database: false });
  const [loaded, setLoaded] = useState(false);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [allGreetingsShown, setAllGreetingsShown] = useState(false);
  const [mustLoadImageStatus, setMustLoadImageStatus] = useState({
    loaded: 0,
    total: 0,
    error: false,
  });
  const [stats, setStats] = useState({
    prefersReducedMotion: false,
    isLowBattery: false,
    lowPerformanceDevice: false,
    lowMemoryDevice: false,
    isCpuThrottled: false,
    isTouchDevice: false,
    cpuTestDuration: null,
  });

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Rotate greetings every 300ms. Mark allGreetingsShown after all 5 have been displayed (~1.5s).
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (!mountedRef.current) return;
      count++;
      setCurrentGreetingIndex((prevIndex) => {
        const next = (prevIndex + 1) % greetings.length;
        if (count >= greetings.length) {
          setAllGreetingsShown(true);
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Check backend status without hanging. Proceeds immediately whether online or offline.
  useEffect(() => {
    let isCancelled = false;
    const checkStatus = async () => {
      try {
        const isOnline = await pingDatabase();
        if (isCancelled || !mountedRef.current) return;
        setStatus({ backend: isOnline, database: isOnline });

        if (isOnline && process.env.REACT_APP_API_URI) {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URI}/must-load-images`,
              { signal: AbortSignal.timeout(2000) }
            );
            const urls = await response.json();
            if (!isCancelled && mountedRef.current && Array.isArray(urls)) {
              urls
                .filter((url) => url && !/system-user\.webp|user-icon\.svg/i.test(url))
                .forEach((url) => {
                  const link = document.createElement("link");
                  link.rel = "preload";
                  link.as = "image";
                  link.href = url;
                  document.head.appendChild(link);
                });
              setMustLoadImageStatus({
                loaded: urls.length,
                total: urls.length,
                error: false,
              });
            }
          } catch {
            // Ignore image preload errors to avoid delaying loading
          }
        }
      } catch (err) {
        console.error("Check status error:", err);
      } finally {
        if (!isCancelled && mountedRef.current) {
          setLoaded(true);
        }
      }
    };

    checkStatus();

    // Safety fallback: Never keep user waiting longer than 2.2 seconds!
    const fallbackTimer = setTimeout(() => {
      if (!isCancelled && mountedRef.current) {
        setLoaded(true);
        setAllGreetingsShown(true);
      }
    }, 2200);

    return () => {
      isCancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setStats({
      prefersReducedMotion,
      isLowBattery: false,
      lowPerformanceDevice: false,
      lowMemoryDevice: false,
      isCpuThrottled: false,
      isTouchDevice,
      cpuTestDuration: null,
    });
  }, []);

  // Trigger onComplete as soon as greetings finish & loaded is true
  useEffect(() => {
    if (loaded && allGreetingsShown && onComplete) {
      onComplete();
    }
  }, [loaded, allGreetingsShown, onComplete]);

  // Update scale for loading content
  useEffect(() => {
    const updateScale = () => {
      const loadingContainer = document.querySelector(".loading-content");
      if (!loadingContainer) return;
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      let scaleValue = 1;
      if (screenHeight < 826 && screenWidth > 576) {
        scaleValue = screenHeight / 826;
      }
      loadingContainer.style.zoom = `${scaleValue}`;
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return !loaded || !allGreetingsShown ? (
    <motion.div
      className="loading-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="loading-content">
        <div
          className="current-mode"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: isBatterySavingOn ? "red" : "green",
          }}
        ></div>
        <div
          className="stats-box"
          style={{
            position: "absolute",
            top: "40px",
            right: "10px",
            padding: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            borderRadius: "5px",
            fontSize: "12px",
            lineHeight: "1.5",
          }}
        >
          <div>Reduced Motion: {stats.prefersReducedMotion ? "Yes" : "No"}</div>
          <div>Low Battery: {stats.isLowBattery ? "Yes" : "No"}</div>
          <div>Low Performance: {stats.lowPerformanceDevice ? "Yes" : "No"}</div>
          <div>Low Memory: {stats.lowMemoryDevice ? "Yes" : "No"}</div>
          <div>CPU Throttled: {stats.isCpuThrottled ? "Yes" : "No"}</div>
          <div>Touch Device: {stats.isTouchDevice ? "Yes" : "No"}</div>
        </div>
        <div className="greeting">
          <motion.h1
            key={greetings[currentGreetingIndex]}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {greetings[currentGreetingIndex]}
          </motion.h1>
        </div>
        <div className="status">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Connecting to Backend {status.backend && <span>✅</span>}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Connecting to Database {status.database && <span>✅</span>}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {"ontouchstart" in window || navigator.maxTouchPoints > 0
              ? "Optimized for Touch Devices ✅"
              : "Amplifying Animations ✅"}
          </motion.p>
        </div>
      </div>
    </motion.div>
  ) : null;
};

export default Loading;
