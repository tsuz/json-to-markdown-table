# json-to-markdown-table
Transform JSON object to markdown style table

# Example



```
var app = require('json-to-markdown-table');

var columns = [
    'a',
    'b',
    'c',
];


var object = [
    {
        a: 'asdfa',
        b: '239487',
        c: '234',
    },
    {
        a: 'sdf',
        b: 'gsdf',
        c: 'sfd',
    }
];

var tableMdString = app(object, columns);

//   |a|b|c|
//   |----|----|----|
//   |asdfa|239487|234|
//   |sdf|gsdf|sfd|


```

