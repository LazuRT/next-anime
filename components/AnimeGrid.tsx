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
	if (cardType === 'watchlistCard' || cardType === 'watchedCard') {
		return (
			<div className={styles.grid}>
				{data &&
					data.map((anime) => {
						return <ListCard key={anime.mal_id} anime={anime} cardType={cardType} />;
					})}
			</div>
		);
	} else {
		return (
			<div>
				<div className={styles.grid}>
					{data &&
						data.map((anime) => {
							return <ResultCard key={anime.mal_id} anime={anime} cardType={cardType} />;
						})}
				</div>
			</div>
		);
	}
};

export default AnimeGrid;
