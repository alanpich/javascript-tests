describe('scoping', function () {
  it('should correctly deal with scoping `this` back to the callee', function () {
    var mod = new Module(),
        request,
        bind;

    request = function (callback) {
      return callback();
    };

    function Module () {
      this.foo = 'bar';
    }

    Module.prototype.method = function() {
      return this.foo;
    };

    Module.prototype.req = function() {
      return request( bind(this.method, this) );
    };

    /**
    * Bind polyfill
    *
    *  Required b/c PhantomJs < 2.0 is stoopid and doesnt support Object.bind()
    */
    function bind (func, scope) {
      if(typeof func.bind === 'function') {
        return func.bind(scope);
      } else {
        return function () {
          return func.apply(scope);
        }
      }
    }

    expect(mod.req()).toBe('bar');
  });
});