import { useState, useEffect } from "react";

export default function MobileBlocker({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    // Check on mount
    checkMobile();
    // Check on resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card text-center p-4 shadow">
          <h2 className="card-title text-danger mb-3">Desktop Only</h2>
          <div className="card-body">
            <p className="lead">
              This application is designed for desktop use only.
            </p>
            <p>
              Please access this website from a desktop computer for the best
              experience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
