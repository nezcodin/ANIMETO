import { useEffect, useState } from "react"
import axios from "axios"
import { AnimeResult } from "../types/types"
import { useRouter } from "next/router";
import Image from "next/image";

export default function Result() {

  const [animeResult, setAnimeResult] = useState<AnimeResult | null>(null);
  const [genres, setGenres] = useState<{ name: string }[]>([])
  const [themes, setThemes] = useState<{ name: string }[]>([])
  const [studios, setStudios] = useState<{ name: string }[]>([])
  const [producers, setProducers] = useState<{ name: string }[]>([])
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
        // console.log(data.data)
        setAnimeResult(data.data)
        setGenres(data.data.genres)
        setThemes(data.data.themes)
        setStudios(data.data.studios)
        setProducers(data.data.producers)
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

  // console.log(genres)

  if (showTimeoutMessage) {
    return <p>Sorry, this page has timed out. Please go back to the previous page.</p>;
  }

  if (!animeResult) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center text-lg font-oswaldlight p-5">
      {animeResult && (
        <div className="bg-containerBg">
          <Image
            width={200}
            height={300}
            src={animeResult.images?.jpg?.large_image_url}
            alt="anime-poster"
            className="flex justify-center items-center"
          />
          <div>
            <div>
              <p>{animeResult.title}</p>
              <p>Episodes: {animeResult.episodes}</p>
              <p>Released: {animeResult.year}</p>
            </div>
            <div>
              <p>{animeResult.scored_by} fans rated this {animeResult.score}!</p>
            </div>
            <div>
              {genres.length > 1 ? (
                <p>Genres: {genres.map((genre) => genre.name).join(", ")}</p>
              ) : (
                <p>Genre: {genres.map((genre) => genre.name)}</p>
              )}
              {themes.length > 1 ? (
                <p>Themes: {themes.map((theme) => theme.name).join(", ")}</p>
              ) : (
                <p>Theme: {themes.map((theme) => theme.name)}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <p>{animeResult.status}</p>
              <p>Rating: {animeResult.rating}</p>
            </div>
            <div>
              {studios.length > 1 ? (
                <p>Studios: {studios.map((studio) => studio.name).join(", ")}</p>
              ) : (
                <p>Studio: {studios.map((studio) => studio.name)}</p>
              )}
              {producers.length > 1 ? (
                <p>Producers: {producers.map((producer) => producer.name).join(", ")}</p>
              ) : (
                <p>Producer: {producers.map((producer) => producer.name)}</p>
              )}
            </div>
          </div>
          <div>
            <p>Synopsis: {animeResult.synopsis}</p>
          </div>
        </div>
      )}
    </div>
  )
}  