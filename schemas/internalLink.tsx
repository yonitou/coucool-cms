import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const InternalLinkRender = ({children}: {children: JSX.Element}) => (
  <span>
    {children} &nbsp;
    <LinkIcon />
  </span>
)

export default defineType({
  name: 'internalLink',
  type: 'object',
  title: 'Lien interne',
  icon: () => <LinkIcon />,
  fields: [
    defineField({
      name: 'reference',
      type: 'reference',
      title: 'Section',
      validation: (Rule) => Rule.required(),
      to: [
        {
          type: 'section',
        },
      ],
    }),
  ],
  blockEditor: {
    render: InternalLinkRender,
  },
})
