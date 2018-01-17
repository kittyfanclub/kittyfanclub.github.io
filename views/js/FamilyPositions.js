
//The following global values must be set before the algorithm is called; they are
//not changed during the algorithm. They can be coded as constants.


//CONSTANTS
//The fixed distance between adjacent levels of the tree. Used in
//determining they-coordinate of a node being positioned.
var LevelSeparation = 50;
// The maximum number of levels in the tree to be positioned. If all
//levels are to be positioned, set this value to positive infinity (or an
//appropriate numerical value).
var MaxDepth = 8;
// The minimum distance between adjacent siblings of the tree.
var SiblingSeparation = 5;
//The minimum distance between adjacent subtrees of a tree. For
//proper aesthetics, this value is normally somewhat larger than
//SiblingSeparation.
var SubtreeSeparation = 15;

var canvasWidth = 200;
var canvasHeight = 400;

// VARIABLES
//The algorithm maintains a list of the previous node at each level,
//that is, the adjacent neighbor to the left. Leve!ZeroPtr is a pointer
//to the first entry in this list.
var LeveiZeroPtr;

//A fixed distance used in the final walk of the tree to determine the
//absolute x-coordinate of a node with respect to the apex node of
//the tree.
var xTopAdjustment

// A fixed distance used in the final walk of the tree to determine the
// absolute y-coordinate of a node with respect to the apex node of
// the tree.

var yTopAdjustment




function POSITIONTREE(Node, width, height) {
  if (Node != undefined) {
    if (width != undefined) {
      canvasWidth = width;
    }
    if (height != undefined) {
      canvasHeight = height;
    }

    LevelSeparation = Node.height * 1.5;
    SiblingSeparation = Node.width * 0.1;
    SubtreeSeparation = Node.width * 0.2;
    //(*Initialize the list of previous nodes at each level. *)
    INITNODEARRAY(Node);
    //(* Oo the preliminary positi ani ng with a postorder walk. *)
    var reductionFactor = 0.7;
    FIRSTWALK(Node, 0, reductionFactor);
    //(* Determine h01; to adjust all the nodes ~<ith respect to *)
    //(* the 1 ocati on of the root. *)
    //xTopAdjustment = Node.left; //XCOORD(Node) - PRELIM(Node);
    xTopAdjustment = Node.left - Node.leftP;
    yTopAdjustment = Node.top;
    //(*Do the final positioning with a preorder walk.
    return SECONDWALK(Node, 0, 0, reductionFactor);
  }
    // (*Trivial: return TRUE if a null pointer 1;as passed.
  return TRUE;

}


function FIRSTWALK (Node, Level, reductionFactor) {
  //(*Set the pointer to the previous node at this level. *)
  //var leftNeighbor = GETPREVNODEATLEVEL(Node);
  //LEFTNEIGHBOR(Node) ~ GETPREVNODEATLEVEL(Level);
  //SETPREVNODEATLEVEL(Level, Node); (* This is now the previous. *)
  //MODIFIER(Node) ~ B; (*Set the default modifier value. *)
  console.log('Firstwalk: ' + Node.id);
  var modifier = 0;
  var reduction = 1;
  if (reductionFactor != undefined) {
    reduction = Math.pow(1/reductionFactor, Level);
    Node.width = Node.width / reduction;
    Node.height = Node.height / reduction;
  }
  if (ISLEAF(Node) || Level == MaxDepth) {
    var leftSibling = LEFTSIBLING(Node);
    if (leftSibling != undefined) {
      // (* Determine the preliminary x-coordinate based on: *)
      // (* the preliminary x-coordinate of the left sibling, *)
      // (* the separation between sibling nodes, and *)
      // (* tne mean size of left sibling and current node. *)
      Node.leftP = leftSibling.leftP +
                    SiblingSeparation +
                    MEANNODESIZE(leftSibling , Node) ;
    }
    else {
      // (*No sibling on the left to worry about.
      Node.leftP = 0;
    }
  }

  else {
    //(* This Node is not a leaf, so call this procedure *)
    //(* recursively for each of its offspring. *)
    var Leftmost = FIRSTCHILD(Node);
    var Rightmost = Leftmost;
    FIRSTWALK(Leftmost, Level + 1, reductionFactor);
    var rightSib = RIGHTSIBLING(Rightmost);
    while (rightSib != undefined) {
      Rightmost = rightSib;
      FIRSTWALK(Rightmost, Level + 1, reductionFactor);
      rightSib = RIGHTSIBLING(Rightmost);
    }
    var Midpoint = (Leftmost.leftP + Rightmost.leftP) / 2;
    var leftSibling = LEFTSIBLING(Node);
    //var leftSibling = LEFTNEIGHBOR(Node);
    if (leftSibling != undefined) {
      Node.leftP = leftSibling.leftP +
                SiblingSeparation +
                MEANNODESIZE(leftSibling, Node);
      Node.modifier = Node.leftP - Midpoint;
      APPORTION(Node, Level);
    }
    else {
      Node.leftP = Midpoint;
    }
  }
}

function SECONDWALK (Node, Level, Modsum, reductionFactor) {
  var Result = true;
  if (Level<=MaxDepth) {
    xTemp = xTopAdjustment + Node.leftP + Modsum;
    yTemp = yTopAdjustment + (Node.height) + (Level * LevelSeparation);
    if (CHECKEXTENTSRANGE(xTemp, yTemp)) {
      Node.left = xTemp;
      Node.top = yTemp;
      console.log('Node: ' + Node.id + ' x: ' + Node.left + ' topadj: ' + xTopAdjustment +  ' Node.leftP: ' + Node.leftP + ' Modsum: ' +  Modsum );

      if (Node.children != undefined && Node.children.length > 0) {
        // (*Apply the Modifier value for this node to *)
        // (*all its offspring. *)
        Result = SECONDWALK(FIRSTCHILD(Node), Level + 1, Modsum + Node.modifier, reductionFactor);
      }
      var rightSib = RIGHTSIBLING(Node);
      if (Result == true && rightSib != undefined) {
        Result = SECONDWALK(rightSib, Level, Modsum, reductionFactor);
      }
    }
    else {
      //(* Continuing would put the tree outside of the *)
      //(* drawable extents range. *)
      Result = true;
    }
  }
  else {
    // (* We are at a level deeper than 1·1hat we want to draw. *)
    Result = false;
  }
  return Result;
}

function APPORTION (Node, Level) {
  console.log("Apportion: " + Node.id);
  var Leftmost = FIRSTCHILD(Node);
  var Neighbor = LEFTNEIGHBOR(Leftmost);
  var CompareDepth = 1;
  var DepthToStop = MaxDepth - Level;
  MoveDistance = 0;

  while (Leftmost != undefined &&
        Neighbor != undefined &&
        CompareDepth <= DepthToStop) {
    // (* Compute the location of Leftmost and where it should *)
    // (* be with respect to Neighbor. *)
    var LeftModsum = 0;
    var RightModsum = 0;
    var AncestorLeftmost = Leftmost;
    var AncestorNeighbor = Neighbor;
    if (AncestorLeftmost != undefined && AncestorNeighbor != undefined) {
      for (var i = 0; i < CompareDepth; i++) {
        AncestorLeftmost = GETPARENT(AncestorLeftmost);
        AncestorNeighbor = GETPARENT(AncestorNeighbor);
        if (AncestorLeftmost != undefined && AncestorNeighbor != undefined) {
          RightModsum = RightModsum + AncestorLeftmost.modifier;
          LeftModsum = LeftModsum + AncestorNeighbor.modifier;
        }
      }

      //(* Find the MoveDistance, and apply it to Node's subtree. *)
      // (*Add appropriate portions to smaller interior subtrees. *)
      var MoveDistanceX = Neighbor.leftP - Leftmost.leftP
                    + LeftModsum
                    - RightModsum
                    SubtreeSeparation +
                    MEANNODESIZE(Leftmost, Neighbor);
                    //Leftmost.leftP + RightModsum;
      if (MoveDistanceX > 0) {
        // (*Count interior sibling subtrees in LeftSiblings*)
        var TempPtr = Node;
        var LeftSiblings = 0;
        while (TempPtr != undefined &&
              TempPtr != AncestorNeighbor) {

                LeftSiblings = LeftSiblings + 1;
                TempPtr = LEFTSIBLING(TempPtr);
        }

        if (TempPtr != undefined) {
          // (*Apply portions to appropriate leftsibling *)
          //(* subtrees. *)
          //added this line
          MoveDistanceX = MoveDistanceX + Node.width;
          var Portion = MoveDistanceX / LeftSiblings;
          var TempPtr = Node;
          while (TempPtr != AncestorNeighbor) {
            TempPtr.leftP = TempPtr.leftP + MoveDistanceX;
            TempPtr.modifier = TempPtr.modifier + MoveDistanceX;
            MoveDistanceX = MoveDistanceX - Portion;
            TempPtr = LEFTSIBLING(TempPtr);
          }
        }
        else {
          // (* Don't need to move anything--it needs to *)
          // (* be done by an ancestor because *)
          // (* AncestorNeighbor and AncestorLeftmost are *)
          // (* not siblings of each other. *)
          //return;
        }
      }
      //(* Determine the leftmost descendant of Node at the next *)
      //(* lower level to compare its positioning against that of*)
      //(* its Neighbor.
      CompareDepth = CompareDepth + 1;
      if (ISLEAF(Leftmost)) {
        Leftmost = GETLEFTMOST(Node, 0, CompareDepth);
        if (Leftmost != undefined) {
          Neighbor = LEFTNEIGHBOR(Leftmost);
        }
      }
      else {
        Leftmost = FIRSTCHILD(Leftmost);
        if (Leftmost != undefined) {
          Neighbor = LEFTNEIGHBOR(Leftmost);
        }
      }
    } // end if
  } // end while
}

function showId(label, Node) {
  return;
  if (Node == undefined) {
    console.log(label + ':' + Node);
  }
  else {
    console.log(label + ':' + Node.id);
  }
}

//This function returns the leftmost descendant of a
//node at a given Depth. This is implemented using a postorder walk of the
//subtree under Node, down to the level of Depth. Level here is not the absolute
//tree level used in the two main tree walks; it refers to the level below the
//node whose leftmost descendant is being found.
function GETLEFTMOST (Node, Level, Depth) {
  showId('Node:', Node);
  if (Node == undefined) {
    return null;
  }
  if (Level >= Depth) {
    return Node;
  }
  if (ISLEAF(Node)) {
    return null;
  }

  var Rightmost = FIRSTCHILD(Node);
  showId('FirstChild:', Rightmost);
  var Leftmost = GETLEFTMOST (Rightmost, Level + 1, Depth);
  //(* Do a postorder walk of the subtree below Node. *)
  while (Leftmost == undefined &&
    HASRIGHTSIBLING(Rightmost)) {
      Rightmost = RIGHTSIBLING(Rightmost);
      Leftmost = GETLEFTMOST(Rightmost, Level + 1, Depth);
  }
  return Leftmost;
}

function ISLEAF(Node) {
  if (Node.children == undefined) {
    return true;
  }
  if (Node.children.length == 0) {
    return true;
  }
  return false;
}

function GETPARENT(Node) {
  // revisit this!!!, might be dad
  if (Node == undefined) {
    return null;
  }
  var parent = Node.mom;
  if (parent == undefined) {
    parent = Node.dad;
  }
  return parent;
}

function FIRSTCHILD(Node) {
  if (Node.children != undefined) {
    if (Node.children.length > 0) {
      return Node.children[0];
    }
  }
  return null;
}

function HASRIGHTSIBLING(Node) {
  var parent = GETPARENT(Node);

  if (parent != undefined) {
    if (parent.children != undefined) {
      for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i] == Node) {
          if (i < parent.children.length) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    }
  }
  return false;
}

// The current node's closest sibling node on the left.
function LEFTSIBLING(Node) {
  var parent = GETPARENT(Node);

  if (parent != undefined) {
    if (parent.children != undefined) {
      for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i] == Node) {
          if (i > 0) {
            return parent.children[i-1];
          }
          else {
            return null;
          }
        }
      }
    }
  }
  return null;
}

//The current node's closest sibling node on the right
function RIGHTSIBLING(Node) {
  var parent = GETPARENT(Node);

  if (parent != undefined) {
    if (parent.children != undefined) {
      for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i] == Node) {
          if (i + 1 < parent.children.length) {
            return parent.children[i+1];
          }
          else {
            return null;
          }
        }
      }
    }
  }
  return null;
}


function MEANNODESIZE (LeftNode, RightNode) {
  var NodeSize = 0;
  if (LeftNode != undefined) {
    NodeSize += LeftNode.width / 2;
  }
  if (RightNode != undefined) {
    NodeSize += RightNode.width / 2;
  }
  return NodeSize;
}

function CHECKEXTENTSRANGE (xValue, yValue) {
  return true;
    if (xValue < 0) return false;
    if (yValue < 0) return false;
    if (xValue > canvasWidth) return false;
    if (yValue > canvasHeight) return false;

    return true;
}

var NodeLevels = [];
function INITNODEARRAY(BaseNode) {
  var levelArr = [];
  levelArr.push(BaseNode);
  NodeLevels.push(levelArr);

  INITCHILDNODEARRAY(levelArr);
  return NodeLevels;
}

function showNodeLevels() {
  for(var i = 0; i < NodeLevels.length; i++) {
    var level = NodeLevels[i];
    for (var j = 0; j < level.length; j++) {
      var display = i + "," + j + ":" +level[j].id;
      console.log(display);
    }
  }
}

function INITCHILDNODEARRAY(parentArr) {
  if (parentArr.length > 0) {
    var levelArr = [];
    // loop thru array
    for(var i = 0; i < parentArr.length; i++) {
      var node = parentArr[i];
      if (node.children != undefined) {
        // add the children to the array
        for (var j = 0; j < node.children.length; j++) {
          levelArr.push(node.children[j]);
        }
      }
    }
    if (levelArr.length > 0) {
      NodeLevels.push(levelArr);
      // init those children
      INITCHILDNODEARRAY(levelArr);
    }
  }
}

// returns the first node at a given level
function GETPREVNODEATLEVEL (Level) {
  if (NodeLevels.length < Level) {
    return NodeLevels[Level][0];
  }
  return null;
}

function LEFTNEIGHBOR (Node) {
  for (var i = 0; i < NodeLevels.length; i++) {
    for (var j = 0; j < NodeLevels[i].length; j++) {
      CurNode = NodeLevels[i][j];
      if (CurNode == Node) {
        if (j > 0) {
          return NodeLevels[i][j - 1];
        }
        else {
          return null;
        }
      }
    }
  }
  return null;
}

//Initialize the list of prev_ious nodes at each level. Three Jist-maintenance procedures,
//GETPREVNODEATLEVEL, SETPREVNODEATLEVEL, and
//INITPREVNODELIST. maintain a singly-linked list. Each entry in the list corresponds
//to the node previous to the current node at a given level (for example,
//element 2 in the list corresponds to the node to the left of the current node at
//level 2). If the maximum tree size is known beforehand, this Jist can be
//replaced with a fixed-size array, and these procedures become trivial.
/*
procedure INITPREVNODELIST(BaseNode, Levels)
(* Start with the node at level 8--the apex of the tree.
TempPtr • LevelZeroPtr;
while TempPtr f ¢do
begin
PREVNODE(TempPtr) • ¢;
TempPtr • NEXTLEVEL(TempPtr);
end;
*/
/*
function SECOND'!IALK (Node; Level, flodsum): BOOLEAN;
begin
if Level ~ l·laxDepth then
begin
end;
else
x Temp ~ xTopAdj us tment + PREL!fl (Node) + flods urn;
yTemp ~ yTopAdjustment + (Level * LevelSeparation);
(* Check to see that xTemp and yTemp are of the proper *)
(* size for your application. *)
if CHECKEXTENTSRANGE(xTemp, yTemp) then
else
begin
end;
XCOORD(Node) ~ xTemp;
YCOORD(Node) ~ yTemp;
if HASCHILD(fiode) then
(*Apply the flodifier value for this node to *)
(*all its offspring. *)
Result ~ SECONDHALK(FIRSTCHILD(IIode),
Level + 1,
flodsum + HODIFIER(Node));
if (Result= TRUE and
HASRIGHTSIBLING(Node)) then
Result ~ SECOND\~ALK(RIGHTSIBLING(flode),
Level + 1,
l·lodsum);
(* Continuing would put the tree outside of the *)
(* drawable extents range. *)
Result ~ FALSE;
(* We are at a level deeper than 1·1hat we want to draw. *)
Result ~ TRUE;
return Result;
end.
*/
