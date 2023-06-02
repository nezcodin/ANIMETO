import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {

  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

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

  const handleHover = () => {
    setIsHovered(true)
    setTimeout(() => {
      router.push("/search")
    }, 1000)
  }

  return (
    <div className="bg-bg min-h-screen min-w-screen flex justify-center items-center">
      <h1>ANIMETO</h1>
      {isMobile ? (
        <p>click <Link href="/search" className="decoration underline">here</Link> to get started</p>
      ) : (
        <p
          onMouseEnter={handleHover}
          onMouseLeave={() => setIsHovered(false)}
          className={isHovered ? "text-xl transition-all duration-500 ease-out cursor-wait" : "text-md transition-all duration-500 ease-in"}
        >
          hover over me to get started</p>
      )
      }
    </div >
  )
}
