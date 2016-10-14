
var _ = require('lodash');

var app = module.exports = Convert;

function Convert(json, columns) {
    if(!_.isArray(columns) || !columns.length) throw "Columns must be a non-empty array";
    if(!_.isObject(json) || _.isNull(json)) throw "Json must be a non-empty object";

    var object = _.cloneDeep(json);
    if(!_.isArray(object)) {
        object = [object];
    }

    return createTable(object, columns);
}


function createTable(object, columns) {

    var base = '|';
    // Create columns
    var outputString = _.reduce(columns, function(sum, current) {
        return sum + base + current;
    });
    outputString = base + outputString + '|\n';

    // Create table format in markdown
    _.times(columns.length, function() {
        outputString += base + '----';
    });
    outputString += base + '\n';

    // Create rows
    object.forEach(function(row) {

        var rows = _.map(columns, function(column) {
                if(_.isArray(row[column])) {
                    return base + '[ ' + row[column].join(', ') + ' ]';
                }
                else if(_.isObject(row[column])) {
                    return base + JSON.stringify(row[column]);
                }
                return base + row[column];
            });

        outputString += rows.join('') + '|\n';
    });

    return outputString;
}