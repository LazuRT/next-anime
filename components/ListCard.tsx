import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '../context/context';

import { cardType, ISingleAnime } from '../model';
import styles from '../styles/ListCard.module.scss';
import useFirestore from '../hooks/useFirestore';

interface Props<T> {
	anime: T;
	cardType?: cardType;
}

const ListCard = <T extends ISingleAnime>({ anime, cardType }: Props<T>) => {
	const router = useRouter();
	const { state, deleteFromWatchlist, addAnimeToWatched, moveToWatchlist, deleteFromWatched } = useContext(AppContext);
	const { deleteItem, moveItem } = useFirestore(state.user?.uid);

	return (
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				<img src={anime.image_url} alt="" />
			</div>
			<Link href={`/anime/${anime.mal_id}`}>
				<p>{anime.title}</p>
			</Link>

			{cardType === 'watchlistCard' && (
				<div>
					<button className={styles.button} onClick={() => deleteItem(anime.mal_id, 'watchlist')}>
						Delete From Watchlist
					</button>
					<button className={styles.button} onClick={() => moveItem(anime.mal_id, 'watchlist', 'watched')}>
						Move To Watched
					</button>
				</div>
			)}
			{cardType === 'watchedCard' && (
				<div>
					<button className={styles.button} onClick={() => moveItem(anime.mal_id, 'watched', 'watchlist')}>
						Move To Watchlist
					</button>
					<button className={styles.button} onClick={() => deleteItem(anime.mal_id, 'watched')}>
						Delete From Watched
					</button>
				</div>
			)}

			{/* <button onClick={() => router.push(`/anime/${anime.mal_id}`)}>Details</button> */}
		</div>
	);
};

export default ListCard;
