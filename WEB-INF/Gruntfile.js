module.exports = function(grunt) {
    // 配置
    //require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //清除目录
        clean: {
            // js: ['js/'],
            // css: 'css/',
        },
        concat: {
            // css: {
            //     src: 'dev/css/include/*.css', // ['dev/css/css.css', 'dev/css/base.css'],
            //     dest: 'dev/css/website.css'
            // },
            js: {
                src: ['dev/js/include/*.js'],
                dest: 'dev/js/website.js'
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-yy") %> by mark */\n'
            },
            css: {
               files: [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['*.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            options: {
               // banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-yy") %> by mark */\n',
                sourceMap: false,
                compress:{
                    global_defs:{
                        "DEBUG":false
                    },
                    dead_code:true
                }
            },
            build: {
                // 动态文件映射，
                // 当任务运行时会自动在 "src/bin/" 目录下查找 "**/*.js" 并构建文件映射，
                // 添加或删除文件时不需要更新 Gruntfile。
                files: [{
                    expand: true, // 启用动态扩展
                    cwd: 'dev/js/', // 源文件匹配都相对此目录
                    src: ['*.js'], // 匹配模式
                    dest: 'js/', // 目标路径前缀
                    ext: '.min.js', // 目标文件路径中文件的扩展名
                    extDot: 'last' // 扩展名始于文件名的第一个点号
                }]
            }
        },
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['index.html']
            }
        },
        less: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'dev/less/',
                    src: ['*.less'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['dev/css/include/*.css','dev/css/*.css','dev/js/include/*.js','dev/js/*.js'],
                tasks: ['default'],
                options: {
                    spawn: false,
                }
            },
        },
        jshint:{
            build:['dev/js/*.js'],
            options:{
                jshintrc:'.jshintrc',
                mangle:false
            }
        }

    });
    //载入concat和uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //注册任务
    grunt.registerTask('buildcss', ['less']);
    grunt.registerTask('jiance', ['watch']);
    grunt.registerTask('jiancha', ['htmlhint']);
    grunt.registerTask('hebing', ['concat']);
    grunt.registerTask('yasuocss', ['cssmin']);
    grunt.registerTask('yasuojs', ['uglify']);
    grunt.registerTask('default', ['concat', 'cssmin','uglify']);

};
