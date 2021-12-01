import React from 'react';
import Header from './Header';
import { useRouter } from 'next/router';
import Footer from './Footer';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	const router = useRouter();

	if (router.pathname === '/signup' || router.pathname === '/signin') {
		return <div>{children}</div>;
	} else {
		return (
			<div>
				<Header />
				{children}
				<Footer />
			</div>
		);
	}

	// return (
	// 	<div>
	// 		<Header />
	// 		{children}
	// 	</div>
	// );
};

export default Layout;
