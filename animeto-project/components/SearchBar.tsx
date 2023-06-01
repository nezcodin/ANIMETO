import axios from "axios";
import { useEffect, useState } from "react";

interface AnimeResult {
  id: number
  title: string
  episodes: number
}

export default function SearchBar() {

  const [animeResults, setAnimeResults] = useState<AnimeResult[]>([])

  useEffect(() => {
    const getResults = async () => {
      try {
        const { data } = await axios.get('https://api.jikan.moe/v4/anime?q=naruto&sfw')
        setAnimeResults(data.data)
      } catch (error) {
        console.log('There was an error! SearchBar.tsx')
      }
    }
    getResults()
  }, [])

  console.log(animeResults)

  return (
    <div>
      {animeResults.map(animeResult => (
        <div
          key={animeResult.id}
        >
          <p>{animeResult.title}</p>
        </div>
      ))}
    </div>
  )

}

// set input value to a variable -> searchValue
// https://api.jikan.moe/v4/anime?q={searchValue}&sfw 
    // i think sfw should be on by default and can be switched off in the filters
// show results on screen (need to map it) and console log it


// let searchValue = input.value
