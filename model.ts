export type cardType = 'watchlistCard' | 'watchedCard' | 'showCard';

export interface ISearchAnime {
	mal_id: number;
	rank: number;
	title: string;
	url: string;
	image_url: string;
	type: string;
	episodes: boolean;
	start_date: boolean;
	end_date: boolean;
	members: number;
	score: number;
}

export interface ISingleAnime extends ISearchAnime {
	trailer_url: string;
	title_english: string;
	title_japanese: string;
	status: string;
	duration: string;
	synopsis: string;
	source: string;
	aired: {
		from: string;
		to: string;
		prop: {
			form: {
				day: number;
				month: number;
				year: number;
			};
			to: {
				day: number;
				month: number;
				year: number;
			};
		};
		string: string;
	};
	genres: {
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}[];
	studios: {
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}[];
}

export type listType = 'watchlist' | 'watched';
