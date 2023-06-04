import { useEffect, useState } from "react"
import axios from "axios"
import { AnimeResult } from "../types/types"
import { useRouter } from "next/router";

export default function Result() {

  const [animeResult, setAnimeResult] = useState<AnimeResult | null>(null);

  // this is grabbing the mal_id from the url
  const router = useRouter();
  const { mal_id } = router.query;

  useEffect(() => {
    const fetchAnimeResult = async () => {
      try {
        const { data } = await axios.get(
          `https://api.jikan.moe/v4/anime/${mal_id}`
        );
        setAnimeResult(data);
      } catch (error) {
        console.log("There was an error! Result.tsx");
      }
    };

    fetchAnimeResult();
  }, [mal_id]);

  console.log(animeResult)

  if (!animeResult) {
    return <p>Loading...</p>;
  }

  // if (setTimeout(() => {
  //   return <p>Please refresh the page or go back.</p>
  // }, 10_000)) <- show this if !AnimeResult > 10s

  return (
    <div>
      <p>This is the result page.</p>
    </div>
  )
}