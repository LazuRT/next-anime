import type { NextPage } from 'next';
import { cardType, ISearchAnime, ISingleAnime } from '../model';
import styles from '../styles/AnimeGrid.module.css';
import ListCard from './ListCard';
import ResultCard from './ResultCard';

interface Props {
	data: ISearchAnime[] | ISingleAnime[];
	cardType?: cardType;
}

const AnimeGrid = ({ data, cardType }: Props) => {
	return (
		<>
			{cardType === 'watchlistCard' || cardType === 'watchedCard' ? (
				<div className={styles.grid}>
					{data &&
						data.map((anime) => {
							return <ListCard key={anime.mal_id} anime={anime} cardType={cardType} />;
						})}
				</div>
			) : (
				<div>
					<div className={styles.grid}>
						{data &&
							data.map((anime) => {
								return <ResultCard key={anime.mal_id} anime={anime} cardType={cardType} />;
							})}
					</div>
				</div>
			)}
		</>
		// 	<div>
		// 		<div className={styles.grid}>
		// 			{data &&
		// 				data.map((anime) => {
		// 					return <ResultCard key={anime.mal_id} anime={anime} />;
		// 				})}
		// 		</div>
		// 	</div>
	);
};

export default AnimeGrid;
