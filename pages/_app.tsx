import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { AppProvider } from '../context/context';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	// if (router.pathname === '/signup' || router.pathname === '/signin') {
	// 	console.log(router.pathname);
	// 	return (
	// 		<AppProvider>
	// 			<Component {...pageProps} />
	// 		</AppProvider>
	// 	);
	// } else {
	// 	console.log(router.pathname);
	// 	return (
	// 		<AppProvider>
	// 			<Layout>
	// 				<Component {...pageProps} />
	// 			</Layout>
	// 		</AppProvider>
	// 	);
	// }

	return (
		<AppProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppProvider>
	);
}
export default MyApp;
