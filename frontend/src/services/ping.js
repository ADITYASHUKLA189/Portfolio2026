import axios from "axios";

const API_URL = process.env.REACT_APP_API_URI || "";

/**
 * Pings backend quickly with a 2.5s timeout.
 * Never hangs the initial load.
 */
export const pingBackend = async () => {
  try {
    await axios.get(`${API_URL}/ping`, { timeout: 2500 });
    return true;
  } catch (error) {
    // Start background wakeup so Render service wakes up without freezing the UI
    wakeUpBackendInBackground();
    return false;
  }
};

export const pingDatabase = async () => {
  return pingBackend();
};

/**
 * Silent background wakeup for Render free-tier cold starts.
 * Pings every 5 seconds up to 15 times in the background.
 */
let wakeUpRunning = false;
export const wakeUpBackendInBackground = () => {
  if (wakeUpRunning || !API_URL) return;
  wakeUpRunning = true;
  let attempts = 0;
  const interval = setInterval(async () => {
    attempts++;
    try {
      await axios.get(`${API_URL}/ping`, { timeout: 5000 });
      clearInterval(interval);
      wakeUpRunning = false;
    } catch {
      if (attempts >= 15) {
        clearInterval(interval);
        wakeUpRunning = false;
      }
    }
  }, 5000);
};
