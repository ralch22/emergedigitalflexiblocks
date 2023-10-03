exports.createSchemaCustomization = require('./src/createSchemaCustomization');

exports.onCreateNode = require('./src/onCreateNode');

exports.createPages = require('./src/createPages');

exports.onCreatePage = require('./src/onCreatePage');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@tap-payments\/gosell/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
