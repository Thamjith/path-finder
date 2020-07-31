function greedyBest(grid, start, end, heuristicMap,minHeap,parentMap,choices){
  if(!grid || !start || !end){
    console.log("Invalid input");
    return;
  }

  if(minHeap.length){
    minHeap.sort((a,b) => heuristicMap.get(b) - heuristicMap.get(a));
    curr = minHeap.pop();
    let div = curr.divReference;
    div.classList.add("node-current");
    setTimeout(() => {div.classList.remove("node-current"); div.classList.add("node-check")});
    if(curr === end){
      console.log("found it");
      console.log(curr);
      console.log(end);
      executeDrawPath(parentMap,curr);
      return;
    }
    for(let i = 0 ; i < choices.length ; ++i){
      let row = curr.row + choices[i][0];
      let col = curr.col + choices[i][1];
      if(grid[row] && grid[row][col] && !grid[row][col].isWall && !parentMap.has(grid[row][col])){
        minHeap.push(grid[row][col]);
        parentMap.set(grid[row][col], curr);
      }
    }

  setTimeout(greedyBest,10,grid, start, end, heuristicMap,minHeap,parentMap,choices);
}else{
  console.log("didn't find it!");
  return;
}
}


function greedyBestRT(grid, start, end){
  if(!grid || !start || !end){
    console.log("Invalid input");
    return;
  }

  let heuristicMap = new Map();
  let minHeap = [];
  let parentMap = new Map();
  let curr = start;
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  for(let i = 0 ; i < grid.length ; ++i){
    for(let j = 0 ; j < grid[i].length ; ++j){
      heuristicMap.set(grid[i][j], Math.abs(grid[i][j].row - end.row) + Math.abs(grid[i][j].col - end.col));
    }
  }
  parentMap.set(curr, null);
  minHeap.push(curr);
  while(minHeap.length){
    minHeap.sort((a,b) => heuristicMap.get(b) - heuristicMap.get(a));
    curr = minHeap.pop();
    let div = curr.divReference;
    div.classList.add("node-check-rt");
    if(curr === end){
      console.log("found it");
      console.log(curr);
      console.log(end);
      executeDrawPath(parentMap,curr);
      return;
    }
    for(let i = 0 ; i < choices.length ; ++i){
      let row = curr.row + choices[i][0];
      let col = curr.col + choices[i][1];
      if(grid[row] && grid[row][col] && !grid[row][col].isWall && !parentMap.has(grid[row][col])){
        minHeap.push(grid[row][col]);
        parentMap.set(grid[row][col], curr);
      }
    }
  }
  console.log("didn't find it!");
}