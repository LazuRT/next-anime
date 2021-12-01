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
import { Action } from './reducer';

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
};

const AppContext = createContext<ContextInterface>(defaultState);

const AppProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			dispatch({ type: 'SET_ACTIVE_USER', payload: user });
			dispatch({ type: 'SET_LOADING_FALSE' });
		});
		return () => {
			unsubscribe();
		};
	}, []);

	// Create new user with email and password
	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signout = () => {
		return signOut(auth);
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
