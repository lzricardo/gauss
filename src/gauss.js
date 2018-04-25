$(document).ready(function () {
    var A1 = [
        [1, -5, 1, -13, 3, 16],
        [-5, 1, 16, -2, -7, 7],
        [-17, 6, 5, -1, 4, -14],
        [2, 11, -1, -5, -20, 3],
        [3, -21, -8, -4, 5, -5]
    ];

    //copy matrix
    var A2 = A1.map(function(arr) {
        return arr.slice();
    });

    $('body').append('<h2>with pivoting</h2>');
    $('body').append(JSON.stringify(gaussWithPivoting(A1), null, 4));
    $('body').append('<h2>without pivoting</h2>');
    $('body').append(JSON.stringify(gaussWithoutPivoting(A2), null, 4));


});

/** Solve a linear system of equations given by a n&times;n matrix
 with a result vector n&times;1. */
function gaussWithPivoting(A) {
    var n = A.length;

    for (var i=0; i<n; i++) {
        // Search for maximum in this column
        var maxEl = Math.abs(A[i][i]);
        var maxRow = i;
        for(var k=i+1; k<n; k++) {
            if (Math.abs(A[k][i]) > maxEl) {
                maxEl = Math.abs(A[k][i]);
                maxRow = k;
            }
        }

        // Swap maximum row with current row (column by column)
        for (var k=i; k<n+1; k++) {
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }

        // Make all rows below this one 0 in current column
        for (k=i+1; k<n; k++) {
            var c = -A[k][i]/A[i][i];
            for(var j=i; j<n+1; j++) {
                if (i==j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    var x= new Array(n);
    for (var i=n-1; i>-1; i--) {
        x[i] = A[i][n]/A[i][i];
        for (var k=i-1; k>-1; k--) {
            A[k][n] -= A[k][i] * x[i];
        }
    }
    return x;
}

/** Solve a linear system of equations given by a n&times;n matrix
 with a result vector n&times;1. */
function gaussWithoutPivoting(A) {
    var n = A.length;

    for (var i=0; i<n; i++) {
        // Make all rows below this one 0 in current column
        for (k=i+1; k<n; k++) {
            var c = -A[k][i]/A[i][i];
            for(var j=i; j<n+1; j++) {
                if (i==j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    var x= new Array(n);
    for (var i=n-1; i>-1; i--) {
        x[i] = A[i][n]/A[i][i];
        for (var k=i-1; k>-1; k--) {
            A[k][n] -= A[k][i] * x[i];
        }
    }
    return x;
}