import React, { useContext, useEffect, useReducer, createContext } from 'react';
import { ISingleAnime } from '../model';
import { AppReducer } from './reducer';
import { auth } from '../services/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	User as FirebaseUser,
} from 'firebase/auth';
// import { useRouter } from 'next/router';
import { Action } from './reducer';

// type AppState = typeof initialState;

interface ContextInterface {
	state: AppState;
	dispatch: React.Dispatch<Action>;
	addAnimeToWatchlist: (anime: ISingleAnime) => void;
	deleteFromWatchlist: (anime: ISingleAnime) => void;
	addAnimeToWatched: (anime: ISingleAnime) => void;
	moveToWatchlist: (anime: ISingleAnime) => void;
	deleteFromWatched: (anime: ISingleAnime) => void;
	signup: (email: string, password: string) => void;
	login: (email: string, password: string) => void;
	signout: () => void;
	// lstostate: (anime: ISingleAnime[]) => void;
}
interface AppState {
	watchlist: ISingleAnime[];
	watched: ISingleAnime[];
	user: FirebaseUser | null;
	loading: boolean;
}

interface Props {
	children: React.ReactNode;
}
const initialState: AppState = {
	watchlist: [],
	watched: [],
	user: null,
	loading: true,
};

const defaultState = {
	state: initialState,
	dispatch: () => {},

	addAnimeToWatchlist: () => {},
	deleteFromWatchlist: () => {},
	addAnimeToWatched: () => {},
	moveToWatchlist: () => {},
	deleteFromWatched: () => {},
	signup: () => {},
	login: () => {},
	signout: () => {},
	// lstostate: () => {},
};

const AppContext = createContext<ContextInterface>(defaultState);

const AppProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	// const router = useRouter();

	// useEffect(() => {
	// 	const getUsers = () => {
	// 		let tsAnimeWatchlist = localStorage.getItem('ts_animeWatchlist');
	// 		let tsAnimeWatched = localStorage.getItem('ts_animeWatched');

	// 		if (tsAnimeWatchlist) {
	// 			let asd = JSON.parse(tsAnimeWatchlist);
	// 			dispatch({ type: 'LSWL_STATE', payload: asd });
	// 		}
	// 		if (tsAnimeWatched) {
	// 			let asd = JSON.parse(tsAnimeWatched);
	// 			dispatch({ type: 'LSWD_STATE', payload: asd });
	// 		}
	// 	};

	// 	getUsers();
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem('ts_animeWatchlist', JSON.stringify(state.watchlist));
	// 	localStorage.setItem('ts_animeWatched', JSON.stringify(state.watched));
	// }, [state]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			dispatch({ type: 'SET_ACTIVE_USER', payload: user });
			console.log(user);
			dispatch({ type: 'SET_LOADING_FALSE' });
		});
		return () => {
			unsubscribe();
		};
	}, []);

	// Create new user with email and password
	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
		// .then((userCredential) => {
		// 	// Signed in
		// 	const user = userCredential.user;
		// 	console.log(user);
		// })
		// .catch((error) => {
		// 	const errorCode = error.code;
		// 	const errorMessage = error.message;
		// 	console.log(`Error Code : ${errorCode}, error Message: ${errorMessage}`);
		// });
	};

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
		// .then((userCredential) => {
		// 	// Signed in
		// 	const user = userCredential.user;
		// 	console.log(user);
		// 	router.push('/');
		// })
		// .catch((error) => {
		// 	const errorCode = error.code;
		// 	const errorMessage = error.message;
		// 	console.log(`Error Code : ${errorCode}, error Message: ${errorMessage}`);
		// });
	};

	const signout = () => {
		return signOut(auth);
		// console.log('asd');
	};

	// Watchlist
	const addAnimeToWatchlist = (anime: ISingleAnime) => {
		dispatch({ type: 'ADD_TO_WATCHLIST', payload: anime });
	};

	const deleteFromWatchlist = (anime: ISingleAnime) => {
		dispatch({ type: 'DELETE_FROM_WATCHLIST', payload: anime });
	};

	// Watched
	const addAnimeToWatched = (anime: ISingleAnime) => {
		dispatch({ type: 'ADD_TO_WATCHED', payload: anime });
	};
	const moveToWatchlist = (anime: ISingleAnime) => {
		dispatch({ type: 'MOVE_TO_WATCHLIST', payload: anime });
	};
	const deleteFromWatched = (anime: ISingleAnime) => {
		dispatch({ type: 'DELETE_FROM_WATCHED', payload: anime });
	};
	// const lstostate = (arr: ISingleAnime[]) => {
	// 	dispatch({ type: 'LSWL_STATE', payload: arr });
	// };

	// return <AppContext.Provider value={{ state, dispatch, addAnimeToWatchlist }}>{children}</AppContext.Provider>;
	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
				addAnimeToWatchlist,
				deleteFromWatchlist,
				addAnimeToWatched,
				moveToWatchlist,
				deleteFromWatched,
				signup,
				login,
				signout,
			}}
		>
			{!state.loading && children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };
export type { AppState };
