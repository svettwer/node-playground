const fastify = require('fastify')({ logger: true })

fastify.get('/hello', async () => {
    return "hello"
})

fastify.get('/greeting/:name', async (request, _) => {
    return `hello ${request.params.name} from ${process.env.HOSTNAME || "unknown"}`;
})

fastify.get("/lastletter/:name", async (request, _) => {
    return request.params.name.slice(-1)
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(8080)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();