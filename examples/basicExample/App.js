import React, { useState } from 'react';
import { Canvas, Rect } from '@bucky24/react-canvas';
import { Map } from '@bucky24/react-canvas-map';
import { takeStep, runAstar } from '@bucky24/astar';

import presets from '../presets';

import styles from './styles.css';

const CELL_COUNT = 500/25;

const INITIAL_WALLS = [];
const START = { x: 3, y: Math.floor(CELL_COUNT/2) };
const END = { x: CELL_COUNT - 3, y: Math.floor(CELL_COUNT/2) };

export default function App() {
	const [setting, setSetting] = useState("start");
	const [start, setStart] = useState(START);
	const [end, setEnd] = useState(END);
	const [walls, setWalls] = useState(INITIAL_WALLS);
	const [stages, setStages] = useState([]);
	const [queue, setQueue] = useState([]);
	const [error, setError] = useState(null);
	const [path, setPath] = useState([]);
	const [preset, setPreset] = useState("empty");
	
	const cells = [];
	
	const reset = () => {
		setStages([]);
		setQueue([]);
		setError(null);
		setPath([]);
	}
	
	const loadPreset = ({ start, end, walls }) => {
		setStart(start);
		setEnd(end);
		setWalls(walls);
	}
	
	for (const wall of walls) {
		cells.push({
			cellX: wall.x,
			cellY: wall.y,
			cellWidth: 1,
			cellHeight: 1,
			id: "#000000",
		});
	}
	
	for (const stage of stages) {
		cells.push({
			cellX: stage.x,
			cellY: stage.y,
			cellWidth: 1,
			cellHeight: 1,
			id: "#0000ff",
		});
	}
	
	for (const queue of queue) {
		cells.push({
			cellX: queue.x,
			cellY: queue.y,
			cellWidth: 1,
			cellHeight: 1,
			id: "#00ffff",
		});
	}
	
	for (const elem of path) {
		cells.push({
			cellX: elem.x,
			cellY: elem.y,
			cellWidth: 1,
			cellHeight: 1,
			id: "#ffff00",
		});
	}
	
	if (start) {
		cells.push({
			cellX: start.x,
			cellY: start.y,
			cellWidth: 1,
			cellHeight: 1,
			id: "#00ff00",
		});
	}
	
	if (end) {
		cells.push({
			cellX: end.x,
			cellY: end.y,
			cellWidth: 1,
			cellHeight: 1,
			id: "#ff0000",
		});
	}

	return (<div className={styles.appRoot}>
		<div>
			<Canvas width={500} height={500}>
				<Map 
					width={500}
					height={500}
					x={0}
					y={0}
					onClick={(x, y) => {
						if (setting === "start") {
							setStart({ x, y });
						} else if (setting === "end") {
							setEnd({ x, y });
						} else if (setting === "wall") {
							const existingWall = walls.findIndex((elem) => {
								return elem.x === x && elem.y === y;
							});
							
							if (existingWall >= 0) {
								const newWalls = [...walls];
								newWalls.splice(existingWall, 1);
								setWalls(newWalls);
							} else {
								setWalls([
									...walls,
									{ x, y },
								]);
							}
						}
					}}
					layers={[
						{
							raw: {
								cells,
								drawFunc: ({ x, y, width, height, id }) => {
									return <Rect
										x={x}
										y={y}
										x2={x+width}
										y2={y+height}
										color={id}
										fill={true}
									/>;
								},
							},
						},
					]}
				/>
			</Canvas>
		</div>
		{error && (
			<div>
				{error}
			</div>
		)}
		<div>
			Setting: 
			<select
				onChange={(value) => {
					setSetting(value.target.value);
				}}
			>
				<option value="start">Start</option>
				<option value="end">End</option>
				<option value="wall">Wall</option>
			</select>
		</div>
		<div>
			Load Preset:
			<select
				onChange={(event) => {
					const value = event.target.value;
					setPreset(value);
				}}
			>
				{Object.keys(presets).map((key) => {
					return <option key={key} value={key}>{key}</option>;
				})}
			</select>
			<button
				onClick={() => {
					loadPreset(presets[preset]);
				}}
			>
				Load
			</button>
		</div>
		<div>
			<button
				onClick={() => {
					const { success, finished, stages: newStages, queue: newQueue, path } = takeStep(
						start, end, stages, queue, walls, CELL_COUNT, 0, CELL_COUNT, 0,
					);
					setStages(newStages);
					setQueue(newQueue);
					
					if (finished && !success) {
						setError('Could not find a path!');
					} else if (finished && success) {
						setPath(path);
					}
				}}
			>
				Step
			</button>
			<button
				onClick={() => {
					const { success, path, stages: newStages, queue: newQueue } = runAstar(
						start, end, walls, CELL_COUNT, 0, CELL_COUNT, 0,
					);
					setStages(newStages);
					setQueue(newQueue);
					
					if (!success) {
						setError('Could not find a path!');
					} else {
						setPath(path);
					}
				}}
			>
				Run
			</button>
			<button
				onClick={reset}
			>
				Reset
			</button>
		</div>
	</div>);
}