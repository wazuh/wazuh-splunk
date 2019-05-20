# -*- coding: utf-8 -*-
"""
Wazuh app - Report generation backend.

Copyright (C) 2015-2019 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

from . import api
import os
import time
import jsonbak
import datetime
from operator import itemgetter
import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from log import log
import base64
from fpdf import FPDF
import math

class PDF(FPDF):
    def header(self):
        # Add fonts 
        # Note that RobotoThin and RobotoRegular can't be used with 'B'-'I' options
        self.add_font('RobotoThin','', 'Roboto-Thin.ttf',uni=True)
        self.add_font('RobotoRegular','', 'Roboto-Regular.ttf',uni=True)
        # Logo
        self.image('/opt/splunk/etc/apps/SplunkAppForWazuh/appserver/static/css/images/wazuh/png/logo.png', 10, 10, 65, 15)
        self.set_font('RobotoRegular', '', 11)
        self.set_text_color(75, 179, 204)
        #Contact info
        self.set_y(12)
        self.cell(150) #Move to the right
        self.cell(0, 5, 'info@wazuh.com', 0, 0, 'R')
        self.ln() #Break line
        self.cell(150) #Move to the right
        self.cell(0, 5, 'https://wazuh.com', 0, 0, 'R')

    # Page footer
    def footer(self):
        # Position at 1.5 cm from bottom
        self.year = datetime.datetime.now().strftime('%Y')
        self.copyright = unicode('Copyright © ' + self.year + ' Wazuh, Inc.', 'utf-8')
        self.set_y(-15)
        self.set_text_color(75, 179, 204)
        self.set_font('RobotoRegular', '', 7)
        # Page number
        self.cell(100, 10, self.copyright, 0, 0, 'L')
        self.cell(0, 10, 'Page ' + str(self.page_no()) + ' of {nb}', 0, 0, 'R')
        


class report(controllers.BaseController):
    """Report class.

    Handle reporting methods
    """

    def __init__(self):
        """Constructor."""
        try:
            self.logger = log()
            self.path = '/opt/splunk/etc/apps/SplunkAppForWazuh/appserver/static/'
            controllers.BaseController.__init__(self)
            self.miapi = api.api()
        except Exception as e:
            self.logger.error("Error in report module constructor: %s" % (e))

    def save_images(self, images):
        i = 0
        images_saved = []
        while i in range(0, len(images)):
            path = str(self.path+str(images[i]['id'])+'.png')
            f = open(path, 'wb')
            title = str(images[i]['title'])
            width = images[i]['width']
            height = images[i]['height']
            f.write(base64.decodestring(
                images[i]['element'].split(',')[1].encode()))
            f.close()
            image = {'title': title, 'path': path, 'width': width, 'height': height}
            images_saved.append(image)
            i += 1
        return images_saved

    def delete_images(self, images):
        for img in images:
            os.remove(img['path'])


    def getString(self, value,labels={}):
        result = ""
        if type(value) is list:
            for i in value:
                result += str(i) + ", "
            result = result[:len(result)-2]
        elif value or value == 0 or value == " ":
            if value in labels:
                result = labels[value]
            else:
                result = str(value)
        else:
            result = " "

        return result


    def addTableRow(self,key,value,pdf,labels):
        self.setTableRowStyle(pdf)
        fullValue = self.getString(value,labels)
        
        # If value's length is greater than 50, we write 50characters per row
        if len(fullValue) > 50:
            num_lines = ( len(fullValue) / 50 ) + 1
            for i in range(1,num_lines+1):
                tmpValue = fullValue[(i-1)*50:i*50]
                useBorder = ''
                useKey = ''
                if i == num_lines:
                    useBorder = 'B'
                if i == 1:
                    useKey = key
                pdf.cell(2, 4, txt = " " , border = useBorder, ln = 0, align = 'C', fill = False, link = '')
                pdf.cell(100, 4, txt = self.getString(useKey,labels).capitalize() , border = useBorder, ln = 0, align = 'L', fill = False, link = '')
                pdf.cell(0, 4, txt = tmpValue, border = useBorder, ln = 1, align = '', fill = False, link = '')
                if(pdf.get_y() > 250):
                    pdf.add_page()
                    pdf.ln(20)
        else: # if value's length is lower than 50 we write the full string
            pdf.cell(2, 5, txt = " " , border = 'B', ln = 0, align = 'C', fill = False, link = '')
            pdf.cell(100, 5, txt = self.getString(key,labels).capitalize() , border = 'B', ln = 0, align = 'L', fill = False, link = '')
            pdf.cell(0, 5, txt = fullValue, border = 'B', ln = 1, align = '', fill = False, link = '')
            if(pdf.get_y() > 250):
                pdf.add_page()
                pdf.ln(20)

    def setTableTitle(self,pdf):
        pdf.set_font('RobotoThin', '', 13)
        pdf.set_text_color(44,44,44)
        pdf.set_draw_color(155, 155, 155)

    def setBlueHeaderStyle(self,pdf):
        pdf.set_fill_color(75, 179, 204)
        pdf.set_text_color(255,255,255)
        pdf.set_font('RobotoThin', '', 10)

    def setTableRowStyle(self,pdf):
        pdf.set_text_color(23,23,23)
        pdf.set_draw_color(75, 179, 204)
        pdf.set_font('RobotoThin', '', 8)

    def setBlueHeaderStyle(self,pdf):
        pdf.set_font('RobotoRegular', '', 8)
        pdf.set_fill_color(75, 179, 204)
        pdf.set_text_color(255,255,255)
    
    def setBlueTableTitle(self,pdf):
        pdf.set_font('RobotoRegular', '', 12)
        pdf.set_fill_color(75, 179, 204)
        pdf.set_text_color(255,255,255)

    def addTables(self,tables,pdf,max_width=190,margin=10):
        """ Creates tables with multiple fields
            the width of each column is calculated depending on its content size
            
            Parameters
                    ----------
                    - tables: array of tables to be printed
                        each table must be:
                        { "tableTitle" : {
                                "fields" : [field1,field2],
                                "rows"   : [[value1.1, value1.2], [value2.1,value2.2]]
                            }
                        }
                    - max_width - by default: 190 (A4 paper width)
                        maximum width that the tables have
                    - margin - by default: 10
                        margin of table rows
        """
        rows_count = 12 # Set row_count with 12 for the agent information size
        table_keys = tables.keys()
        for key in table_keys:
            if tables[key]:
                if(pdf.get_y() > 225):
                    pdf.add_page()
                    pdf.ln(20)
                table_title = key
                self.setTableTitle(pdf)
                pdf.ln(5)
                pdf.cell(max_width, 5, txt = table_title, border = 'B', align = '', fill = False, link = '')
                pdf.ln(5)
                rows_count = rows_count + 5
                self.setBlueHeaderStyle(pdf)
                sizes_field = self.calculate_table_width(pdf, tables[key], max_width)
                count = 0
                #Table head - th
                for field in tables[key]['fields']:
                    if(pdf.get_y() > 230):
                        pdf.add_page()
                        pdf.ln(20)
                    if field != 'sparkline':
                        x = 0
                        w = sizes_field[count]
                        width = w[0] if isinstance(w, list) else w
                        pdf.cell(width, 4, (self.getString(field)).capitalize(), 0, 0, 'L', 1)
                        count = count + 1
                pdf.ln()
                self.setTableRowStyle(pdf)
                #Table rows - tr
                for row in tables[key]['rows']:
                    first_field = True
                    bigger_y = 0
                    reset_y = False
                    rh = 4 #Row heigth
                    count = 0
                    for value in row:
                        if(pdf.get_y() > 250):
                            pdf.add_page()
                            pdf.ln(20)
                        if not isinstance(value, list) and count < len(sizes_field):
                            w = sizes_field[count]
                            width = w[0] if isinstance(w, list) else w
                            value = self.split_string(width, value) if isinstance(w, list) else value
                            if value and isinstance(value, list):
                                if first_field:
                                    x = pdf.get_x()
                                    first_field = False
                                    y = pdf.get_y()
                                    reset_y = y
                                    bigger_y = y
                                else:
                                    y = reset_y
                                rows_count = rows_count + len(value)
                                for v in value:
                                    pdf.set_xy(x, y)
                                    pdf.cell(width, rh, str(v), 0, 0, 'L', 0)
                                    y = y + rh
                                x = x + width
                                bigger_y = y if y > bigger_y else bigger_y
                            else:
                                if reset_y:
                                    pdf.set_xy(pdf.get_x(), reset_y)
                                pdf.cell(width, rh, str(value), 0, 0, 'L', 0)
                                y = pdf.get_y()
                            count = count + 1
                    rows_count = rows_count + 1
                    y = (bigger_y if (bigger_y > pdf.get_y()) else (pdf.get_y() + rh))
                    pdf.set_xy(margin, y)
                    pdf.line(margin, y, max_width+margin, y)
                


    def addTable(self, data, pdf, labels):
        try:
            customTables = []
            if not data: # if data is empty
                pdf.cell(0, 10, txt = "No configuration available" , border = 'B', ln = 1, align = 'C', fill = False, link = '')
            elif type(data) is dict:
                for key,value in data.iteritems():
                    if type(value) is not list and type(value) is not dict:
                        self.addTableRow(key,value,pdf,labels)
                    if type(value) is list:
                        if value and type(value[0]) is dict:
                            customTables.append({key:value})
                        else:
                            self.addTableRow(key,value,pdf,labels)
                            
                            if(pdf.get_y() > 250):
                                pdf.add_page()
                                pdf.ln(20)
                    if type(value) is dict:
                            customTables.append({key:value})
            elif type(data) is list:
                for item in data:
                    if type(item) is not list and type(item) is not dict:
                        self.addTableRow(key,item,pdf,labels)
                    if type(item) is list:
                        for listItem in item:
                            self.addTable(listItem,pdf,labels)

            if customTables:
                tables = {}
                for extraTable in customTables:
                    for key,value in extraTable.iteritems():
                        self.setBlueHeaderStyle(pdf)
                        tableKey = self.getString(key,labels)
                        newTable  = { tableKey : {} }
                        fields = []
                        rows = []
                        if type(value) is list:
                            keys_amount = len(value[0].keys())
                            for key in value[0]: #Header
                                fields.append(self.getString(key,labels))
                            self.setTableRowStyle(pdf)
                            for row in value: # rows
                                nextRow = []
                                for rowKeys, rowValues in row.iteritems():
                                    nextRow.append(self.getString(rowValues))
                                rows.append(nextRow)
                            newTable[tableKey] = { "fields": fields, "rows": rows}
                            self.addTables(newTable,pdf,185,12)
                        elif type(value) is dict:
                            pdf.ln(5)
                            self.setTableTitle(pdf)
                            pdf.cell(0, 5, txt = self.getString(key,labels), border = 'B', align = '', fill = False, link = '')
                            pdf.ln(5)
                            for currentTableKey, currentTableValue in value.iteritems():
                                self.addTableRow(currentTableKey,currentTableValue,pdf,labels)

        except Exception as e:
            self.logger.error("error generating report table " + str(e))


    def filterTableByField(self,field,data):
        result = {}
        currentFields = []

        for currentData in data:
            if field in currentData:
                if currentData[field] in result:
                    result[currentData[field]].append(currentData)
                else:
                    result[currentData[field]] = []
                    result[currentData[field]].append(currentData)

        return result




    @expose_page(must_login=False, methods=['POST'])
    def generateConfigurationReport(self, **kwargs):
        """Generate configuration PDF report.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            pdf = PDF('P', 'mm', 'A4')
            first_page = True
            self.logger.info("Start generating configuration report ")
            json_acceptable_string = kwargs['data']
            data = jsonbak.loads(json_acceptable_string)
            report_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
            time_diff = data['timeZone']
            today = datetime.datetime.utcnow() - datetime.timedelta(minutes=time_diff)
            today = today.strftime('%Y.%m.%d %H:%M')
            parsed_data = jsonbak.dumps({'data': 'success'})
            section_title = data['sectionTitle']
            # Print agent info
            agent_data = data['isAgents']
            first_page = True
            # Add title and filters 
            pdf.alias_nb_pages()
            pdf.add_page()
            pdf.ln(20)
            #Color WazuhBlue
            pdf.set_text_color(75, 179, 204)
            # Title pdf
            pdf.set_font('RobotoThin', '', 25)
            pdf.cell(0,0, section_title + ' report' , 0, 0, 'L')
            #Date
            pdf.set_font('RobotoRegular', '', 12)
            pdf.cell(0,0, today , 0, 0, 'R')
            pdf.ln(1)

            if agent_data:
                self.print_agent_info(agent_data, pdf)
            
            pdf_name = str(agent_data['Name']) + '-agent-conf'

            pdf.ln(10)
            pdf.set_draw_color(200,200,200)
            wmodules_conf_data = []
            for n in data['data']['configurations']:
                try:
                    #Set color and print configuration tittle
                    pdf.set_font('RobotoThin', '', 18)
                    if first_page:
                        first_page = False
                    else:
                        pdf.add_page()
                        pdf.ln(20)
                    pdf.cell(0, 10, txt = n['title'], border = '', ln = 1, align = '', fill = False, link = '')
                    pdf.set_margins(12, 0, 12)
                    pdf.ln(3)
                    for currentSection in n['sections']:
                        # header
                        self.setBlueTableTitle(pdf)
                        if(pdf.get_y() > 250):
                            pdf.add_page()
                            pdf.ln(20)
                        pdf.cell(0, 7, txt = currentSection['subtitle'], border = '', align = 'L', fill = True, link = '')
                        customLabels = {} 
                        if 'labels' in currentSection:
                            customLabels = currentSection['labels']
                        # rows
                        pdf.ln(8)
                        if 'config' in currentSection:
                            for currentConfig in currentSection['config']:
                                pdf.set_text_color(23,23,23)
                                configuration = currentConfig['configuration']
                                component = currentConfig['component']
                                config_request = {'endpoint': '/agents/'+str(data['agentId'])+'/config/'+component+'/'+configuration , 'id':str(data['apiId']['_key'])}
                                conf_data = self.miapi.exec_request(config_request)
                                conf_data = jsonbak.loads(conf_data) 
                                if not conf_data or 'data' not in conf_data or configuration not in conf_data['data']:
                                    pass
                                else:
                                    if 'filterBy' in currentConfig:
                                        filteredTables = self.filterTableByField(currentConfig['filterBy'], conf_data['data'][configuration])
                                        self.addTable(filteredTables, pdf, customLabels)
                                    else:
                                        self.addTable(conf_data['data'][configuration], pdf, customLabels)

                        if 'wodle' in currentSection:
                            currentWodle = currentSection['wodle']
                            if not wmodules_conf_data: # ask for all wodles just once
                                config_request = {'endpoint': '/agents/'+str(data['agentId'])+'/config/'+'wmodules'+'/'+'wmodules' , 'id':str(data['apiId']['_key'])}
                                conf_data = self.miapi.exec_request(config_request)
                                wmodules_conf_data = jsonbak.loads(conf_data)

                            currentWodle_data = next(item for item in wmodules_conf_data['data']['wmodules'] if currentWodle in item) # finds the current wodle in the list of wodles
                            if not currentWodle_data and currentWodle not in currentWodle_data:
                                pdf.cell(0, 10, txt = "No configuration available" , border = 'B', ln = 1, align = 'C', fill = False, link = '')
                            else:
                                self.addTable(currentWodle_data[currentWodle], pdf, customLabels)
                            pdf.ln(5)
                        pdf.ln(5) # space between configuration tables
                except Exception as e:
                    self.logger.error(e)
            #Save pdf
            pdf.output(self.path+'wazuh-'+pdf_name+'-'+report_id+'.pdf', 'F')
            self.logger.info('report agent configuration successful' + self.path+'wazuh-'+pdf_name+'-'+report_id+'.pdf')
        except Exception as e:
            self.logger.error("Error generating report: %s" % (e))
            return jsonbak.dumps({"error": str(e)})
        return parsed_data


    @expose_page(must_login=False, methods=['POST'])
    def generate(self, **kwargs):
        """Generate PDF report.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            pdf = PDF('P', 'mm', 'A4')
            metrics_exists = False
            first_page = True
            self.logger.info("Start generating report ")
            json_acceptable_string = kwargs['data']
            data = jsonbak.loads(json_acceptable_string)
            #Replace "'" in images
            clean_images = jsonbak.dumps(data['images'])
            clean_images.replace("'", "\"")
            data['images'] = jsonbak.loads(clean_images)
            report_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
            #Get filters and other information
            filters = data['queryFilters']
            pdf_name = data['pdfName']
            time_range = data['timeRange']
            section_title = data['sectionTitle']
            metrics = data['metrics']
            tables = data['tableResults']
            time_diff = data['timeZone']
            today = datetime.datetime.utcnow() - datetime.timedelta(minutes=time_diff)
            today = today.strftime('%Y.%m.%d %H:%M')
            if metrics:
                metrics = jsonbak.loads(metrics)
            agent_data = data['isAgents']
            #Save the images
            saved_images = self.save_images(data['images'])
            parsed_data = jsonbak.dumps({'data': 'success'})
            # Add title and filters 
            pdf.alias_nb_pages()
            pdf.add_page()
            pdf.ln(20)
            #Color WazuhBlue
            pdf.set_text_color(75, 179, 204)
            # Title RobotoThin Bold 20
            pdf.set_font('RobotoThin', '', 25)
            pdf.cell(0,0, section_title + ' report' , 0, 0, 'L')
            #Date
            pdf.set_font('RobotoRegular', '', 12)
            pdf.cell(0,0, today , 0, 0, 'R')
            #Filters and search time range
            if pdf_name != 'agents-inventory': # If the name of the PDF file is agents-inventory does not print  date range or filters either 
                pdf.ln(7)
                self.setBlueHeaderStyle(pdf)
                if time_range:
                    pdf.cell(0, 5, ' Search time range: ' + time_range , 0, 0, 'L', 1)
                    pdf.ln(5)
                if filters:
                    pdf.cell(0, 5, ' Filters:' + filters , 0, 0, 'L', 1)
            #Check if is agent, print agent info
            if agent_data and agent_data != 'inventory':
                self.print_agent_info(agent_data, pdf)
            #Check metrics and print if exist
            if len(metrics) > 0:
                pdf.set_text_color(255,255,255)
                metrics_exists = True
                w = 5
                line_width = 0
                total_width = 190
                pdf.ln(10)
                pdf.set_font('RobotoThin', '', 8)
                for key in metrics.keys():
                    text = (str(key) +': '+ str(metrics[key]))
                    text_w = pdf.get_string_width(text) + w
                    line_width = line_width + text_w
                    if line_width >= total_width:
                        pdf.cell((total_width - (line_width - text_w)), 4, '', 0, 0, 'L', 1)#Fill rest of the width                                                                 
                        pdf.ln(4)
                        line_width = text_w
                    pdf.cell(text_w, 4, text, 0, 0, 'L', 1)
                if line_width < total_width:
                    pdf.cell((total_width - line_width), 4, '', 0, 0, 'L', 1)#Fill rest of the width in the last row
            # Add visualizations
            if saved_images:
                # Default sizes and margins values
                x = 30
                y = 10
                y_img = 80
                w = 100
                h = 50
                x_img = 50
                # Count images for page break
                count = 0
                n_images = len(saved_images)
                # Set top margin checking if metrics exist
                pdf.set_text_color(75, 179, 204)
                pdf.set_font('RobotoThin', '', 14)
                if metrics_exists:
                    y_img = y_img + 10
                if agent_data:
                    y_img = y_img + 20
                pdf.ln(10)
                #Sort images by width size
                images = sorted(saved_images, key=itemgetter('width'))
                #Insert images
                for img in images:
                    #Change width and heigh
                    if img['width'] == -1:
                        w = 0
                        h = 0
                        x_img = 80
                    elif img['width'] <= 550:
                        w = 118
                        h = 65
                        x_img = 40
                    else:
                        w = 189
                        h = 55
                        x_img = 12     
                    #Insert image
                    pdf.cell(x , y, img['title'], 0, 1)
                    pdf.image(img['path'], x_img, y_img, w,h)
                    pdf.ln(75)
                    y_img = y_img + 85
                    count = count + 1
                    n_images = n_images - 1
                    if count == 2 and n_images >= 1 and first_page:
                        pdf.add_page()
                        pdf.ln(15)
                        y_img = 45
                        count = 0
                        first_page = False
                    if count == 3 and n_images >= 1:
                        pdf.add_page()
                        pdf.ln(15)
                        y_img = 45
                        count = 0
            #Add tables
            if self.tables_have_info(tables): #Check if any table has information, if not, prevent break page and not iterate in empties tables
                if pdf_name != 'agents-inventory': # If the name of the PDF file is agents-inventory does not add page
                    pdf.add_page()
                    pdf.ln(20)
                self.addTables(tables,pdf,190,10)
            #Save pdf
            pdf.output(self.path+'wazuh-'+pdf_name+'-'+report_id+'.pdf', 'F')
            self.logger.info('Report: wazuh-'+pdf_name+'-'+report_id+'.pdf  was successfully generated.')
            #Delete the images
            self.delete_images(saved_images)
        except Exception as e:
            self.logger.error("Error generating report: %s" % (e))
            return jsonbak.dumps({"error": str(e)})
        return parsed_data

    #Cut value string
    def cut_value(self, width, value_string):
        num_characters = int(math.ceil(width / 1.50))
        value_splitted = list(str(value_string))
        if len(value_splitted) > num_characters:
            final_string_arr = value_splitted[0:num_characters]
            final_string_arr.append('...')
            final_string = ''.join(str(e) for e in final_string_arr)
            return str(final_string)
        else:
            return value_string
    
    #Split the string 
    def split_string(self, width, value_string):
        splitted_str = []
        num_characters = int(math.ceil(width / 1.50)) # Number of characters to split the string
        sm = num_characters # Var to sum and advance in the arr indexes
        value_splitted = list(str(value_string))
        if len(value_splitted) > num_characters:
            parts = int(math.ceil((float(len(value_splitted) / float(num_characters)))))
            i = 0 # Position in the array
            c = 0 # For count the parts travelled
            for _ in range(parts):
                c = c + 1
                string_arr = value_splitted[i:num_characters]
                i = num_characters
                num_characters = num_characters + sm
                if len(string_arr) > 0 and c < parts:
                    string_arr.append('-')
                if string_arr:
                    string = ''.join(str(e) for e in string_arr)
                    splitted_str.append(string) 
            #Clean possible "-" in the last string
            last_str = splitted_str[-1]
            if last_str.endswith("-"):
                splitted_str[-1] = last_str[:-1]
            return splitted_str
        else:
            return value_string

    #Sum arr of numbers
    def sum_numbers_arr(self, arr):
        total = 0
        for i in arr:
            total = total + i
        return total
    
    #Sum dic of numbers
    def sum_numbers_dic(self, dic):
        total = 0
        for key in dic.keys():
            total = total + dic[key]
        return total

    #Excludes fields from dic
    def exclude_fields(self, fields, dic):
        dic_to_exclude = dic.copy()
        for f in fields:
            del dic_to_exclude[f]
        return dic_to_exclude


    #Check if tables are not empties
    def tables_have_info(self, tables):
        for key in tables.keys():
            if tables[key]:
                return True
        return False

    #Calculates the width of the fields
    def calculate_table_width(self, pdf, table, max_width=190):
        sizes = {}
        total_width = 0
        fields = table['fields']
        for field in fields:
            if field != 'sparkline':
                width = pdf.get_string_width(field) + 2
                sizes[field] = width
        for row in table['rows']:
            count = 0
            for value in row:
                if not isinstance(value, list):
                    if count < len(fields):
                        key = fields[count]
                        prev_width = sizes[key]
                        if value: # Check for possible undefined elements
                            width = pdf.get_string_width(str(value)) + 2
                        else:
                            width = 1
                        if width > prev_width:
                            sizes[key] = width
                count = count + 1
        # This code block resize the table for fill all the width
        for key in sizes.keys():
            if sizes[key]: # Check for possible undefined elements
                total_width = total_width + sizes[key]
            else:
                total_width = total_width + 0
        if total_width < max_width:
            diff = max_width - total_width
            keys_num = len(sizes.keys())
            diff = diff / keys_num
            for key in sizes.keys(): # Sum the proporcional width difference to the fields
                sizes[key] = sizes[key] + diff
        # Check if the row is more wide and calculates the width
        elif total_width > max_width:
            wide_fields = []
            for key in sizes.keys():
                if sizes[key] > 60:
                    wide_fields.append(key)
            fields_to_sum = self.exclude_fields(wide_fields, sizes)
            total_width_narrow_fields = self.sum_numbers_dic(fields_to_sum)
            remaining_width = max_width - total_width_narrow_fields
            wide_size = remaining_width / len(wide_fields)
            for wf in wide_fields:
                sizes_arr = []
                parts = int(math.ceil(sizes[wf]) / wide_size)
                #Ensure minimun one part
                if not parts:
                    parts = 1
                for _ in range(parts):
                    sizes_arr.append(wide_size)
                sizes[wf] = sizes_arr
        sizes = self.sort_table_sizes(table['fields'], sizes)
        return sizes
    
    #Print agent info
    def print_agent_info(self, agent_info, pdf):
        pdf.ln(10)
        sorted_fields = ('ID', 'Name', 'IP', 'Version', 'Manager', 'OS')
        fields = {'ID':0, 'Name':0, 'IP':0, 'Version':0, 'Manager':0, 'OS':0}
        total_width = 0
        for key in fields.keys():
            #Calculate width
            width = pdf.get_string_width(agent_info[key])
            if pdf.get_string_width(agent_info[key]) > width:
                width = pdf.get_string_width(agent_info[key])
            width = width + 2
            total_width = total_width + width
            fields[key] = width
        #Calculate the rest of the width to fill the row
        diff = 0
        if total_width < 190:
            diff = 190 - total_width
            keys_num = len(fields.keys())
            diff = diff / keys_num
        for key in fields.keys():
            fields[key] = fields[key] + diff
        #Set color and print th
        self.setBlueHeaderStyle(pdf)
        for key in sorted_fields:
            pdf.cell(fields[key], 4, str(key), 0, 0, 'L', 1)
        pdf.ln()
        #Change text color and print tr
        self.setTableRowStyle(pdf)
        for key in sorted_fields:
            pdf.cell(fields[key], 4, str(agent_info[key]), 'B', 0, 'L', 0)
        #Print the rest of the agent information
        pdf.ln(7)
        pdf.set_font('RobotoThin','',11)
        pdf.set_text_color(23,23,23)
        pdf.cell(0,10, "Registration date: " + str(agent_info['dateAdd']), 0, 0, 'L', 0)
        pdf.ln()
        pdf.cell(0,10, "Last keep alive: " + str(agent_info['lastKeepAlive']), 0, 0, 'L', 0)
        pdf.ln()
        pdf.cell(0,10, "Groups: " + str(agent_info['group']), 0, 0, 'L', 0)
        pdf.ln(2)

    #Sorts the width of the fields
    def sort_table_sizes(self, fields, sizes):
        sorted_sizes = []
        for key in fields:
            if key != 'sparkline':
                sorted_sizes.append(sizes[key])
        return sorted_sizes
    
    # Returns a list with all PDF files in the bin directory
    @expose_page(must_login=False, methods=['GET'])
    def reports(self, **kwargs):
        """Get the list of reports.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            pdf_files = []
            for f in os.listdir(self.path):
                if os.path.isfile(os.path.join(self.path, f)):
                    filename, file_extension = os.path.splitext(self.path+f)
                    if file_extension == '.pdf':
                        file = {}
                        file['size'] = os.path.getsize(self.path+f)
                        file['name'] = f
                        file['date'] = time.strftime('%Y.%m.%d %H:%M', time.gmtime(os.path.getmtime(self.path+f)))
                        pdf_files.append(file)

            parsed_data = jsonbak.dumps({'data': pdf_files})
        except Exception as e:
            self.logger.error("Error getting PDF files: %s" % (e))
            return jsonbak.dumps({"error": str(e)})
        return parsed_data

    # Deletes a report from disk
    @expose_page(must_login=False, methods=['GET'])
    def remove(self, **kwargs):
        """Remove a report by name.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            if 'name' not in kwargs:
                raise Exception('Missing filename')
            filename = kwargs['name']
            os.remove(self.path+filename)
            self.logger.info("Removed report %s" % kwargs['name'])
            parsed_data = jsonbak.dumps({"data": "Deleted file"})
        except Exception as e:
            self.logger.error("Error deleting PDF file: %s" % (e))
            return jsonbak.dumps({"error": str(e)})
        return parsed_data
