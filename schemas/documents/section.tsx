import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineType, defineField, SortOrdering} from 'sanity'
import blockEditor from '../blockEditor'

export default defineType({
  name: 'section',
  type: 'document',
  orderings: [orderRankOrdering as SortOrdering],
  title: 'Section',
  fields: [
    orderRankField({type: 'section'}),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nom',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 50,
      },
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Contenu',
      of: [
        {
          type: 'block',
          ...blockEditor,
        },
        defineField({
          name: 'accordion',
          title: 'Accordéon',
          type: 'accordion',
        }),
        defineField({
          name: 'edition',
          title: 'Ancienne édition',
          type: 'edition',
        }),
      ],
    }),
  ],
})
