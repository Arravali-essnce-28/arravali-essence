import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { mockBlogPosts, mockCategories } from '../data/mockBlogPosts'

export const client = createClient({
  projectId: 'g0zp1tdb',
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-02-26', // use a UTC date string
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  // If source has a _ref property, it's a Sanity asset
  if (source && typeof source === 'object' && '_ref' in source) {
    return builder.image(source);
  }
  // If source has a url property, it's a regular URL
  if (source && typeof source === 'object' && 'url' in source) {
    return source.url;
  }
  // Fallback for string URLs
  if (typeof source === 'string') {
    return source;
  }
  // Fallback for other cases
  return '';
}

export async function getBlogPosts() {
  try {
    const query = `*[_type == "blogPost"] | order(publishedAt desc) {
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      mainImage,
      categories,
      body
    }`
    
    const posts = await client.fetch(query)
    return posts.length > 0 ? posts : mockBlogPosts
  } catch (error) {
    console.warn('Sanity client failed, using mock data:', error)
    return mockBlogPosts
  }
}

export async function getBlogPost(slug: string) {
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      mainImage,
      categories,
      body
    }`
    
    const post = await client.fetch(query, { slug })
    return post || mockBlogPosts.find(p => p.slug.current === slug)
  } catch (error) {
    console.warn('Sanity client failed, using mock data:', error)
    return mockBlogPosts.find(p => p.slug.current === slug)
  }
}

export async function getBlogCategories() {
  try {
    const query = `*[_type == "blogPost"] {
      categories[]
    }`
    
    const posts = await client.fetch(query)
    const allCategories = posts.flatMap((post: any) => post.categories)
    return [...new Set(allCategories)] // Remove duplicates
  } catch (error) {
    console.warn('Sanity client failed, using mock data:', error)
    return mockCategories
  }
}
