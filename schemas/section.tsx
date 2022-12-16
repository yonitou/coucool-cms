import {ArrowRightIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineType, defineField, SortOrdering} from 'sanity'

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
          marks: {
            annotations: [
              {
                name: 'internalLink',
                type: 'internalLink',
              },
              {
                name: 'externalLink',
                type: 'externalLink',
              },
            ],
          },
          styles: [
            {
              title: 'Normal',
              value: 'normal',
            },
            {
              title: 'H3',
              value: 'h3',
            },
          ],
          lists: [
            {
              title: 'Puces',
              value: 'bullet',
            },
            {
              title: 'Numéros',
              value: 'number',
            },
            {
              title: 'Fléchée',
              value: 'arrow',
              blockEditor: {
                icon: ArrowRightIcon,
              },
            },
          ],
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
