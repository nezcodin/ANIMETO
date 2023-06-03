import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from '@iconify/react';
import Link from "next/link";

interface AnimeResult {
  id: number
  title: string
  episodes: number
  status: string
  year: number
  themes: string[]
  studio: string[]
  producers: string[]
  score: number
  scored_by: number
  images: {
    jpg: {
      image_url: string
      large_image_url: string
      small_image_url: string
    }
  }
  genres: string[]
  rating: string
  synopsis: string
}

export default function SearchBar() {

  const [animeResults, setAnimeResults] = useState<AnimeResult[]>([])
  const [textSearch, setTextSearch] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const getResults = async () => {
    try {
      const { data } = await axios.get(`https://api.jikan.moe/v4/anime?q=${textSearch}&sfw`)
      setAnimeResults(data.data)
    } catch (error) {
      console.log('There was an error! SearchBar.tsx')
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getResults();
  };

  console.log(animeResults)

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
    <div
      className="flex flex-col justify-center items-center p-5 font-oswaldlight text-lg"
    >
      <div>
        <form
          onSubmit={handleSearch}
          className="p-5 flex justify-center items-center mb-5"
        >
          <input
            placeholder="What do you want to search?"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            className="bg-containerBg text-containerText placeholder-containerTop rounded-3xl p-2 mr-3 outline-none pl-3 max-sm:w-52 md:w-96"
          />
          <button
            type="submit"
            className="text-buttonText"
          >
            <Icon
              icon="iconamoon:search-light"
              className="text-4xl"
            />
          </button>
        </form>
      </div>
      {animeResults.length > 0 ? (
        animeResults.map((animeResult) => (
          <div
            key={animeResult.id}
            className="p-8 mb-10 bg-containerBg text-lg w-11/12"
          >
            {isMobile ? (
              <div>
                <div
                  className="mb-5 flex justify-center items-center xxs:flex-col md:flex-row"
                >
                  <Image
                    width={200}
                    height={300}
                    src={animeResult.images.jpg.large_image_url}
                    alt="anime-poster"
                    className="flex justify-center items-center"
                  />
                  <div
                    className="flex flex-col justify-center items-center text-center p-3"
                  >
                    <p
                      className="font-bebasneue text-2xl p-2"
                    >{animeResult.title}</p>
                    <p
                      className="p-2"
                    >Episodes: {animeResult.episodes}</p>
                    <p
                      className="p-2"
                    >{animeResult.status}</p>
                  </div>
                </div>
                <p
                  className="line-clamp-5"
                >Synopsis: {animeResult.synopsis}</p>
                <Link
                  href="#"
                  className="text-buttonText decoration underline flex justify-end mt-4"
                >Read More...</Link>
              </div>
            ) : (
              <div>
                <Image
                  width={200}
                  height={300}
                  src={animeResult.images.jpg.large_image_url}
                  alt="anime-poster"
                />
                <p>{animeResult.title}</p>
                <p>Episodes: {animeResult.episodes}</p>
                <p>Released: {animeResult.year}</p>
                <p>{animeResult.status}</p>
                <p>{animeResult.scored_by} fans rated this a {animeResult.score}!</p>
                <p>Synopsis: {animeResult.synopsis}</p>
              </div>
            )}

          </div>
        ))
      ) : (
        <div>
          <p className="text-containerText text-center mt-10">Hm, there doesn&apos;t seem to be any results. Try searching for something else.</p>
        </div>
      )}
    </div>
  )
}
