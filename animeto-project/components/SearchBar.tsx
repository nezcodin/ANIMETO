import axios from "axios";
import { useState } from "react";
import Image from "next/image";

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

  return (
    <div
      className="flex flex-col justify-center items-center p-5 font-oswaldlight text-lg"
    >
      <div>
        <form
          onSubmit={handleSearch}
          className="p-5"
        >
          <input
            placeholder="What do you want to search?"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            className="bg-containerBg text-containerText placeholder-containerTop rounded-xl p-2 mr-5 outline-none pl-3 w-full md:w-96"
          />
          <button
            type="submit"
            className="bg-buttonBg p-2 rounded-xl text-buttonText font-bebasneue"
          >Search</button>
        </form>
      </div>
      {animeResults.length > 0 ? (
        animeResults.map((animeResult) => (
          <div
            key={animeResult.id}
            className="p-10"
          >
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
        ))
      ) : (
        <div>
          <p className="text-containerText text-center mt-10">Hm, there doesn&apos;t seem to be any results. Try searching for something else.</p>
        </div>
      )}
    </div>
  )

}

