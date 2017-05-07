import app from './app'

const port = process.env.PORT || 3000;

(async() => {
  try {
    const server = await app.listen(port)
    console.info(`server started at port: ${port}`)
  } catch (err){
    console.log(err)
  }
})();
