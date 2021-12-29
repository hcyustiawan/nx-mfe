const nrwlConfig = require('@nrwl/react/plugins/webpack');

// came together with @nrwl/react/plugins/webpack as dependencies
const { ModuleFederationPlugin } = require('webpack').container

const { merge } = require('webpack-merge')
const packageJson = require('../../../package.json')

const federatedModuleName = 'container'
module.exports = (config, context) => {
    nrwlConfig(config)
    const moduleFederationConfig = {
        output: {
            /**
             * since there is only 1 package.json outputted chunk for development might clash 
             * thus, need to specify the uniqueName.
             * 
             * NOTE: uniqueName can be better if it can be generated or grabbed from some config files
             * (get from package.json when using NX + Yarn workspaces)
             **/
            uniqueName: federatedModuleName,
            // https://webpack.js.org/guides/public-path/#automatic-publicpath
            publicPath: 'auto',
        },
        plugins: [
            new ModuleFederationPlugin({
                name: federatedModuleName,
                remotes: {
                    'application': 'application@http://localhost:4201/remoteEntry.js'
                },
                shared: packageJson.dependencies
            })
        ]
    }
    const mergedConfig = merge(config, moduleFederationConfig)
    console.log(mergedConfig);

    return mergedConfig
}