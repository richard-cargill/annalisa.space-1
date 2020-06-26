/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('Failed to query MDX files', result.errors);
  }

  const projects = result.data.allMdx.nodes;

  projects.forEach((project) => {
    actions.createPage({
      path: project.frontmatter.slug,
      component: require.resolve('./src/templates/project.js'),
      context: {
        slug: `/projects/${project.frontmatter.slug}/`,
      },
    });
  });
};
