import {DocumentIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import {validateSlug} from '../../utils/validateSlug'
import {GROUPS} from '../../constants'

export const blogPostType = defineField({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      group: 'editorial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      group: 'editorial',
      type: 'slug',
      options: {source: 'title'},
      validation: validateSlug,
    }),
    defineField({
      name: 'excerpt',
      group: 'editorial',
      type: 'text',
      rows: 3,
      description: 'Short description for blog listing and SEO',
    }),
    defineField({
      name: 'publishedAt',
      group: 'editorial',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      group: 'editorial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      group: 'editorial',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      group: 'editorial',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'body',
      group: 'editorial',
      type: 'portableText',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare({title, author, media, publishedAt}) {
      return {
        title: `${title} - ${author}`,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : 'No publishing date',
        media,
      }
    },
  },
})
