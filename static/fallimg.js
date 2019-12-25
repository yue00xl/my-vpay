console.log(333)

void function(window, document, undefined) {
    console.log(4444)

    // ES5 strict mode
    "user strict";

    var MIN_COLUMN_COUNT = 2; // minimal column count
    var COLUMN_WIDTH = 281;   // cell width: 190, padding: 14 * 2, border: 1 * 2
    var CELL_PADDING = 0;    // cell padding: 14 + 10, border: 1 * 2
    var GAP_HEIGHT = 0;      // vertical gap between cells
    var GAP_WIDTH = 22;       // horizontal gap between cells
    var THRESHOLD = 2000;     // determines whether a cell is too far away from viewport (px)

    var columnHeights;        // array of every column's height
    var columnCount = 4;          // number of columns
    var noticeDelay;          // popup notice timer
    var resizeDelay;          // resize throttle timer
    var scrollDelay;          // scroll throttle timer
    var managing = false;     // flag for managing cells state
    var page = 1;
    var tip = true;

    var cellsContainer = document.getElementById('cells');
    var cellTemplate = document.getElementById('template').innerHTML;
    var gonglveLoad = document.getElementById('gonglve_load');

    // Cross-browser compatible event handler.
    var addEvent = function(element, type, handler) {
        if(element.addEventListener) {
            addEvent = function(element, type, handler) {
                element.addEventListener(type, handler, false);
            };
        } else if(element.attachEvent) {
            addEvent = function(element, type, handler) {
                element.attachEvent('on' + type, handler);
            };
        } else {
            addEvent = function(element, type, handler) {
                element['on' + type] = handler;
            };
        }
        addEvent(element, type, handler);
    };

    // Get the minimal value within an array of numbers.
    var getMinVal = function(arr) {
        return Math.min.apply(Math, arr);
    };

    // Get the maximal value within an array of numbers.
    var getMaxVal = function(arr) {
        return Math.max.apply(Math, arr);
    };

    // Get index of the minimal value within an array of numbers.
    var getMinKey = function(arr) {
        var key = 0;
        var min = arr[0];
        for(var i = 1, len = arr.length; i < len; i++) {
            if(arr[i] < min) {
                key = i;
                min = arr[i];
            }
        }
        return key;
    };

    // Get index of the maximal value within an array of numbers.
    var getMaxKey = function(arr) {
        var key = 0;
        var max = arr[0];
        for(var i = 1, len = arr.length; i < len; i++) {
            if(arr[i] > max) {
                key = i;
                max = arr[i];
            }
        }
        return key;
    };


    // Calculate column count from current page width.
    var getColumnCount = function() {
        return Math.max(MIN_COLUMN_COUNT, Math.floor((document.body.offsetWidth + GAP_WIDTH) / (COLUMN_WIDTH + GAP_WIDTH)));
//		return MIN_COLUMN_COUNT
    };

    // Reset array of column heights and container width.
    var resetHeights = function(count) {
        columnHeights = [];
        for(var i = 0; i < count; i++) {
            columnHeights.push(0);
        }
        cellsContainer.style.width = (count * (COLUMN_WIDTH + GAP_WIDTH)-GAP_WIDTH) + 'px';
    };

    // Fetch JSON string via Ajax, parse to HTML and append to the container.
    var appendCells = function(page) {
        tip = false;
        var fragment = document.createDocumentFragment();
        var cells = [];
        var ajax = {
            url:'/chouhungonglve/?_pn='+page+'&_of=json',
            type:'get',
            success:function (res) {
                if(res.err == 'hapn.ok'){
                    var data = res && res.data ? res.data.lists : [];
                    if(data.length){
                        for(var j = 0, k = data.length; j < k; j++) {
                            var _height = (281 / data[j].img_w_h.w ) * data[j].img_w_h.h;
                            var cell = document.createElement('div');
                            cell.className = 'cell pending';
                            cells.push(cell);
                            front(cellTemplate, {'href':data[j].link,'src': data[j].img_url, 'num':data[j].view_num,'title':data[j].community_title, 'height': _height, 'width': 281 }, cell);
                            fragment.appendChild(cell);
                        }
                        cellsContainer.appendChild(fragment);
                        adjustCells(cells);
                    }else{
                        errorTip();
                        tip = false;
                    }
                }
            },
            error:function (err) {
                console.log(err)
            }
        }
        $.ajax(ajax);
    };

    var errorTip = function () {
        var flex_title = document.getElementById('flex_title');
        var flex_icon = document.getElementById('flex_icon');
        flex_icon.style.display = 'none';
        flex_title.innerHTML="没有内容了～"
    }
    // Fake mode, only for GitHub demo. Delete this function in your project.
    var appendCellsDemo = function() {
        adjustCellsinit(cellsContainer.children);
    };
    var adjustCellsinit = function(cells,reflow) {
        var columnIndex;
        var columnHeight;
        for(var j = 0, k = cells.length; j < k; j++) {
            columnIndex = getMinKey(columnHeights);
            columnHeight = columnHeights[columnIndex];
            console.log('columnIndex==',columnIndex)
            console.log('columnHeight==',columnHeight)
            console.log(cells[j].offsetHeight,CELL_PADDING);
            
            cells[j].style.height = (cells[j].offsetHeight - CELL_PADDING) + 'px';
            cells[j].style.left = columnIndex * (COLUMN_WIDTH + GAP_WIDTH) + 'px';
            cells[j].style.top = columnHeight + 'px';
            columnHeights[columnIndex] = columnHeight + GAP_HEIGHT + cells[j].offsetHeight;
            if(!reflow) {
                cells[j].className = 'cell ready';
            }
        }
        cellsContainer.style.height = getMaxVal(columnHeights) + 'px';
        //manageCells();
    };

    // Position the newly appended cells and update array of column heights.
    var adjustCells = function(cells, reflow) {
        var columnIndex;
        var columnHeight;
        for(var j = 0, k = cells.length; j < k; j++) {
            // Place the cell to column with the minimal height.
            columnIndex = getMinKey(columnHeights);
            columnHeight = columnHeights[columnIndex];
            cells[j].style.height = (cells[j].offsetHeight - CELL_PADDING) + 'px';
            cells[j].style.left = columnIndex * (COLUMN_WIDTH + GAP_WIDTH) + 'px';
            cells[j].style.top = columnHeight + 'px';
            columnHeights[columnIndex] = columnHeight + GAP_HEIGHT + cells[j].offsetHeight;
            if(!reflow) {
                cells[j].className = 'cell ready';
            }
        }
        tip = true;
        cellsContainer.style.height = getMaxVal(columnHeights) + 'px';
        manageCells();
    };

    // Calculate new column data if it's necessary after resize.
    var reflowCells = function() {
        // Calculate new column count after resize.
        columnCount = getColumnCount();
        if(columnHeights.length != columnCount) {
            // Reset array of column heights and container width.
            resetHeights(columnCount);
            adjustCells(cellsContainer.children, true);
        } else {
            manageCells();
        }
    };

    // Toggle old cells' contents from the DOM depending on their offset from the viewport, save memory.
    // Load and append new cells if there's space in viewport for a cell.
    var manageCells = function() {
        // Lock managing state to avoid another async call. See {Function} delayedScroll.
        managing = true;

        var cells = cellsContainer.children;

        var viewportTop = (document.body.scrollTop || document.documentElement.scrollTop) - cellsContainer.offsetTop;
        var viewportBottom = (window.innerHeight || document.documentElement.clientHeight) + viewportTop;
        // Remove cells' contents if they are too far away from the viewport. Get them back if they are near.
        // TODO: remove the cells from DOM should be better :<
        for(var i = 0, l = cells.length; i < l; i++) {
            if((cells[i].offsetTop - viewportBottom > THRESHOLD) || (viewportTop - cells[i].offsetTop - cells[i].offsetHeight > THRESHOLD)) {
                if(cells[i].className === 'cell ready') {
                    cells[i].fragment = cells[i].innerHTML;
                    cells[i].innerHTML = '';
                    cells[i].className = 'cell shadow';
                }
            } else {
                if(cells[i].className === 'cell shadow') {
                    cells[i].innerHTML = cells[i].fragment;
                    cells[i].className = 'cell ready';
                }
            }
        }

        // If there's space in viewport for a cell, request new cells.
        if(viewportBottom > (getMinVal(columnHeights) - 300)) {
            gonglveLoad.style.display = 'block';
            // Remove the if/else statement in your project, just call the appendCells function.]
            if(tip){
                page = page + 1;
                appendCells(page);
            }
        }

        // Unlock managing state.
        managing = false;
    };

    // Add 500ms throttle to window scroll.
    var delayedScroll = function() {
        clearTimeout(scrollDelay);
        if(!managing) {
            // Avoid managing cells for unnecessity.
            scrollDelay = setTimeout(manageCells, 50);
        }
    };


    // Initialize the layout.
    var init = function() {
        //addEvent(window, 'scroll', delayedScroll);
        resetHeights(columnCount);
        
        console.log(22)
        appendCellsDemo();
    };
    init();
}(window, document);