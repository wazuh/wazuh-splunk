const chai = require('chai')// eslint-disable-line
const needle = require('needle')// eslint-disable-line
chai.should()
const url = process.env.ofuscateurl || ''
const s_url = `${url}/custom/SplunkAppForWazuh/api/ofuscate_test`
const hide = '********'
const responses = require('./external_files/jsonOfuscatedResponses.js')
describe('get_request_to_api', () => {

  it('Checks that cluster config is returned whith an ofuscated key', async () => {
    const payload = responses.clus_conf
    const pay = JSON.stringify(payload)
    const res = await needle('post', s_url, pay, {})
    const resBodyJson = JSON.parse(res.body)
    resBodyJson.data.key.should.equal(hide)
  })

  it('Checks that wmodlues are returned whith an ofuscated key', async () => {
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
  it('Checks that integrations are returned whith an ofuscated key', async () => {
    const payload = responses.integrations
    const pay = JSON.stringify(payload)
    const res = await needle('post', s_url, pay, {})
    const resBodyJson = JSON.parse(res.body)
    resBodyJson.data.integration.map(item => (item.api_key.should.equal(hide)));
  })

})
