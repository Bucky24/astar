## astar

This is a quick implementation of the astar pathfinding library, written in JS.

## Methods

### takeStep

The `takeStep` method takes in the data for an in-progress astar run and takes the next step in that run. You probably will not need to use this unless you're trying to visualize the process as it happens.

#### Inputs

```
takeStep(start, goal, stages, queue, walls, maxX, minX, maxY, minY)
```

| Name | Type | Description |
|-----|-----|-----|
| start | Node | The start of the path |
| goal | Node | The goal of the search |
| stages | StageNode[] | List of areas that have been examined |
| queue | QueueNode[] | List of areas that have yet to be scanned |
| maxX | Integer | The largest x coord to generate pathing for |
| minX | Integer | The smallest x coord to generate pathing for |
| maxY | Integer | The largest y coord to generate pathing for |
| minY | Integer | The smallest y coord to generate pathing for |

#### Outputs

The function will output an object with these entries:

| Name | Type | Description |
|-----|-----|-----|
| finished | Boolean | Indicates if the algorithm is complete |
| success | Boolean | Indicates if the algorthm found a path or not |
| stages | StageNode[] | New list of areas that have been examined |
| queue | QueueNode[] | New list of areas that have yet to be scanned |
| path | Node[] | List of nodes making up the path that was found between start and goal, if success is true |

### runAstar

This method takes in data about the world, then runs a full astar algorithm on it, returning the path found, as well as data about the algorithm that was run.

#### Inputs

```
runAstar(start, goal, walls, maxX, minX, maxY, minY)
```

| Name | Type | Description |
|-----|-----|-----|
| start | Node | The start of the path |
| goal | Node | The goal of the search |
| maxX | Integer | The largest x coord to generate pathing for |
| minX | Integer | The smallest x coord to generate pathing for |
| maxY | Integer | The largest y coord to generate pathing for |
| minY | Integer | The smallest y coord to generate pathing for |

#### Outputs

The function will output an object with these entries:

| Name | Type | Description |
|-----|-----|-----|
| success | Boolean | Indicates if the algorthm found a path or not |
| stages | StageNode[] | New list of areas that have been examined |
| queue | QueueNode[] | New list of areas that have yet to be scanned |
| path | Node[] | List of nodes making up the path that was found between start and goal, if success is true |


### astar

This method takes in the same data as `runAstar`, but returns only the path data. Unless you are doing testing, this is likely the method that you would want to use.

#### Inputs

```
astar(start, goal, walls, maxX, minX, maxY, minY)
```

| Name | Type | Description |
|-----|-----|-----|
| start | Node | The start of the path |
| goal | Node | The goal of the search |
| maxX | Integer | The largest x coord to generate pathing for |
| minX | Integer | The smallest x coord to generate pathing for |
| maxY | Integer | The largest y coord to generate pathing for |
| minY | Integer | The smallest y coord to generate pathing for |

#### Outputs

The function will output either a list of Nodes in the case of a successful path, or null if no path was found.

## Definitions

### Node

A node is a single entry indicating a position on the map.

| Name | Type | Description |
|-----|-----|-----|
| x | Number | The x position of the Node |
| y | Number | The y position of the Node |

### StageNode

A stagenode contains all the properties of a Node, but also contains the following properties:

| Name | Type | Description |
|-----|-----|-----|
| cost | Number | The cost to get to the goal from this position |
| trail | Node[] | A list of nodes that make up the parent trace to get back to the start from this Node |

### QueueNode

Identical to StageNode at this time.