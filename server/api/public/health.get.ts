export default defineEventHandler(async (event) => {
  console.log('Health check invoked at', new Date().toISOString())
  
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown'
  }
})
