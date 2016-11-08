grunt.initConfig({
  // do not store credentials in the git repo, store them separately and read from a secret file
  secret: grunt.file.readJSON('secret.json'),
  environments: {
      options: {
        local_path: 'dist',
        current_symlink: 'current',
        deploy_path: '/full/path'
      },
      staging: {
          options: {
              host: '<%= secret.staging.host %>',
              username: '<%= secret.staging.username %>',
              password: '<%= secret.staging.password %>',
              port: '<%= secret.staging.port %>',
              debug: true,
              releases_to_keep: '3'
          }
      },
      production: {
          options: {
              host: '<%= secret.production.host %>',
              username: '<%= secret.production.username %>',
              password: '<%= secret.production.password %>',
              port: '<%= secret.production.port %>',
              releases_to_keep: '5',
              release_subdir: 'myapp'
          }
      }
  }
});