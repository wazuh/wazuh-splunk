
const chai = require('chai')
const needle = require('needle')

chai.should()

const s_url = 'http://172.16.1.5:8000/en-US/custom/SplunkAppForWazuh/api/ofuscate_test'

const hide = '********'
const responses = require('./external_files/jsonOfuscatedResponses.js')

describe('get_request_to_api', () => {
  
  it ('Check cluster config is returned whith an ofuscated key', async () => {
    const payload = responses.clus_conf
    const pay = JSON.stringify(payload)
    const res = await needle('post', s_url, pay, {})
    const resBodyJson = JSON.parse(res.body)
    resBodyJson.data.key.should.equal(hide)
  })
  
  it ('Check wmodlues are returned whith an ofuscated key', async () => {
    const payload = responses.wmodules
    const pay = JSON.stringify(payload)
    const res = await needle('post', s_url, pay, {})
    const resBodyJson = JSON.parse(res.body)
    resBodyJson.data.wmodules.map(item => {
      if (item['aws-s3'] && item['aws-s3'].buckets) {
        item['aws-s3'].buckets.map(item => {
          item.access_key.should.equal(hide)
          item.secret_key.should.equal(hide)
        });
      }
    })
  })

  it ('Check integrations are returned whith an ofuscated key', async () => {
    const payload = responses.integrations
    const pay = JSON.stringify(payload)
    const res = await needle('post', s_url, pay, {})
    const resBodyJson = JSON.parse(res.body)
    resBodyJson.data.integration.map(item => (item.api_key.should.equal(hide)));
  })
  
})
