
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-rsync");
    grunt.initConfig({
        // do not store credentials in the git repo, store them separately and read from a secret file 
        secret: grunt.file.readJSON('secret.json'),

        rsync: {
            options: {
                args: ["--verbose"],
                exclude: [".git*","*.scss","node_modules"],
                recursive: true
            },
            dist: {
                options: {
                    src: "./_site",
                    dest: "/var/www/henryayres.co.uk"
                }
            },
            stage: {
                options: {
                    src: "../dist/",
                    dest: "/var/www/site",
                    host: "user@staging-host",
                    delete: true // Careful this option could cause data loss, read the docs!
                }
            },
            prod: {
                options: {
                    src: "_site",
                    dest: "/var/www/henryayres.co.uk",
                    host: "hayres@henryayres.co.uk",
                    delete: true // Careful this option could cause data loss, read the docs!
                }
            }
        }
    
        
    });
    
}

