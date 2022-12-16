import {defineField, defineType} from 'sanity'
import {StackIcon, ArrowRightIcon} from '@sanity/icons'
import '../styles/accordion.css'

export default defineType({
  name: 'accordion',
  title: 'Accordéon',
  type: 'object',
  icon: () => <StackIcon />,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answers',
      type: 'array',
      title: 'Réponses',
      validation: (Rule) => Rule.required(),
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
      ],
    }),
  ],
})
