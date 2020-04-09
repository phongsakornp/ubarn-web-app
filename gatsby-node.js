const path = require('path');
const slug = require(`slug`);
const { slash } = require(`gatsby-core-utils`);
const axios = require(`axios`);

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const shopResult = await axios.get(
    `${process.env.JSON_DATASOURCE_URL}/shop.json`
  );
  shopResult.data.forEach(shop => {
    const node = {
      ...shop,
      shopId: `${shop.id}`,
      // Needs to be global unique
      id: createNodeId(`shop-${shop.id}`),
      internal: {
        type: 'Shop',
        contentDigest: createContentDigest(shop),
      },
    };
    actions.createNode(node);
  });

  const cityResult = await axios.get(
    `${process.env.JSON_DATASOURCE_URL}/city.json`
  );
  cityResult.data.forEach(city => {
    const node = {
      ...city,
      // Needs to be global unique
      id: createNodeId(`city-${city.name}`),
      internal: {
        type: 'City',
        contentDigest: createContentDigest(city),
      },
    };
    actions.createNode(node);
  });

  const dailyReportResult = await axios.get(
    `${process.env.JSON_DATASOURCE_URL}/dailyReport.json`
  );
  const dailyReportData = dailyReportResult.data;
  actions.createNode({
    ...dailyReportData,
    // Needs to be global unique
    id: createNodeId(`dailyReport-${dailyReportData.updatedAt}`),
    internal: {
      type: 'DailyReport',
      contentDigest: createContentDigest(dailyReportData),
    },
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const shopDataResult = await graphql(`
    query {
      allShop {
        edges {
          node {
            shopId
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

  if (shopDataResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const shopTemplate = path.resolve(`src/templates/ShopView.js`);

  shopDataResult.data.allShop.edges.forEach(edge => {
    const shop = edge.node;
    actions.createPage({
      path: `/shops/${slug(shop.shopId)}/`,
      component: slash(shopTemplate),
      context: {
        shop,
      },
    });
  });
};
