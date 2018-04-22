# json-to-markdown-table
Transform JSON object to markdown style table

# Example



```
var app = require('json-to-markdown');

var columns = [
    {key: a, label: 'custom title'},
    'b',
    'c'
];


var object = [
    {
        a: 'asdfa',
        b: [['239487','asdff'],['239487','asdff']],
        c: {c: 'asdf',g: ['239487','asdff']},
    },{
        d: 'efg',
        e: [],
        f: 'klm'
    },
    {
        a: 'sdf',
        b: 'gsdf',
        c: null
    }
];

var tableMdString = app(object, columns);

// |custom title|b|c|
// |----|----|----|
// |asdfa|[ [ 239487, asdff ], [ 239487, asdff ] ]|{"c":"asdf","g":"[ 239487, asdff ]"}|
// |sdf|gsdf|{null}|


```

