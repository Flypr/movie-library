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
    console.log(res);

    return (
        <div>
            <h1 className="text-2xl">{res.title}</h1>
            <span className="text-lg">{res.release_date}</span>
            <h4>{res.vote_average} ({res.vote_count})</h4>
            <h4>Runtime: {res.runtime} minutes</h4 >
            <div className='flex gap-2'>
                {res.genres.map(gen => (
                    <span className='underline'>{gen.name}</span>
                ))}
            </div>
            <Image 
                className="my-12 w-full"
                src={imagePath + res.backdrop_path}
                width={1000}
                height={1000}
                priority
            />
            <p>{res.overview}</p>
        </div>
    )
}