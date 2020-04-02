/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
const slug = require(`slug`);
const { slash } = require(`gatsby-core-utils`);

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const shopData = await graphql(`
    query {
      allShopJson {
        edges {
          node {
            id
            name
            categories
            cities
            openTime
            menu {
              id
              name
              price
            }
            services
            address
            phone
          }
        }
      }
    }
  `);

  if (shopData.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // console.log(JSON.stringify(shopData, null, 4));

  const shopTemplate = path.resolve(`src/templates/ShopView.js`);

  shopData.data.allShopJson.edges.forEach(edge => {
    createPage({
      path: `/shops/${slug(edge.node.id)}/`,
      component: slash(shopTemplate),
      context: {
        shop: {
          ...edge.node,
        },
      },
    });
  });
};
