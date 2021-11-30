import type { NextPage } from 'next';
import Head from 'next/head';
import { ISearchAnime } from '../model';
import styles from '../styles/Home.module.scss';
import { GetServerSideProps } from 'next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import ResultCard from '../components/ResultCard';
import AnimeGrid from '../components/AnimeGrid';
import { useGlobalContext } from '../context/context';

import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import useFirestore from '../hooks/useFirestore';

SwiperCore.use([Navigation]);

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch('https://api.jikan.moe/v3/top/anime/1/upcoming');
	const data = await res.json();
	// const TopUpcomingAnime = await data.top.slice(0, 20);
	const TopUpcomingAnime = await data.top;

	const res2 = await fetch('https://api.jikan.moe/v3/top/anime/1/airing');
	const data2 = await res2.json();
	const TopAiringAnime = await data2.top;

	const res3 = await fetch('https://api.jikan.moe/v3/top/anime/1/favorite');
	const data3 = await res3.json();
	const TopFavorite = await data3.top;

	return {
		props: {
			TopUpcomingAnime,
			TopAiringAnime,
			TopFavorite,
		}, // will be passed to the page component as props
	};
};

interface Props {
	TopUpcomingAnime: ISearchAnime[];
	TopAiringAnime: ISearchAnime[];
	TopFavorite: ISearchAnime[];
}

const swiperBreakpoints = {
	// when window width is >= 640px
	640: {
		width: 640,
		slidesPerView: 2,
		spaceBetween: 10,
	},
	// when window width is >= 768px
	768: {
		width: 768,
		slidesPerView: 3,
		spaceBetween: 10,
	},
	1280: {
		width: 1280,
		slidesPerView: 6,
		spaceBetween: 10,
	},
};

const Home: NextPage<Props> = ({ TopUpcomingAnime, TopAiringAnime, TopFavorite }: Props) => {
	// const Home = <T extends Anime>({ topAnime }: Props<T> & { children?: ReactNode }) => {
	const { state } = useGlobalContext();

	const { addItem } = useFirestore(state.user?.uid);
	return (
		<div>
			<Head>
				<title>NextAnime</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<section className={styles.topSection}>
					<h3 className={styles.sectionTitle}>Top Airing Anime</h3>

					<Swiper
						navigation={true}
						className="mySwiper"
						slidesPerView={2}
						spaceBetween={20}
						breakpoints={swiperBreakpoints}
						// loop={true}
						//! if loop true, img src server & render mismatch
						//! need to use csr to use loop
					>
						{TopAiringAnime.slice(0, 20).map((anime) => {
							return (
								<SwiperSlide key={anime.mal_id}>
									<ResultCard anime={anime} />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</section>
				<section className={styles.topSection}>
					<h3 className={styles.sectionTitle}>Top Favorite Anime</h3>

					<Swiper
						navigation={true}
						className="mySwiper"
						slidesPerView={2}
						spaceBetween={20}
						breakpoints={swiperBreakpoints}
						// loop={true}
					>
						{TopFavorite.slice(0, 20).map((anime) => {
							return (
								<SwiperSlide key={anime.mal_id}>
									<ResultCard anime={anime} />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</section>
				<section className={styles.topSection}>
					<h3 className={styles.sectionTitle}>Top Upcoming Anime</h3>
					<Swiper
						navigation={true}
						className="mySwiper"
						slidesPerView={2}
						spaceBetween={20}
						breakpoints={swiperBreakpoints}
						// loop={true}
					>
						{TopUpcomingAnime.slice(0, 20).map((anime) => {
							return (
								<SwiperSlide key={anime.mal_id}>
									<ResultCard anime={anime} />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</section>
			</main>
		</div>
	);
};

export default Home;
