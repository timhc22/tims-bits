describe('DefaultController', function() {

    it('should create a model with 3 items', function() {
        var scope = {};
        var ctrl = new DefaultController(scope);

        expect(scope.items.length).toBe(3);
    });
});