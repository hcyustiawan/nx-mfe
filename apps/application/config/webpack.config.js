const nrwlConfig = require('@nrwl/react/plugins/webpack');

// came together with @nrwl/react/plugins/webpack as dependencies
const { ModuleFederationPlugin } = require('webpack').container
const { merge } = require('webpack-merge')

const packageJson = require('../../../package.json')

const federatedModuleName = 'application'


module.exports = (config) => {
    nrwlConfig(config)
    const moduleFederationConfig = {
        output: {
            /**
             * since there is only 1 package.json outputted chunk for development might clash 
             * thus, need to specify the uniqueName.
             **/
            uniqueName: federatedModuleName,
            // https://webpack.js.org/guides/public-path/#automatic-publicpath
            publicPath: 'auto',
        },
        plugins: [
            new ModuleFederationPlugin({
                name: federatedModuleName,
                filename: 'remoteEntry.js',
                exposes: {
                    './ApplicationApp': './src/app/bootstrap'
                },
                shared: packageJson.dependencies
            })
        ]
    }

    // only applied to the apps not container, since the container consumes the remoteEntry.js
    const runTimeChunkOptimisation = {
        // known issue with module federation
        // https://github.com/webpack/webpack/issues/11691
        // https://github.com/webpack/webpack/pull/11843
        // potentially solved with https://github.com/module-federation/concat-runtime
        optimization: {
            runtimeChunk: false
        },
    }
    const mergedConfig = merge(config, moduleFederationConfig, runTimeChunkOptimisation)
    console.log(mergedConfig)
    return mergedConfig
}