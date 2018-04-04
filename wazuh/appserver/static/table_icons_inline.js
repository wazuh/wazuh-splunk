require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {
    var CustomIconRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            return cell.field === 'status';
        },
        render: function($td, cell) {
            var count = cell.value;
            // Compute the icon base on the field value
            var icon;
            if(status = 'Disconnected') {
                icon = 'alert-circle';
            } else if(status = 'Never connected') {
                icon = 'alert';
            } else {
                icon = 'check';
            }
            // Create the icon element and add it to the table cell
            $td.addClass('icon-inline numeric').html(_.template('<%- text %> <i class="icon-<%-icon%>"></i>', {
                icon: icon,
                text: cell.value
            }));
        }
    });
    mvc.Components.get('table1').getVisualization(function(tableView){
        // Register custom cell renderer, the table will re-render automatically
        tableView.addCellRenderer(new CustomIconRenderer());
    });
});