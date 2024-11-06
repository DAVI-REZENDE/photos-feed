import { useEffect, useState } from "react"
import { api } from "./lib/api"

type ImageData = {
  id: string,
  urls: {
    regular: string
  }
}

export function Home() {
  const [data, setData] = useState<ImageData[]>()
  async function fetchPhotos() {
    const response = await api.get<ImageData[]>('/photos')
    setData(response.data)
  }

  useEffect(() => {
    fetchPhotos()
  }, [])
  
  return (
    <main className="h-screen w-screen bg-zinc-950 flex flex-col gap-6 p-6 items-center text-white overflow-auto">
      {data?.map(({ id, urls }) => (
        <img className="aspect-square rounded-md h-[550px] object-cover" src={urls.regular} key={id} />
      ))}
    </main>
  )
}
