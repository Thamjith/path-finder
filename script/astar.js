function astar(grid,start,end,parentMap,distanceMap,hMap,processed,minHeap,choices){
  let curr = null;
  if(minHeap.length){
    minHeap.sort((a,b) => (distanceMap.get(b) + hMap.get(b)) - (distanceMap.get(a) + hMap.get(a)));
    curr = minHeap.pop();
    let div = curr.divReference;
    if(processed.has(curr)){
      div.classList.add("node-backtrack");
      setTimeout(astar,10,grid,start,end,parentMap,distanceMap,hMap,processed,minHeap,choices);
      return;
    }
    div.classList.add("node-current");
    setTimeout(() => {div.classList.remove("node-current"); div.classList.add("node-check");},1000)
    // div.classList.add("node-check");
    if(curr === end){
      console.log("Found it!");
      console.log(curr);
      console.log(end);
      executeDrawPath(parentMap,curr);
      return;
    }
    processed.add(curr);
    for(let i = 0 ; i < choices.length ; ++i){
      let row = curr.row + choices[i][0];
      let col = curr.col + choices[i][1];
      if(grid[row] && grid[row][col] && !grid[row][col].isWall && !processed.has(grid[row][col])){
        let currDistance = distanceMap.get(curr);
        let edgeDistance = !grid[row][col].Weight ? 1 : grid[row][col].weight;
        let newDistance = currDistance + edgeDistance;
        if(newDistance < distanceMap.get(grid[row][col])){
          parentMap.set(grid[row][col],curr);
          distanceMap.set(grid[row][col],newDistance);
        }
        minHeap.push(grid[row][col]);
      }
    }
  }else{
    console.log("not found!");
    return;
  }
  setTimeout(astar,10,grid,start,end,parentMap,distanceMap,hMap,processed,minHeap,choices);
}
function astarRT(grid, start, end){
  if(!grid || !start || !end){
    console.log("Invalid input!");
    return;
  }
  let parentMap = new Map();
  let distanceMap = new Map();
  let hMap = new Map();
  let processed = new Set();
  let minHeap = [];
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  let curr = start;
  minHeap.push(curr);
  let h = 0;
  for(let i = 0 ; i < grid.length ; ++i){
    for(let j = 0 ; j < grid[i].length ; ++j){
      distanceMap.set(grid[i][j],Infinity);
      h = Math.abs(grid[i][j].row - end.row) + Math.abs(grid[i][j].col - end.col);
      hMap.set(grid[i][j],h);
    }
  }
  distanceMap.set(curr, 0);
  parentMap.set(curr, null);
  while(minHeap.length){
    minHeap.sort((a,b) => (distanceMap.get(b) + hMap.get(b)) - (distanceMap.get(a) + hMap.get(a)));
    curr = minHeap.pop();
    if(processed.has(curr)){
      continue;
    }
    // console.log(curr);
    let div = curr.divReference;
    div.classList.add("node-check-rt");
    if(curr === end){
      console.log("Found it!");
      console.log(curr);
      console.log(end);
      executeDrawPath(parentMap,curr);
      return;
    }
    processed.add(curr);
    for(let i = 0 ; i < choices.length ; ++i){
      let row = curr.row + choices[i][0];
      let col = curr.col + choices[i][1];
      if(grid[row] && grid[row][col] && !grid[row][col].isWall && !processed.has(grid[row][col])){
        let currDistance = distanceMap.get(curr);
        let neighbourDistance = !grid[row][col].weight ? 1 : grid[row][col].weight
        let newDistance = currDistance + neighbourDistance;
        if(newDistance < distanceMap.get(grid[row][col])){
          distanceMap.set(grid[row][col], newDistance);
          parentMap.set(grid[row][col], curr);
        }
        minHeap.push(grid[row][col]);
      }
    }

  }
  console.log("not found");
}