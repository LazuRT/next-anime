import { ISingleAnime } from '../model';
import { AppState } from './context';
import { User as FirebaseUser } from 'firebase/auth';
// interface AppState {
// 	watchlist: ISingleAnime[];
// 	watched: ISingleAnime[];
// }
export type Action =
	| { type: 'ADD_TO_WATCHLIST'; payload: ISingleAnime }
	| { type: 'DELETE_FROM_WATCHLIST'; payload: ISingleAnime }
	| { type: 'ADD_TO_WATCHED'; payload: ISingleAnime }
	| { type: 'MOVE_TO_WATCHLIST'; payload: ISingleAnime }
	| { type: 'DELETE_FROM_WATCHED'; payload: ISingleAnime }
	| { type: 'LSWL_STATE'; payload: ISingleAnime[] }
	| { type: 'LSWD_STATE'; payload: ISingleAnime[] }
	| { type: 'SET_ACTIVE_USER'; payload: FirebaseUser | null }
	| { type: 'SET_LOADING_FALSE' };

export const AppReducer = (state: AppState, action: Action) => {
	switch (action.type) {
		case 'ADD_TO_WATCHLIST':
			// let baru = { ...action.payload, episode_watched: 1 };
			return {
				...state,
				watchlist: [action.payload, ...state.watchlist],
			};

		case 'DELETE_FROM_WATCHLIST':
			return {
				...state,
				watchlist: state.watchlist.filter((anime: ISingleAnime) => anime.mal_id !== action.payload.mal_id),
			};
		case 'ADD_TO_WATCHED':
			return {
				...state,
				watchlist: state.watchlist.filter((anime: ISingleAnime) => anime.mal_id !== action.payload.mal_id),
				watched: [action.payload, ...state.watched],
			};
		case 'MOVE_TO_WATCHLIST':
			return {
				...state,
				watched: state.watched.filter((anime: ISingleAnime) => anime.mal_id !== action.payload.mal_id),
				watchlist: [action.payload, ...state.watchlist],
			};
		case 'DELETE_FROM_WATCHED':
			return {
				...state,
				watched: state.watched.filter((anime) => anime.mal_id !== action.payload.mal_id),
			};
		case 'LSWL_STATE':
			return {
				...state,
				watchlist: action.payload,
			};
		case 'LSWD_STATE':
			return {
				...state,
				watched: action.payload,
			};

		case 'SET_ACTIVE_USER':
			return {
				...state,
				user: action.payload,
			};

		case 'SET_LOADING_FALSE':
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};
