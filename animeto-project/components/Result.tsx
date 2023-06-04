import { useEffect, useState } from "react"
import axios from "axios"
import { AnimeResult } from "../types/types"
import { useRouter } from "next/router";

export default function Result() {

  const [animeResult, setAnimeResult] = useState<AnimeResult | null>(null);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false)

  // this is grabbing the mal_id from the url
  const router = useRouter();
  const { mal_id } = router.query;

  useEffect(() => {
    const fetchAnimeResult = async () => {
      try {
        const { data } = await axios.get(
          `https://api.jikan.moe/v4/anime/${mal_id}`
        )
        setAnimeResult(data)
      } catch (error) {
        console.log("There was an error! Result.tsx")
      }
    }

    if (mal_id) {
      fetchAnimeResult()
    }

    const timeout = setTimeout(() => {
      if (!animeResult) {
        setShowTimeoutMessage(true)
      }
    }, 10_000)

    return () => clearTimeout(timeout)

  }, [mal_id, animeResult])

  if (showTimeoutMessage) {
    return <p>Sorry, this page has timed out. Please go back to the previous page.</p>;
  }

  if (!animeResult) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>This is the result page.</p>
    </div>
  )
}