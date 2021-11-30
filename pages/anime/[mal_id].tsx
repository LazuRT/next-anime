import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/context';
import style from '../../styles/SingleAnime.module.scss';
import { GetServerSideProps } from 'next';
import { ISearchAnime, ISingleAnime } from '../../model';
import AnimeGrid from '../../components/AnimeGrid';
import ResultCard from '../../components/ResultCard';
import { useGlobalContext } from '../../context/context';

import useFirestore from '../../hooks/useFirestore';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { mal_id } = query;
	const res = await fetch(`https://api.jikan.moe/v3/anime/${mal_id}`);
	const data = await res.json();

	return {
		props: {
			data,
		}, // will be passed to the page component as props
	};
};

interface Props {
	data: ISingleAnime;
}

// const Home: NextPage<Props> = ({ topAnime }: Props) => {
const SingleAnimePage = ({ data }: Props) => {
	// const { addAnimeToWatchlist, addAnimeToWatched, state } = useContext(AppContext);
	const { state } = useGlobalContext();
	const [recommsList, setRecommsList] = useState<any>([]);
	let animeWatchlist = state.watchlist.find((el) => el.mal_id === data.mal_id);
	let animeWatched = state.watched.find((el) => el.mal_id === data.mal_id);
	const watchlistDisabled = animeWatchlist ? true : animeWatched ? true : false;
	const watchedDisabled = animeWatched ? true : false;
	// console.log(data);
	const { addItem } = useFirestore(state.user?.uid);

	useEffect(() => {
		const getRecommendation = async () => {
			try {
				const res = await fetch(`https://api.jikan.moe/v3/anime/${data.mal_id}/recommendations`);
				const recomms = await res.json();

				if (recomms) {
					setRecommsList(recomms.recommendations.slice(0, 20));
				} else {
					console.log('gagal');
				}
			} catch (error) {
				console.log(error);
			}
		};

		getRecommendation();
	}, [data]);

	return (
		<div className="container">
			<Head>
				<title>{data.title} - NextAnime</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={style.main}>
				<div className={style.animeInfo}>
					<div className={style.imageContainer}>
						<img src={data.image_url} alt="" />
					</div>
					<div className={style.details}>
						<p>⭐️ {data.score}</p>
						<h2>{data.title}</h2>
						<p>Type: {data.type}</p>
						<p>Status : {data.status}</p>
						<p>Aired : {data.aired.string}</p>
						<p>Episodes : {data.episodes}</p>
						<p>Duration : {data.duration}</p>
						<p>Genre : {data && data.genres.map((genre) => genre.name + ' ')}</p>
						<p>Studio : {data && data.studios.map((studio) => studio.name)}</p>
					</div>
					{/* Masukin ke local state */}
					{/* <div className={style.buttonContainer}>
						<button className={style.button} onClick={() => addAnimeToWatchlist(data)} disabled={watchlistDisabled}>
							Add to Watchlist
						</button>
						{data.status === 'Not yet aired' ? (
							''
						) : (
							<button className={style.button} disabled={watchedDisabled} onClick={() => addAnimeToWatched(data)}>
								Add to Watched
							</button>
						)}
					</div> */}
					{state.user && (
						<div className={style.buttonContainer}>
							<button className={style.button} onClick={() => addItem(data, 'watchlist')} disabled={watchlistDisabled}>
								Add to Watchlist
							</button>
							{data.status === 'Not yet aired' ? (
								''
							) : (
								<button className={style.button} disabled={watchedDisabled} onClick={() => addItem(data, 'watched')}>
									Add to Watched
								</button>
							)}
						</div>
					)}
				</div>

				<div className={style.synopsisContainer}>
					<h2>Synopsis</h2>
					<p>{data.synopsis}</p>
				</div>
				{data.trailer_url && (
					<div className={style.trailer}>
						<iframe title={data.title} className={style.trailer} src={data.trailer_url + '&autoplay=0'}></iframe>
					</div>
				)}

				<div className={style.recommContainer}>
					<h2>Recommendations</h2>
					{/* <h2 className="sectionTitle">Recommendations</h2> */}
					{recommsList.length > 0 ? (
						<div className={style.grid}>
							{recommsList.map((anime) => {
								return <ResultCard key={anime.mal_id} anime={anime} />;
							})}
						</div>
					) : (
						<h3 className="muted">No Recommendation</h3>
					)}
				</div>
			</main>
		</div>
	);
};

export default SingleAnimePage;
