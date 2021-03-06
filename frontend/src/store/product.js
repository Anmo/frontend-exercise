import { atom, selectorFamily, selector } from 'recoil';

import getProducts from '../services/get-products';

export const productsAtom = atom({
	key: 'products',
	default: [],
	effects_UNSTABLE: [
		async ({ setSelf }) => {
			const { products } = await getProducts();

			if (process.env.NODE_ENV === 'development') {
				products.push({
					id: 'fake',
					name: 'Fake Benefict',
					price: 40
				});
			}

			setSelf(products);
		}
	]
});

export const productsList = selector({
	key: 'productsList',
	get({ get }) {
		return get(productsAtom).map(({ id }) => id);
	}
});

export const productInfo = selectorFamily({
	key: 'productInfo',
	get: (productId) => ({ get }) =>
		get(productsAtom).find(({ id }) => id === productId)
});
