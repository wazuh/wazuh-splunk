import sys
import json
import urllib
import urllib2


def request(method, url, data, headers):
    """Helper function to fetch JSON data from the given URL"""
    req = urllib2.Request(url, data, headers)
    req.get_method = lambda: method
    res = urllib2.urlopen(req)
    return json.loads(res.read())


payload = json.loads(sys.stdin.read())

config = payload.get('configuration', dict())
collection = config.get('collection')
record_name = config.get('name')
field = config.get('field')
value = config.get('value')

# Build the URL for the Splunkd REST endpoint
url_tmpl = '%(server_uri)s/servicesNS/%(owner)s/%(app)s/storage/collections/data/%(collection)s/%(name)s?output_mode=json'
record_url = url_tmpl % dict(
    server_uri=payload.get('server_uri'),
    owner='nobody',
    app=urllib.quote(config.get(
        'app') if 'app' in config else payload.get('app')),
    collection=urllib.quote(collection),
    name=urllib.quote(record_name))
print >>sys.stderr, 'DEBUG Built kvstore record url=%s' % record_url
headers = {
    'Authorization': 'Splunk %s' % payload.get('session_key'),
    'Content-Type': 'application/json'}

# Fetch the record from the kvstore collection
try:
    record = request('GET', record_url, None, headers)
    print >>sys.stderr, "DEBUG Retrieved record:", json.dumps(record)
except urllib2.HTTPError, e:
    print >>sys.stderr, 'ERROR Failed to fetch record at url=%s. Server response: %s' % (
        record_url, json.dumps(json.loads(e.read())))
    sys.exit(2)

# Update the record with the user supplied field value
data = {field: value}
record.update(data)

print >>sys.stderr, 'INFO Updating kvstore record=%s in collection=%s with data=%s' % (
    record_name, collection, json.dumps(data))

# Send the updated record to the server
try:
    response = request('POST', record_url, json.dumps(record), headers)
    print >>sys.stderr, 'DEBUG server response:', json.dumps(response)
except urllib2.HTTPError, e:
    print >>sys.stderr, 'ERROR Failed to update record:', json.dumps(
        json.loads(e.read()))
    sys.exit(3)
