const Promise = require('bluebird')
const contentfulSchema = require('./contentful/export.json')
const path = require('path')
const graphql = require('graphql')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPages = new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })

  const faqPages = new Promise((resolve, reject) => {
    const faq = path.resolve('./src/pages/faq.js')
    resolve(
      graphql(
        `
          {
            allContentfulContentCategories {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const categories = result.data.allContentfulContentCategories.edges
        categories.forEach((category, index) => {
          createPage({
            path: `/faq/${category.node.slug}/`,
            component: faq,
            context: {
              slug: category.node.slug
            },
          })
        })
      })
    )
  })


  return Promise.all([blogPages, faqPages])
}
