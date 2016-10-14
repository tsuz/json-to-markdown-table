
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
            return base + formatDataTypes(row[column]);
        });

        // Remove rows with empty cells
        var empty = _.every(rows, function(row) {
            return row.length === 1;
        });

        if(!empty) outputString += rows.join('') + '|\n';
    });

    return outputString;
}

/**
 * Format datatypes
 * @param value
 * @returns {*}
 */
function formatDataTypes(value) {
    if(_.isUndefined(value)) {
        return '';
    }
    else if(_.isNull(value)) {
        return '{null}';
    }
    else if(_.isArray(value)) {
        var mapped = _.map(value, formatDataTypes);
        return '[ ' + mapped.join(', ') + ' ]';
    }
    else if(_.isObject(value)) {
        var mapped = _.mapValues(value, formatDataTypes);
        return JSON.stringify(mapped);
    }
    return value;
}