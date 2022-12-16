import {LaunchIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'externalLink',
  type: 'object',
  title: 'Lien externe',
  icon: () => <LaunchIcon />,
  fields: [
    {
      name: 'href',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['https', 'http', 'mailto'],
        }),
      type: 'url',
      title: 'URL',
      description:
        "Si vous voulez que le lien redirige vers un envoi d'email à une adresse mail, il faut l'écrire comme ceci : mailto:eros@cou.cool",
    },
    {
      title: 'Ouvrir dans un nouvel onglet',
      name: 'blank',
      type: 'boolean',
      initialValue: true,
    },
  ],
})