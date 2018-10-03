const chai = require('chai')
const needle = require('needle')

chai.should()
chai.use(require('chai-match'));

const s_url = 'http://localhost:8000/en-US/custom/SplunkAppForWazuh/manager'

describe('manager-api', () => {
  it('GET /check_connection => "SUCCESFULLY"', async () => {
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
  })
  
  /*
  it('GET /check_connection error', async () => {
    try {
      const res = await needle(`get`, `${s_url}/check_connection?user=foot&pass=bart&ip=http://localhost&port=44111`)
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
      return Promise.reject(error)
    }//TODO get error 400 in check connection and process it
  })
  */
  it('GET /get_apis => "SUCCESFULLY"', async () => {
    const res = await needle(`get`, `${s_url}/get_apis`)
    const resBodyJson = JSON.parse(res.body)
    //Check status
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.should.be.a('array')
    resBodyJson.forEach(api => {
      api.passapi.should.be.a('string')
      api.portapi.should.be.a('string')
      api.id.should.be.a('string')
      chai.expect(api.id).to.match(/^\w+\-\w+\-\w+\-\w+\-\w+$/)
      api.url.should.be.a('string')
      api.userapi.should.be.a('string')
    })   
  })
  
  it('GET /get_api => "CORRECT ID"', async () => {
    const res = await needle(`get`, `${s_url}/get_api?id=94af3c9c-9c72-4a10-a5c7-574dab714874`)
    const resBodyJson = JSON.parse(res.body) 
    //Check status
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.should.be.a('array')
    chai.expect(resBodyJson).to.have.lengthOf(1);
    resBodyJson[0].portapi.should.be.a('string')
    resBodyJson[0].passapi.should.be.a('string')
    resBodyJson[0].userapi.should.be.a('string')
    resBodyJson[0].id.should.be.a('string')
    chai.expect(resBodyJson[0].id).to.match(/^\w+\-\w+\-\w+\-\w+\-\w+$/)
    resBodyJson[0].url.should.be.a('string')        
  })
  
  it('GET /get_api => "WRONG ID"', async () => {
    const res = await needle(`get`, `${s_url}/get_api?id=id_not_valid`)
    const resBodyJson = JSON.parse(res.body)
    //Check status
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.should.be.a('array')
    chai.expect(resBodyJson).to.have.lengthOf(0);      
  })
  
  it('GET /get_api => "WITHOUT ID"', async () => {
    const res = await needle(`get`, `${s_url}/get_api`)
    const resBodyJson = JSON.parse(res.body)
    //Check status
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    resBodyJson.should.be.a('object')
    resBodyJson.error.should.be.a('string')
    resBodyJson.error.should.equal('Missing ID.')
  })

  it ('POST /add_api => "SUCCESFULLY"', async () => {
    const payload = {
      'payload[url]': 'http://127.0.0.1',
      'payload[portapi]': '55000',
      'payload[userapi]': 'foo',
      'payload[passapi]': 'bar'
    }
    const res = await needle(`post`, `${s_url}/add_api`, payload, {})
    resBodyJson = JSON.parse(res.body)
    //Check status
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.should.be.a('object')
    resBodyJson.result.should.be.a('string')
    chai.expect(resBodyJson.result).to.match(/^\w+\-\w+\-\w+\-\w+\-\w+$/)
  })
  
  it ('POST /add_api => "INVALID NUMBER OF ARGUMENTS"', async () => {
    const payload = {
      'payload[url]': 'http://127.0.0.1',
      'payload[portapi]': '55000'
    }
    const res = await needle(`post`, `${s_url}/add_api`, payload, {})
    resBodyJson = JSON.parse(res.body)
    //Check status
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.should.be.a('object')
    resBodyJson.error.should.be.a('string')
    resBodyJson.error.should.equal('Invalid number of arguments')
  })

  /*it ('POST /add_api => "ERROR"', async () => {
    const payload = {
      'payload[url]': 'http://error.com',
      'payload[portapi]': '55010',
      'payload[userapi]': 'testing',
      'payload[passapi]': 'a_error'
    }
    const res = await needle(`post`, `${s_url}/add_api`, payload, {})
    resBodyJson = JSON.parse(res.body)
    //Check status
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.should.be.a('object')
    resBodyJson.error.should.be.a('string')
  })*/

})