function getCost(elem, goal) {
	return Math.sqrt(Math.pow(elem.x - goal.x, 2) + Math.pow(elem.y - goal.y, 2));
}

export const takeStep = (start, goal, stages, queue, walls, maxX, minX, maxY, minY) => {
	const newStages = [...stages];
	let success = false;
	const newQueue = [...queue];
	
	if (newQueue.length === 0 && stages.length === 0) {
		// if completely at beginning, start from the start
		newQueue.push({
			...start,
			cost: getCost(start, goal),
			trail: [],
		});
	}
	
	const allExistingElemKeys = [...stages, ...queue, ...walls].map(({ x, y }) => {
		return `${x}_${y}`;
	});

	let smallestIndex = null;
	let smallest = null;
	for (const index in newQueue) {
		const elem = newQueue[index];
		if (!smallest || elem.cost < smallest.cost) {
			smallest = elem;
			smallestIndex = index;
		}
	}
	
	if (!smallest) {
		// if we found nothing, then give up, there's no more to look through
		return {
			finished: true,
			sucess: false,
			stages: newStages,
			queue: newQueue,
		};
	}
	
	newQueue.splice(smallestIndex, 1);
	newStages.push(smallest);
	const newTrail = [...smallest.trail, {x: smallest.x, y: smallest.y}];
	
	if (smallest.x === goal.x && smallest.y === goal.y) {
		return {
			finished: true,
			success: true,
			stages: newStages,
			queue: newQueue,
			path: newTrail,
		};
	}
	
	// how's this bullshit for some functional programming?
	[
		{ x: smallest.x - 1, y: smallest.y, trail: newTrail },
		{ x: smallest.x, y: smallest.y -1, trail: newTrail },
		{ x: smallest.x + 1, y: smallest.y, trail: newTrail },
		{ x: smallest.x, y: smallest.y + 1, trail: newTrail },
	].filter(({ x, y }) => {
		const key = `${x}_${y}`;
		if (x < minX || x >= maxX || y < minY || y >= maxY) {
			return false;
		}
		return !allExistingElemKeys.includes(key);
	}).map((elem) => {
		return {
			...elem,
			cost: getCost(elem, goal),
		};
	}).forEach((elem) => {
		newQueue.push(elem);
	});
	
	return {
		finished: false,
		success,
		stages: newStages,
		queue: newQueue,
	};
}

export function runAstar(start, goal, walls, maxX, minX, maxY, minY) {
	let keepGoing = true;
	let stages = [];
	let queue = [];
	while (keepGoing) {
		const {
			finished,
			success,
			stages: newStages,
			queue: newQueue,
			path,
		} = takeStep(start, goal, stages, queue, walls, maxX, minX, maxY, minY);
		keepGoing = !finished;
		
		stages = newStages;
		queue = newQueue;
		
		if (finished) {
			return {
				success,
				path,
				stages,
				queue,
			};
		}
	}
}

export function astar(start, goal, walls, maxX, minX, maxY, minY) {
	const { success, path } = runAstar(start, goal, walls, maxX, minX, maxY, minY);
	
	if (success) {
		return path;
	}
	
	return null;
}