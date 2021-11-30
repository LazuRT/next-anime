import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../context/context';
import styles from '../styles/Header.module.scss';

const Header = () => {
	const router = useRouter();
	const { state, signout } = useGlobalContext();

	const [query, setQuery] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (query) {
			// const resp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&page=1`);
			// const respData = await resp.json();

			router.push(`/search/${query}`);
			setQuery('');
		}
	};

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div>
					<Link href="/">
						<h2>NextAnime</h2>
					</Link>
				</div>
				<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
					<input
						type="text"
						className={styles.search}
						placeholder="Search..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</form>

				<div className={styles.right}>
					{state.user ? (
						<div className={styles.dropdown}>
							<button className={styles.authButton}>Menu</button>
							<div className={styles.dropdownContent}>
								<Link href="/listpage">My List</Link>
								<Link href="/">
									<a onClick={() => signout()}>Sign Out</a>
								</Link>
							</div>
						</div>
					) : (
						<Link href="/signin">
							<button className={styles.authButton}>Sign in</button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
