import { useInfiniteQuery } from "@tanstack/react-query"
import { UIEvent } from "react"
import { api } from "./lib/api"

type ImageData = {
  id: string,
  urls: {
    regular: string
  }
}

export function Home() {
  async function fetchPhotos({ pageParam }: { pageParam: number }) {
    const response = await api.get<ImageData[]>('/photos', {
      params: {
        page: pageParam,
        per_page: 5,
      }
    })

    return {
      data: response.data,
      nextPage: pageParam + 1
    }
  } 

  const { data, isLoading, fetchNextPage, isFetchingNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryFn: fetchPhotos,
    queryKey: ['photos'],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage
    }
  })

  function handleScroll(event: UIEvent<HTMLElement>) {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget
    
    if (scrollTop + clientHeight >= scrollHeight) {
      fetchNextPage()
    }
};

  
  return (
    <main className="h-screen w-screen bg-zinc-950 flex flex-col gap-6 p-6 items-center text-white overflow-auto" onScroll={handleScroll}>
      {isLoading ? 'Loading...' : (
        <>
          {data?.pages.map((group, i) => (
            <div className="flex flex-col gap-6" key={i}>
              {group.data.map(({ id, urls }) => (
                <img className="aspect-square rounded-md h-[550px] object-cover" src={urls.regular} key={id} />
              ))}
            </div>
          ))}
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
      )}
    </main>
  )
}
