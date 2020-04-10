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
  const siteConfigResult = await axios.get(
    `${process.env.JSON_DATASOURCE_URL}/site-config.json`
  );
  const siteConfigData = siteConfigResult.data;
  actions.createNode({
    ...siteConfigData,
    id: createNodeId(`siteConfig`),
    internal: {
      type: 'SiteConfig',
      contentDigest: createContentDigest(siteConfigData),
    },
  });

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

  const hospitalResult = await axios.get(
    `${process.env.JSON_DATASOURCE_URL}/hospital.json`
  );
  hospitalResult.data.forEach(hos => {
    const node = {
      ...hos,
      hospitalId: `${hos.id}`,
      // Needs to be global unique
      id: createNodeId(`hospital-${hos.id}`),
      internal: {
        type: 'Hospital',
        contentDigest: createContentDigest(hos),
      },
    };
    actions.createNode(node);
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
  const pageData = await graphql(`
    query {
      siteConfig {
        path {
          shop
          hospital
          etc
        }
        hospital {
          equipments {
            id
            name
          }
        }
      }

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

      allHospital {
        edges {
          node {
            hospitalId
            name
            contact {
              address
              phone
              facebook
              website
            }
            donate {
              needs {
                id
              }
              by {
                type
                title
                infos
                bank {
                  id
                  branch
                  account
                }
              }
            }
          }
        }
      }
    }
  `);

  if (pageData.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const shopTemplate = path.resolve(`src/templates/ShopView.js`);

  pageData.data.allShop.edges.forEach(edge => {
    const shop = edge.node;
    actions.createPage({
      path: `/shops/${slug(shop.shopId)}/`,
      component: slash(shopTemplate),
      context: {
        shop,
        siteConfig: pageData.data.siteConfig,
      },
    });
  });

  const hospitalTemplate = path.resolve('src/templates/HospitalView.js');
  pageData.data.allHospital.edges.forEach(edge => {
    const hospital = edge.node;
    actions.createPage({
      path: `/hospitals/${slug(hospital.hospitalId)}/`,
      component: slash(hospitalTemplate),
      context: {
        hospital,
        siteConfig: pageData.data.siteConfig,
      },
    });
  });
};
