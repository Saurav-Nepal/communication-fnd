import { dirname, join } from 'path';

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').default;
const path = require('path');
const fg = require('fast-glob');
const argv = require('yargs').argv;

const getPath = (storyPath) =>
    path.resolve(process.cwd(), storyPath).replace(/\\/g, '/');
const getGlobPaths = (paths) =>
    paths.reduce((acc, path) => [...acc, ...fg.sync(path)], []);

function getStoryPaths(fileName = '*') {
    return getGlobPaths([
        getPath(`./${fileName}.mdx`),
        getPath(`packages/*/src/**/${fileName}.story.@(ts|tsx)`),
        getPath(`packages/*/src/**/${fileName}.mdx`),
        getPath(`apps/**/${fileName}.mdx`),
        getPath(`apps/**/${fileName}.story.@(ts|tsx)`),
    ]);
}

const storiesPath = !argv._[1]
    ? [...getStoryPaths()]
    : [...getStoryPaths(argv._[1]), ...getStoryPaths(`${argv._[1]}.demos`)];

module.exports = {
    stories: storiesPath,

    addons: [
        getAbsolutePath('storybook-dark-mode'),
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false, // 👈 disable the backgrounds addon
                measure: false,
                outline: false,
            },
        },
        getAbsolutePath('@storybook/addon-interactions'),
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    {
                        test: /\.scss$/,
                        sideEffects: true,
                        use: [
                            'style-loader',
                            'css-loader',
                            {
                                // Gets options from `postcss.config.js` in your project root
                                loader: 'postcss-loader',
                                options: {
                                    implementation: require.resolve('postcss'),
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ],

    framework: {
        name: getAbsolutePath('@storybook/react-webpack5'),
        options: {},
    },

    webpackFinal: async (config) => {
        config.resolve = {
            ...config.resolve,
            plugins: [
                ...(config.resolve.plugins || []),
                new TsconfigPathsPlugin({
                    extensions: ['.ts', '.tsx', '.js'],
                    configFile: path.join(__dirname, '../tsconfig.json'),
                }),
            ],
        };

        // Turn off docgen plugin as it breaks bundle with displayName
        // config.plugins.pop();

        return config;
    },

    docs: {
        autodocs: true,
        defaultName: 'Overview',
    },

    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            savePropValueAsString: true,
            propFilter: (prop) => {
                if (!prop.parent) return true;
                if (/node_modules/.test(prop.parent.fileName)) {
                    return !(
                        prop.parent.name === 'AnchorHTMLAttributes' ||
                        prop.parent.name === 'AriaAttributes' ||
                        prop.parent.name === 'ButtonHTMLAttributes' ||
                        prop.parent.name === 'DOMAttributes' ||
                        prop.parent.name === 'FormHTMLAttributes' ||
                        prop.parent.name === 'HTMLAttributes' ||
                        prop.parent.name === 'ImgHTMLAttributes' ||
                        prop.parent.name === 'InputHTMLAttributes'
                    );
                }
                return true;
            },
        },
    },
};

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}
