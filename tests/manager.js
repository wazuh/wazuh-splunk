const chai = require('chai')
const needle = require('needle')

chai.should()
chai.use(require('chai-match'));

const s_url = 'http://localhost:8000/en-US/custom/SplunkAppForWazuh/manager'

describe('manager-api', () => {
  it('GET /check_connection => "SUCCESFULLY"', async () => {
    const params = {
      user: 'foo',
      pass: 'bar',
      ip: 'http://localhost',
      port: 55000
    }
    const res = await needle(`get`, `${s_url}/check_connection`, params, {})
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

  it('GET /check_connection => "ERROR"', async () => {
    const params = {
      user: 'bad_user',
      pass: 'bad_pass',
      ip: 'http://bad_url',
      port: 12345
    }
    const res = await needle(`get`, `${s_url}/check_connection`, params, {})
    const resBodyJson = JSON.parse(res.body)
    //Check status
    res.statusCode.should.be.a('number') 
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.status.should.be.a('string')
    resBodyJson.status.should.equal('400')
    resBodyJson.error.should.be.a('string')
  })
  
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
    const params = { id: '2cc42206-bbe9-416c-a95f-7a4e46c445a5' }
    const res = await needle(`get`, `${s_url}/get_api`, params, {})
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
    const params = { id: '2cc42206-bbe9-bad-id-api' }
    const res = await needle(`get`, `${s_url}/get_api`, params, {})
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
  
  it ('POST /remove_api => "SUCCESFULLY"', async () => {
    const payload = { 'id[id]':'9cef9c0a-3aa1-4b70-84de-f92f63a3f317' }
    const res = await needle(`post`, `${s_url}/remove_api`, payload, {})
    resBodyJson = JSON.parse(res.body)
    //Check status
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.should.be.a('object')
    resBodyJson.data.should.be.a('string')
    resBodyJson.data.should.be.equal('success')
  })
  
  it ('POST /update_api => "SUCCESFULLY"', async () => {
    const payload = {
      'newRegister[id]':'723e583e-3d1f-46c8-bea6-606479769947',
      'newRegister[url]':'http://test',
      'newRegister[portapi]':'2529',
      'newRegister[userapi]':'user',
      'newRegister[passapi]':'pass',
      'newRegister[filterName]':'test.filter.name',
      'newRegister[filterType]':'test.filter.type',
      'newRegister[managerName]':'test.manager.name'
    }
    const res = await needle(`post`, `${s_url}/update_api`, payload, {})
    resBodyJson = JSON.parse(res.body)
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.should.be.a('object')
    resBodyJson.data.should.be.a('string')
    resBodyJson.data.should.be.equal('success')
  })
  
  it ('POST /update_api => "MISSING ANY ARGUMENT"', async () => {
    const payload = {
      'newRegister[id]':'723e583e-3d1f-46c8-bea6-606479769947',
      'newRegister[url]':'http://test',
      'newRegister[portapi]':'2529',
      'newRegister[filterName]':'test.filter.name',
      'newRegister[filterType]':'test.filter.type',
      'newRegister[managerName]':'test.manager.name'
    }
    const res = await needle(`post`, `${s_url}/update_api`, payload, {})
    resBodyJson = JSON.parse(res.body)
    //Check status
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.should.be.a('object')  
    resBodyJson.error.should.be.a('string')
    chai.expect(resBodyJson.error).to.match(/^Invalid arguments, missing params :/)
  })  
  
  it ('GET /get_log_lines => "SUCCESFULLY"', async () => {
    const res = await needle(`get`, `${s_url}/get_log_lines`)
    resBodyJson = JSON.parse(res.body)
    //Check status
    res.statusCode.should.be.a('number')
    res.statusCode.should.equal(200)
    //Check body
    resBodyJson.should.be.a('object') 
    resBodyJson.logs.should.be.a('array') 
    resBodyJson.logs.forEach(log => {
      log = JSON.parse(log)
      log.should.be.a('object')
      log.date.should.be.a('string')
      log.level.should.be.a('string')
      log.message.should.be.a('string')     
    })
  }) 
})