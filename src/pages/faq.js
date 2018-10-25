import React from 'react'
import { Link, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './faq.module.css'

class FAQIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const faq = get(this, 'props.data.allContentfulFaq.edges')
    const categories = get(this, 'props.data.allContentfulContentCategories.edges')
    const categorySlug = get(this, 'props.pageContext.slug')
    console.log(this.props)

    return (
      <div className={styles.faqWrapper}>
        <Helmet title={siteTitle} />
        <div className={styles.faqNav}>
          <ul>
            {categories.map(({node}) => {
              return (
                <li className={styles.faqLabel} key={node.slug}>
                  <Link to={`/faq/${node.slug}`}>{node.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.faqContent}>
          <h2 className="section-headline">FAQ</h2>
          <ul className="faq-list">
            {faq.filter(faq =>
              faq.node.categories && faq.node.categories.map(c => c.slug).includes(categorySlug)
            ).map(({ node }) => {
              return (
                <li key={node.slug}>
                  <h2> {node.title} </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.answer.childMarkdownRemark.html,
                    }}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default FAQIndex
export const pageQuery = graphql`
  query {
    allContentfulFaq {
      edges {
        node {
          title
          slug
          answer {
            childMarkdownRemark {
              html
            }
          }
          categories {
            title
            slug
          }
        }
      }
    }
    allContentfulContentCategories{
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
