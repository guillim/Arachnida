this.AdminConfig = {
  name: Config.name,
  collections: {
    Crawlers: {
      color: 'blue',
      tableColumns: [
        {
          label: 'Status',
          name: 'status'
        },
        {
          label: 'Title',
          name: 'title'
        }
      ]
    },
    Starturls: {
      color: 'yellow',
      tableColumns: [
        {
          label: 'Url',
          name: 'URL'
        },
        {
          label: 'crawler',
          name: 'crawlerID'
        }
      ]
    },
    Resulturls: {
      color: 'green',
      tableColumns: [
        {
          label: 'Url',
          name: 'URL_crawled'
        },
        {
          label: 'crawler',
          name: 'crawlerID'
        },
        {
          label: 'result',
          name: 'result'
        }
      ]
    }
  },
  dashboard: {
    homeUrl: '/dashboard'
  },
  autoForm: {
    omitFields: ['createdAt', 'updatedAt']
  }
};
