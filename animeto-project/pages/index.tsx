import { useEffect, useState } from "react";

export default function Home() {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      setIsMobile(screenWidth < 1024)
    };

    handleResize(); // Check initial screen width

    // Update screen width on component updates
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, []);

  return (
    <div className="bg-bg min-h-screen min-w-screen flex justify-center items-center">
      <h1>ANIMETO</h1>
      {isMobile ? (
        <p>click here to get started</p>
      ) : (
        <p>hover over me to get started</p>
      )}
    </div>
  )
}

// if w-screen < lg screen => 'click to get started'; element click -> take to search page (link) : 'hover to get started'; element hover -> take to search page (link)
