[![Build Status](https://secure.travis-ci.org/kss-node/kss-node.png?branch=master)](http://travis-ci.org/kss-node/kss-node) [![Coverage Status](https://coveralls.io/repos/kss-node/kss-node/badge.svg?branch=master&service=github)](https://coveralls.io/github/kss-node/kss-node?branch=master)


# kss-node

This is a Node.js implementation of [Knyle Style Sheets](https://github.com/kneath/kss) (KSS), "a documentation syntax for CSS" that's intended to have syntax readable by humans *and* machines. Hence, the kss-node software can be used to create a "living style guide".

1. Write human-readable documentation using "KSS syntax" comments.
2. Have `kss-node` auto-generate a style guide from your stylesheets.

Here's an example KSS comment:
```scss
// Button
//
// Your standard button suitable for clicking.
//
// :hover   - Highlights when hovering.
// .shiny   - Do not press this big, shiny, red button.
//
// Markup: button.html
//
// Style guide: components.button
.button {
  ...
}
.button.shiny {
  ...
}
```

The methodology and ideas behind Knyle Style Sheets are contained in [the specification](https://github.com/kss-node/kss/blob/spec/SPEC.md).

There's an example project in the [demo directory](https://github.com/kss-node/kss-node/tree/master/demo) of this repo.

## Installation

kss-node is installed just like any other Node.js software. Read the [kss-node Quick Start Guide](https://github.com/kss-node/kss-node/wiki/Quick-Start-Guide) to learn more. It also includes an npm Quick Start Guide, if you don't know much about Node.js's npm command.

## Using the command line tool

To get you up and running quickly, a style guide generator is included that can be used from the command line. It parses stylesheets and spits out a set of static HTML files.

```
Usage: kss-node [options]

File locations:
  --source       Source directory to parse for KSS comments
  --destination  Destination directory of generated style guide
                                                         [default: "styleguide"]
  --mask, -m     Use a mask for detecting files containing KSS comments
                         [default: "*.css|*.less|*.sass|*.scss|*.styl|*.stylus"]
  --config, -c   Load the kss-node configuration from a json file

Template:
  --clone        Clone a style guide template to customize
  --template, -t  Use a custom template to build your style guide
                                      [default: "generator/handlebars/template"]

Style guide:
  --css          URL of a CSS file to include in the style guide
  --js           URL of a JavaScript file to include in the style guide
  --custom       Process a custom property name when parsing KSS comments
  --helpers      Location of custom handlebars helpers; see
                 http://bit.ly/kss-wiki
  --homepage     File name of the homepage's Markdown file
                                                      [default: "homepage.md"]
  --placeholder  Placeholder text to use for modifier classes
                                                   [default: "[modifier class]"]
  --title        Title of the style guide           [default: "KSS Style Guide"]
  --nav-depth    Limit the navigation to the depth specified        [default: 3]

Options:
  --verbose       Display verbose details while generating
  --demo          Builds a KSS demo.
  --help, -h, -?  Show help
  --version       Show version number
```

In order to parse your stylesheets containing KSS docs, you need to either specify a single directory as the first argument or you can specify one or more source directories with one or more `--source [directory]` flags.

The generated style guide will be put into the `styleguide` directory unless you specify the second argument or use a `--destination [directory]` flag.

Even though kss-node parses your CSS source, your CSS won't be included in the style guide unless you use the `--css` option or create a custom template with `--clone`.

You can generate a copy of the demo style guide like so:

    $ kss-node --demo

It is recommended that you create your own template, i.e. skin, theme. Use the `kss-node --clone` command to initialize a copy of the default template so you can edit it and use it when generating your style guide with the `--template` flag. Simply link the generated CSS (as well as JS, etc.) from inside the custom template's index.html.

    $ kss-node --clone custom-template
    $ kss-node path/to/sass styleguide --template custom-template

The default template should look something like this:

![CLI Template Preview](https://raw.github.com/kss-node/kss-node/master/demo/preview.png)

## Differences from kneath/kss

Unlike the default Ruby implementation at kneath/kss, kss-node includes a few optional features to allow for completely automated style guide generation.

**Language Agnostic**. kss-node does not care what language your application is written in (Ruby, Node.js, PHP, whatever). It just scans your CSS source files looking for KSS docs so that it can generate a living style guide. And since it only looks for properly formatted KSS comments, it also doesn't need to know what kind of CSS preprocessor you use either.

**Homepage Text**. The overview text needed for the style guide homepage is generated from a Markdown file, which you should place in a `--source` directory, just name it `homepage.md` and it will be included in the final style guide automatically.

Additional kss-node specifics are detailed in this version of the [KSS spec](https://github.com/kss-node/kss/blob/spec/SPEC.md).

Take a look at the [demo project](https://github.com/kss-node/kss-node/tree/master/demo) for some examples.

## Using kss-node from Node.js

Check out the [JavaScript API](http://kss-node.github.io/kss-node/section-javascript-api.html) for a full explanation. Here's an example:

``` javascript
var kss = require('kss'),
    options = {
        markdown: false
    };

kss.traverse('public/stylesheets/', options, function(error, styleGuide) {
    if (error) throw error;

    styleGuide.sections('2.1.1')                                   // <KssSection>
    styleGuide.sections('2.1.1').modifiers(0)                      // <KssModifier>
    styleGuide.sections('2.1.1').modifiers(':hover').description() // 'Subtle hover highlight'
    styleGuide.sections('2.1.1').modifiers(0).className()          // 'pseudo-class-hover'
    styleGuide.sections('2.x.x')                                   // [<KssSection>, ...]
    styleGuide.sections('2.1.1').modifiers()                       // [<KssModifier>, ...]
});
```

## Development

Forking, hacking, and tearing apart of this software is welcome! It still needs some cleaning up.

After you've cloned this repository, run `npm install` and then you'll be able to run the module's mocha and eslint tests with `npm test`.

To generate a new version of the demo style guide, use `make docs`. After committing your changes to master you can use the `gh-pages.sh` script to move this over to the `gh-pages` branch real quick.

## Contributors

Lots! And more are welcome. https://github.com/kss-node/kss-node/graphs/contributors
