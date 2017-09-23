module.exports = {

  entry: {
    FormCheck: "./js/Form.js"
  },
  output: {
    filename: "public/formcheck.js",
    library: 'formCheck'
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules)/,
        loader: "babel-loader"
      }
    ]
  }

};
