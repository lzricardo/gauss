$(document).ready(function () {
    var A1 = [
        [1, -5, 1, -13, 3, 16],
        [-5, 1, 16, -2, -7, 7],
        [-17, 6, 5, -1, 4, -14],
        [2, 11, -1, -5, -20, 3],
        [3, -21, -8, -4, 5, -5]
    ];

    //Example presentation
    // var A1 = [
    //     [1, 2, 1, 3],
    //     [2, 1, -1, 0],
    //     [3, -1, -1, -2]
    // ];

    //Print matrix
    $('body').append('<h2>Augmented matrix</h2>');
    for (var i = 0; i < A1.length; i++) {
        for (var j = 0; j < A1[i].length; j++) {
            if (j == A1[i].length - 2) {
                $('body').append(A1[i][j] + '| ');
            } else {
                $('body').append(A1[i][j] + ' ');
            }
        }

        $('body').append('<br>');
    }

    //copy matrix
    var A2 = A1.map(function(arr) {
        return arr.slice();
    });

    $('body').append('<h2>with pivoting</h2>');
    var t0 = performance.now();
    $('body').append(JSON.stringify(gaussWithPivoting(A1), null, 4));
    var t1 = performance.now();
    $('body').append('<p>Call to gaussWithPivoting took ' + (t1 - t0) + ' milliseconds.</p>');
    $('body').append('<h2>without pivoting</h2>');
    var t0 = performance.now();
    $('body').append(JSON.stringify(gaussWithoutPivoting(A2), null, 4));
    var t1 = performance.now();
    $('body').append('<p>Call to gaussWithoutPivoting took ' + (t1 - t0) + ' milliseconds.</p>');
});

function gaussWithPivoting(A) {
    var n = A.length;

    for (var i=0; i<n; i++) {
        // Search for maximum in this column
        var maxEl = Math.abs(parseFloat(A[i][i].toFixed(16)));
        var maxRow = i;
        for(var k=i+1; k<n; k++) {
            if (Math.abs(parseFloat(A[k][i].toFixed(16))) > maxEl) {
                maxEl = Math.abs(parseFloat(A[k][i].toFixed(16)));
                maxRow = k;
            }
        }

        // Swap maximum row with current row (column by column)
        for (var k=i; k<n+1; k++) {
            var tmp = parseFloat(A[maxRow][k].toFixed(16));
            A[maxRow][k] = parseFloat(A[i][k].toFixed(16));
            A[i][k] = tmp;
        }

        // Make all rows below this one 0 in current column
        for (k=i+1; k<n; k++) {
            var c = -parseFloat(A[k][i].toFixed(16))/parseFloat(A[i][i].toFixed(16));
            for(var j=i; j<n+1; j++) {
                if (i==j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * parseFloat(A[i][j].toFixed(16));
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    var x= new Array(n);
    for (var i=n-1; i>-1; i--) {
        x[i] = parseFloat(A[i][n].toFixed(16))/parseFloat(A[i][i].toFixed(16));
        for (var k=i-1; k>-1; k--) {
            A[k][n] -= parseFloat(A[k][i].toFixed(16)) * parseFloat(x[i].toFixed(16));
        }
    }

    return x;
}

function gaussWithoutPivoting(A) {
    var n = A.length;

    for (var i=0; i<n; i++) {
        // Make all rows below this one 0 in current column
        for (k=i+1; k<n; k++) {
            var c = -parseFloat(A[k][i].toFixed(16))/parseFloat(A[i][i].toFixed(16));
            for(var j=i; j<n+1; j++) {
                if (i==j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * parseFloat(A[i][j].toFixed(16));
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    var x= new Array(n);
    for (var i=n-1; i>-1; i--) {
        x[i] = parseFloat(A[i][n].toFixed(16))/parseFloat(A[i][i].toFixed(16));
        for (var k=i-1; k>-1; k--) {
            A[k][n] -= parseFloat(A[k][i].toFixed(16)) * parseFloat(x[i].toFixed(16));
        }
    }

    return x;
}