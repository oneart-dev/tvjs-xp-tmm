
const ConcatSource = require('webpack-sources').ConcatSource

const DEF =
    `
    if (!root['trading-vue-js-tmm']) {
        root['trading-vue-js-tmm'] = root['TradingVueJs']
    }
    if (!root['vue']) {
        root['vue'] = root['Vue']
    }`

module.exports = class TvjsRef {
    constructor() { }
    apply(compiler) {
        compiler.hooks.compilation.tap("OutputEdit", compilation => {
            compilation.hooks.processAssets.tap(
                {
                    name: "OutputEdit",
                },
                () => {
                    for (const chunk of compilation.chunks) {

                        for (const file of chunk.files) {

                            compilation.updateAsset(
                                file,
                                old => new ConcatSource(old.source().replace(
                                    '(root, factory) {',
                                    '(root, factory) {' + DEF,
                                ))
                            );
                        }
                    }
                }
            );
        });
    }
}
