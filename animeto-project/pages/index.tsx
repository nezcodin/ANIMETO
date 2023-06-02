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
    <div className="bg-bg min-h-screen min-w-screen flex justify-center items-center flex-col">
      <h1
        className="font-bebasneue text-8xl text-containerTop"
      >ANIMETO</h1>
      {isMobile ? (
        <p className="font-oswaldlight text-2xl text-buttonBg">click <Link href="/search" className="decoration underline text-buttonText cursor-pointer">here</Link> to get started</p>
      ) : (
        <p
          onMouseEnter={handleHover}
          onMouseLeave={() => setIsHovered(false)}
          className={isHovered ? "font-oswaldlight text-buttonBg text-4xl transition-all duration-500 ease-out cursor-wait" : "font-oswaldlight text-buttonBg text-3xl transition-all duration-500 ease-in"}
        >
          hover over me to get started</p>
      )
      }
    </div>
  )
}
