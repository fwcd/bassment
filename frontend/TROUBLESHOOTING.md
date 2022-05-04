# Troubleshooting

Common issues and their fixes.

## Webpack errors with "Module parse failed: Unexpected token"

If Webpack (e.g. as run with `npm run web`) issues an error similar to the following:

```
ERROR in ../node_modules/react-native-vector-icons/lib/create-icon-set.js 91:8

Module parse failed: Unexpected token (91:8)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| 
|       return (
>         <Text selectable={false} {...props}>
|           {glyph}
|           {children}
```

...the issue is usually that the `babel-loader` which Webpack uses to compile all JS and TS sources does not include a particular library, in this case `react-native-vector-icons`. The solution is to add the library to the loader configuration in `webpack.config.js`:

```diff
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [
          path.resolve(rootDir, 'app.json'),
          path.resolve(rootDir, 'App.tsx'),
          path.resolve(rootDir, 'src'),
+         path.resolve(rootDir, 'node_modules', 'react-native-vector-icons'),
        ],
        use: {
          loader: 'babel-loader',
          options: { ... },
        },
      },
      ...
    ]
  }
  ...
}
```

> Note that you may need to recompile with `npm run web` afterwards.
