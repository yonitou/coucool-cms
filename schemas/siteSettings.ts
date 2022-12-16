import {ArrowRightIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eventLink',
      title: "Lien vers l'évènement",
      type: 'url',
      validation: (Rule) => Rule.required().uri(),
    },
    {
      name: 'facebook',
      title: 'Lien vers la page Facebook',
      type: 'url',
      validation: (Rule) => Rule.required().uri(),
    },
    {
      name: 'instagram',
      title: 'Lien vers la page Instagram',
      type: 'url',
      validation: (Rule) => Rule.required().uri(),
    },
    defineField({
      name: 'content',
      type: 'array',
      title: 'Sous-titre',
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
            {
              title: 'H5',
              value: 'h5',
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
