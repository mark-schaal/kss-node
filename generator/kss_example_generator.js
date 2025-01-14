'use strict';

/**
 * The `kss/generator/example` module loads the KssExampleGenerator
 * object, a `{@link KssGenerator}` object using no templating.
 * ```
 * const kssExampleGenerator = require('kss/generator/example');
 * ```
 * @module kss/generator/example
 */

// Import the KssGenerator object. We will use its API to scaffold our
// generator.
const KssGenerator = require('kss/generator'),
  path = require('path');

// Define "kssExampleGenerator" as the name of our example template engine.
//
// Our generator is an instance of the KssGenerator object with
// additional functionality added by overriding the parent methods.
//
// See the docs for KssGenerator() for info about its parameters.
const kssExampleGenerator = new KssGenerator('3.0', {
  'example-option': {
    alias: 'u',
    string: true,
    description: 'This is a custom command-line option used by this Generator.'
  }
});

/**
 * Clone a template's files.
 *
 * The KssGenerator.clone() method is a simple and functional implementation; it
 * copies one directory to the specified location. An instance of KssGenerator
 * does not need to override this method, but it can if it needs to do something
 * more complicated.
 *
 * @param {string} templatePath    Path to the template to clone.
 * @param {string} destinationPath Path to the destination of the newly cloned
 *                                 template.
 * @returns {Promise} A `Promise` object.
 */
kssExampleGenerator.prototype.clone = function(templatePath, destinationPath) {
  // Note that, at this point, kssExampleGenerator.init() has not been called.
  this.log('Example template cloned to ' + destinationPath + '! (not really.)');

  return Promise.resolve();
};

/**
 * Initialize the style guide creation process.
 *
 * This method is given a configuration JSON object with the details of the
 * requested style guide generation. The generator can use this information for
 * any necessary tasks before the KSS parsing of the source files.
 *
 * @param {Object} config Configuration object for the requested generation.
 * @returns {Promise} A `Promise` object.
 */
kssExampleGenerator.init = function(config) {
  // At the very least, generators MUST save the configuration parameters.
  this.config = config;

  // This example generator hard-codes the demo source.
  this.config.source = [path.resolve('../demo')];

  // A real generator should initialize the template system being used by this
  // generator. For example, kssHandlebarsGenerator loads and initializes the
  // Handlebars templating system.
  this.warning = ' (not really.)';

  return Promise.resolve();
};

/**
 * Generate the HTML files of the style guide given a KssStyleGuide object.
 *
 * @param {KssStyleGuide} styleGuide The KSS style guide in object format.
 * @returns {Promise} A `Promise` object.
 */
kssExampleGenerator.prototype.generate = function(styleGuide) {
  styleGuide.sections();
  this.log('...Generating the demo style guide.' + this.warning);

  return Promise.resolve();
};

// Export our "kssExampleGenerator" object.
module.exports = kssExampleGenerator;
