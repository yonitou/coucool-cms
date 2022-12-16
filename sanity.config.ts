import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {CogIcon, MasterDetailIcon} from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'coucool-cms',

  projectId: '4durckeb',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Paramètres événement')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings'))
              .icon(CogIcon),
            orderableDocumentListDeskItem({
              type: 'section',
              S,
              context,
              title: 'Sections',
              icon: MasterDetailIcon,
            }),
          ])
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
