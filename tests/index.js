const chai = require('chai')
const needle = require('needle')

chai.should()

const s_url = 'http://localhost:8000/en-US/custom/SplunkAppForWazuh/manager'

describe('manager-api', () => {
  it('GET /check_connection', async () => {
    try {
      const res = await needle(`get`, `${s_url}/check_connection?user=foo&pass=bar&ip=http://localhost&port=55000`)
      const resBodyJson = JSON.parse(res.body)
      //Check status
      res.statusCode.should.be.a('number') 
      res.statusCode.should.equal(200)
      //Check body
      resBodyJson.should.be.a('object')    
      resBodyJson.error.should.be.a('number')
      resBodyJson.error.should.equal(0)
      resBodyJson.data.should.be.a('string')
    }catch(error){
      console.log('eeee ',error)
      const resErrMsg = JSON.parse(error.message)
      console.log("error", resErrMsg)
      //TODO check the status code that the error returns
      //resErrMsg.should.be.a('object')
      //error.status.should.equal('400')
    }
  })
  
  it('GET /get_apis', async () => {
    try {
      const res = await needle(`get`, `${s_url}/get_apis`)
      const resBodyJson = JSON.parse(res.body)
      //Check status
      res.statusCode.should.be.a('number')
      res.statusCode.should.equal(200)
      resBodyJson.should.be.a('array')
      //Check body
      resBodyJson.forEach(api => {
        api.filterName.should.be.a('string')
        api.passapi.should.be.a('string')
        api.portapi.should.be.a('string')
        api.filterType.should.be.a('string')
        api.id.should.be.a('string')
        api.url.should.be.a('string')
        api.userapi.should.be.a('string')
      })   
    } catch (error) {
      return Promise.reject(error)
    }
  })
  
  it('GET /get_api with correct id', async () => {
    try {
      const res = await needle(`get`, `${s_url}/get_api?id=d0b6a9ce-341c-4758-9590-4caeb44d7163`)
      const resBodyJson = JSON.parse(res.body)
      //Check status
      res.statusCode.should.be.a('number')
      res.statusCode.should.equal(200)
      //Check body
      resBodyJson.should.be.a('array')
      chai.expect(resBodyJson).to.have.lengthOf(1);
      resBodyJson[0].managerName.should.be.a('string')
      resBodyJson[0].filterType.should.be.a('string')
      resBodyJson[0].portapi.should.be.a('string')
      resBodyJson[0].passapi.should.be.a('string')
      resBodyJson[0].userapi.should.be.a('string')
      resBodyJson[0].filterName.should.be.a('string')
      resBodyJson[0].id.should.be.a('string')
      resBodyJson[0].url.should.be.a('string')        
    } catch (error) { 
      error = error.actual
      return Promise.reject(error)
    }
  })
  
  it('GET /get_api with unexisted id', async () => {
    try {
      const res = await needle(`get`, `${s_url}/get_api?id=id_not_valid`)
      const resBodyJson = JSON.parse(res.body)
      //Check status
      res.statusCode.should.be.a('number')
      res.statusCode.should.equal(200)
      //Check body
      resBodyJson.should.be.a('array')
      chai.expect(resBodyJson).to.have.lengthOf(0);      
    } catch (error) { 
      error = error.actual
      return Promise.reject(error)
    }
  })

  it('GET /get_api without id param', async () => {
    try {
      const res = await needle(`get`, `${s_url}/get_api`)
      const resBodyJson = JSON.parse(res.body)
      //Check status
      res.statusCode.should.be.a('number')
      res.statusCode.should.equal(200)
      //Force the error using lengthOf(1) because don´t recieve any api
      chai.expect(resBodyJson).to.have.lengthOf(1); 
    } catch (error) { 
      error = error.actual
      error.error.should.be.a('string')
      error.error.should.equal('Missing ID.')
    }
  })
  
})




//- Test unitarios de splunk con mocha y chai