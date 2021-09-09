export default {
    modules: ['bootstrap-vue/nuxt'],
    components: {
        dirs: [
          '~/components'
        ]
    },
    extend (config, ctx) {
        config.resolve.symlinks = false
    },
    css: [
        '~assets/css/main.css'
    ]
}
