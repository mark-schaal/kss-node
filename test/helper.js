'use strict';

// Globals for all test_*.js files. Add these to .eslintrc too.
global.chai = require('chai');
global.kss = require('../index.js');
global.path = require('path');
global.expect = global.chai.expect;

// Create a helper utility object.
global.helperUtils = {
  // Returns the full path to the test fixtures in test/fixtures or sub-directory.
  fixtures: function() {
    // Add the fixtures path to the start our list of paths.
    let args = Array.prototype.slice.call(arguments);
    args.unshift('fixtures');
    args.unshift(__dirname);
    return path.join.apply(this, args);
  },

  // Simplifies usage of kss.traverse() in various tests.
  traverseFixtures: function(options) {
    return kss.traverse(this.fixtures(), options).then(styleGuide => {
      expect(styleGuide.sections()).to.be.ok;
      return styleGuide;
    }).catch(error => {
      expect(error).to.not.exist;
    });
  }
};

// This before() is run before any tests in the test_*.js files.
before(function() {
  // Add custom assertions.
  chai.use(function(chai) {
    let Assertion = chai.Assertion;

    // .containFixture(string) asserts that a given file should be in an array.
    Assertion.addMethod('containFixture', function(file) {
      file = path.resolve(helperUtils.fixtures(), file);
      this.assert(
        this._obj.meta.files.indexOf(file) >= 0,
        'to contain the file named #{exp}, but contained #{act}',
        'to not contain the file named #{exp} in #{act}',
        file,
        this._obj.meta.files
      );
    });
  });
});
