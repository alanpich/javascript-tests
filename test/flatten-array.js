describe('flatten array', function () {
  it('should flatten an array', function () {
    var arr = [1, 2, [1, 2, [3, 4, 5, [1]]], 2, [2]],
        expected = [1, 1, 1, 2, 2, 2, 2, 3, 4, 5];

    function flatten(arr)
    {
    	for( var k = 0; k< arr.length; k++ ) {
    		if( arr[k] instanceof Array ) {
    			arr.splice.apply(arr, 
    				[k, 1].concat(flatten(arr[k])) );
    		}
    	}
    	return arr;
    }
    arr = flatten(arr).sort();

    expect(arr).toEqual(expected);
  });
});