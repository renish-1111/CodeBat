import Navbar from './core/Navbar'
import Cards from './core/Card/Cards'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CardsSkeleton from './core/Skeleton/CardsSkeleton'

interface Language {
  title: string,
  description: string,
  cover_image: string
}

const Tutorial = () => {

  const [languages, setLanguages] = useState<Language[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/languages')
      .then(res => {
        setLanguages(res.data.languages)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        
      })
  }, [])

  return (
    <div className='bg-tut-bg'>
      <Navbar />
      <main className=" flex px-5 mt-14 items-center justify-center">
        <div className="items-center mt-10 grid lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-10 justify-center">
          
          {loading && <CardsSkeleton />}
          {languages.map((language: Language, index: number) => (
            <div className="py-16 md:py-13" key={index}>
              <Cards {...language} />
            </div>
          ))}


        </div>
      </main>
    </div>
  )
}

export default Tutorial
