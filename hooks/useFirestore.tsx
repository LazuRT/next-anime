import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
	doc,
	getDoc,
	setDoc,
	onSnapshot,
	orderBy,
	collection,
	query,
	serverTimestamp,
	deleteDoc,
} from 'firebase/firestore';
import { ISingleAnime, listType } from '../model';
import { useGlobalContext } from '../context/context';

const useFirestore = (uid: any) => {
	const { dispatch } = useGlobalContext();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// const collectionRef = collection(db, `users2/${uid}/watchlist/`);
		setLoading(true);
		const q = query(collection(db, `users/${uid}/watchlist/`), orderBy('timeCreated', 'desc'));
		const unsub = onSnapshot(q, (snap) => {
			let documents: ISingleAnime[] = [];
			snap.forEach((doc: any) => {
				documents.push({ ...doc.data() });
			});
			dispatch({ type: 'LSWL_STATE', payload: documents });
			setLoading(false);
		});

		return () => unsub();
	}, [uid]);

	useEffect(() => {
		// const collectionRef = collection(db, `users2/${uid}/watchlist/`);
		setLoading(true);
		const q = query(collection(db, `users/${uid}/watched/`), orderBy('timeCreated', 'desc'));
		const unsub = onSnapshot(q, (snap) => {
			let documents: ISingleAnime[] = [];
			snap.forEach((doc: any) => {
				documents.push({ ...doc.data() });
			});
			dispatch({ type: 'LSWD_STATE', payload: documents });
			setLoading(false);
		});

		return () => unsub();
	}, [uid]);

	const addItem = async (data: ISingleAnime, listType: listType) => {
		try {
			await setDoc(doc(db, `users/${uid}/${listType}/${data.mal_id}`), {
				...data,
				timeCreated: serverTimestamp(),
			});
		} catch (error) {
			console.log(error);
		}
	};

	const deleteItem = async (id: number, listType: listType) => {
		try {
			await deleteDoc(doc(db, 'users', `${uid}`, `${listType}`, `${id}`));
		} catch (error) {
			console.log(error);
		}
	};

	const moveItem = async (id: number, sourceCollection: listType, destionationCollection: listType) => {
		// * Get original doc
		const docSnap = await getDoc(doc(db, `users/${uid}/${sourceCollection}/${id}`));
		// * if doc exist
		if (docSnap.exists()) {
			// * copy original doc to obj
			const newObj = { ...docSnap.data() };
			// * create new doc with new object
			await setDoc(doc(db, 'users', `${uid}`, `${destionationCollection}`, `${id}`), newObj);
			// * delete original doc
			await deleteDoc(doc(db, 'users', `${uid}`, `${sourceCollection}`, `${id}`));
		} else {
			console.log('No such document');
		}
	};

	return { loading, addItem, deleteItem, moveItem };
};

export default useFirestore;
