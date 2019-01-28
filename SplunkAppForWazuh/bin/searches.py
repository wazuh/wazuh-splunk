import controllers.module as module
import splunk, splunk.search, splunk.util, splunk.entity
import lib.util as util
import lib.i18n as i18n
import math
import cgi
import time
from log import log

MAX_MULTI_VALUE_COUNT = 50

class CustomResultsTable(module.ModuleHandler):
    def __init__(self):
        try:
            """Constructor."""
            self.logger = log()
        except Exception as e:
            self.logger.error("Error in searches module constructor: %s" % (e))

    
    def _search_for_last_updated_issue(self, search):
        try:
            self.logger.info('SEARCHING')
            search = splunk.search.dispatch(search)
            while not search.isDone:
                time.sleep(0.5) #sleep for a while
            self.logger.info('returning SID %s ' % (search.sid))
        except Exception as e:
            self.logger.error('Error %s ' % (e))
            raise e
        return search.sid
    
    def generateResults(self, search, count=1000,
        offset=0, entity_name='results'):
        sid = self._search_for_last_updated_issue(search)
        count = max(int(count), 0)
        offset = max(int(offset), 0)
        if not sid:
            raise Exception('CustomResultsTable.generateResults - sid not passed!')
        try:
            job = splunk.search.getJob(sid)
        except splunk.ResourceNotFound, e:
            self.logger.error('CustomResultsTable could not find the job %s. Exception: %s' % (sid, e))
            return ('<p class="resultStatusMessage">The job appears to have expired or has been canceled.</p>')
        
        output = []
        output.append('<div class="CustomResultsTableWrapper">')
        output.append('<table class="CustomResultsTable splTable">')

        fieldNames = [x for x in getattr(job, entity_name).fieldOrder if (not x.startswith('_'))]
        
        offset_start = offset
        if offset < 0 and count < abs(offset):
            offset_start = -count
        
        dataset = getattr(job, entity_name)[offset_start: offset+count]
        
        for i, result in enumerate(dataset):
            for field in fieldNames:
                output.append('<td')
                fieldValues = result.get(field, None)
                if fieldValues:
                    renderedValues = [cgi.escape(x.value) for x in fieldValues[:MAX_MULTI_VALUE_COUNT]]
                    output.append('>%s</td>' % "".join(renderedValues))
                else:
                    output.append('></td>')
                
            output.append('</tr>')
        output.append('</table></div>')

        if (entity_name == 'results' and job.resultCount == 0):
            if job.isDone:
                output = self.generateStatusMessage(entity_name, 'nodata', job.id)
            else:
                output = self.generateStatusMessage(entity_name, 'waiting', job.id)
        else:
            output = ''.join(output)
        self.logger.info('DONE!! ---> %s ' % (output))
        return output