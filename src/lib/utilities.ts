export const getRoommates = async (fetch, house_id) => {
	let response = await fetch(`/api/house/roommates?house_id=${house_id}`);
	if (response.ok) return await response.json();
};

export const getFridge = async (fetch, house_id) => {
	const response = await fetch(`/api/fridge?house_id=${house_id}`);
	if (response.ok) return await response.json();
};

export const getPantry = async (fetch, house_id) => {
	const response = await fetch(`/api/pantry?house_id=${house_id}`);
	if (response.ok) return await response.json();
};
