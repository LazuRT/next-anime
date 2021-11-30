import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '../context/context';

import { ISearchAnime, cardType, ISingleAnime } from '../model';
import styles from '../styles/ResultCard.module.scss';

interface Props<T> {
	anime: T;
	cardType?: cardType;
}

const ResultCard = <T extends ISearchAnime>({ anime, cardType }: Props<T>) => {
	const router = useRouter();
	const { deleteFromWatchlist } = useContext(AppContext);

	return (
		<Link href={`/anime/${anime.mal_id}`}>
			<div className={styles.card}>
				<div className={styles.imageContainer}>
					<img src={anime.image_url} alt="" />
				</div>
				<p>{anime.title}</p>

				{cardType === 'watchlistCard' && (
					<div>
						<button>Delete From Watchlist</button>
						<button>Move To Watched</button>
					</div>
				)}
				{cardType === 'watchedCard' && (
					<div>
						{/* <button onClick={() => deleteFromWatchlist(anime)}>Delete From Watched</button> */}
						<button>Move To Watchlist</button>
					</div>
				)}

				{/* <button onClick={() => router.push(`/anime/${anime.mal_id}`)}>Details</button> */}
			</div>
		</Link>
	);
};

export default ResultCard;
