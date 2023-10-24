export type Food = {
	id: string | null;
	food_name: string;
	owner_id: string;
	purchased_on: string;
	expiration: string;
	kind: string;
	price: number;
	is_expired: boolean;
};
