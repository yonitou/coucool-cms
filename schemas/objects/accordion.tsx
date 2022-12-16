import {defineField, defineType} from 'sanity'
import {StackIcon} from '@sanity/icons'
import '../../styles/accordion.css'
import blockEditor from '../blockEditor'

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
          ...blockEditor,
        },
      ],
    }),
  ],
})
