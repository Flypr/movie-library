import Link from "next/link";
import Image from "next/image";

export default async function Movie({ title, id, poster_path, release_date, vote_average, vote_count }) {
    const imagePath = 'https://image.tmdb.org/t/p/original';

    return (
        <div>
            <Link href={`/${id}`}>
                <Image 
                    src={imagePath + poster_path} 
                    width={800}
                    height={800}
                    alt={title}
                />
            </Link>
            <Link href={`/${id}`}>
                <h2>{title}</h2>
            </Link>
            <h3>{release_date}</h3>
            <span>{vote_average} ({vote_count})</span>
        </div>
    )
}