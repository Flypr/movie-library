import Image from 'next/image'

export async function generateStaticParams() {
    const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
    )
    
    const res = await data.json()
    return res.results.map(movie => ({
        movie: toString(movie.id),
    }))
}

export default async function MovieDetail({ params }) {
    const {movie} = params;
    const imagePath = 'https://image.tmdb.org/t/p/original';
    const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
    );
    
    const res = await data.json();

    return (
        <div>
            <div>
                <h2 className="text-2xl">{res.title}</h2>
                <h3 className="text-lg">{res.release_date}</h3>
                <h4>Runtime: {res.runtime} minutes</h4 >
                <h4 className="text-sm bg-green-600 inline-block mt-2 py-1 px-2 rounded">{res.status}</h4>
                <Image 
                    className="my-12 w-full"
                    src={imagePath + res.backdrop_path}
                    width={1000}
                    height={1000}
                    priority
                />
                <p>{res.overview}</p>
            </div>
        </div>
    )
}