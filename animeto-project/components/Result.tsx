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
        <div
          className="bg-containerBg p-8 w-11/12 flex flex-col"
        >
          <div
            className="flex justify-center items-center"
          >
            <Image
              width={200}
              height={300}
              src={animeResult.images?.jpg?.large_image_url}
              alt="anime-poster"
              className="flex justify-center items-center p-3"
            />
          </div>
          <p
            className="font-bebasneue text-buttonBg text-2xl p-2 flex justify-center items-center"
          >{animeResult.title}</p>
          <div
            className="flex p-2 flex-col justify-center"
          >
            <div
              className="flex justify-between pb-2"
            >
              <p className="text-left">Episodes: {animeResult.episodes}</p>
              <p className="text-right">{animeResult.status}</p>
            </div>
            <div
              className="flex justify-between"
            >
              <p className="text-left pr-5">Released: {animeResult.year}</p>
              <p className="text-right pl-5">Rating: {animeResult.rating}</p>
            </div>
          </div>
          <div
            className="flex p-2"
          >
            <p>{animeResult.scored_by} fans rated this {animeResult.score}!</p>
          </div>
          <div
            className="flex flex-col p-2"
          >
            {genres.length > 1 ? (
              <p className="text-left">Genres: {genres.map((genre) => genre.name).join(", ")}</p>
            ) : (
              <p className="text-left">Genre: {genres.map((genre) => genre.name)}</p>
            )}
            {themes.length > 1 ? (
              <p className="text-left">Themes: {themes.map((theme) => theme.name).join(", ")}</p>
            ) : (
              <p className="text-left">Theme: {themes.map((theme) => theme.name)}</p>
            )}
          </div>

          <div
            className="flex flex-col p-2"
          >
            {studios.length > 1 ? (
              <p className="text-left">Studios: {studios.map((studio) => studio.name).join(", ")}</p>
            ) : (
              <p className="text-left">Studio: {studios.map((studio) => studio.name)}</p>
            )}
            {producers.length > 1 ? (
              <p className="text-left">Producers: {producers.map((producer) => producer.name).join(", ")}</p>
            ) : (
              <p className="text-left">Producer: {producers.map((producer) => producer.name)}</p>
            )}
          </div>
          <div
            className="flex flex-col justify-center items-center p-2"
          >
            <p>Synopsis: {animeResult.synopsis}</p>
          </div>
        </div>
      )}
    </div>
  )
}  