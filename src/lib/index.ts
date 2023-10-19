// place files you want to import through the `$lib` alias in this folder.

import { nanoid } from "nanoid";

export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export function cleaningMonth(week) {
	const curr = new Date();
	let firstDayOfMonth = new Date(
		curr.getFullYear(),
		curr.getMonth(),
		1
	).getDate();
	const cleaningDays = Object.entries(week).filter((entry) => entry[1]); // just the cleaning days
	const month = [];

	for (let i = 0; i < 4; i++) {
		let weekdays = [...cleaningDays].map((entry) => {
			const nth = curr.setDate(firstDayOfMonth + parseInt(entry[0]) + 1);
			const nthDay = new Date(nth);
			nthDay.setHours(0, 0, 0);
			return nthDay.toISOString();
		});
		firstDayOfMonth = firstDayOfMonth + 7;
		month.push(...weekdays);
	}
	return month;
}

type User = {
	id: string;
	firstname: string;
	lastname: string;
};

function userAlreadyWorkThatDay(
	userAssignments: {
		[key: string]: { zone: string; cleaningDay: string }[];
	},
	selectedUser,
	cleaningDay
) {
	return (
		Object.entries(userAssignments)
			.filter((entry) => entry[0] === selectedUser.id)[0][1]
			.filter((job) => job.cleaningDay === cleaningDay).length === 0
	);
}

function isAssignmentBalanced(userAssignments: {
	[key: string]: { zone: string; cleaningDay: string }[];
}) {
	if (Object.entries(userAssignments).length === 0) return false;
	const err = Math.abs(
		1 -
			Object.entries(userAssignments)
				.map((entry) => entry[1].length)
				.reduce((acc, val) => acc / val)
	);
	return err === 0;
}

export function cleaningCalendar(users: User[], zones, cleaningMonth) {
	const shuffledZones = shuffleArray(zones);
	const shuffledCleaningMonth = shuffleArray(cleaningMonth);

	let userAssignments: {
		[key: string]: { id: string; zone: string; cleaningDay: string }[];
	} = {};

	let dayIndex = 0;
	let weekCount = 0;

	while (!isAssignmentBalanced(userAssignments)) {
		userAssignments = {};
		dayIndex = 0;
		weekCount = 0;
		while (weekCount < 4) {
			for (let zone of shuffledZones) {
				let cleaningDay = shuffledCleaningMonth[dayIndex];
				let userIndex = Math.floor(Math.random() * users.length);
				let selectedUser = users[userIndex];

				if (!userAssignments[selectedUser.id])
					userAssignments[selectedUser.id] = [];

				if (
					userAlreadyWorkThatDay(
						userAssignments,
						selectedUser,
						cleaningDay
					)
				) {
					userAssignments[selectedUser.id].push({
						id: nanoid(8),
						zone: zone.trim(),
						cleaningDay,
					});
				}
				dayIndex = (dayIndex + 1) % shuffledCleaningMonth.length;
			}
			weekCount++;
		}
	}

	return userAssignments;
}

export function createEvents(calendar: { roommate: any; events: any }[]) {
	const res = [];

	for (const { roommate, events } of calendar) {
		let jsonEvents: { zone; cleaningDay } = JSON.parse(events);
		for (const { id, zone, cleaningDay } of Object.values(jsonEvents)) {
			const title =
				roommate.firstname + " " + roommate.lastname + " " + zone;
			const allDay = true;

			const event = {
				id,
				title,
				start: cleaningDay,
				end: cleaningDay,
				allDay,
			};
			res.push(event);
		}
	}

	return res;
}
