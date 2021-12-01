import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.text}>
				©2021 <span>NextAnime</span> Created by <span>LazuRT</span>
			</div>
		</footer>
	);
};

export default Footer;
