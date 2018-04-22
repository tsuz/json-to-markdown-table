var Code = require('code');
var expect = Code.expect;
var app = require('./../app');
var _ = require('lodash');

var removeEmptyPredicate = function(row) {
    return row;
};

describe('Should convert JSON to MD table format', function() {


    it('should convert values correctly', function() {
        var columns = [
            'a',
            'b',
            'c'
        ];
        
        var items = [
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

        var result = app(items, columns);
        var rows = _.split(result, '\n');
        rows = _.filter(rows, removeEmptyPredicate);
        expect(rows.length).to.equal(4); // should not include {d,e,f}
        var columns = _.head(rows);
        expect(columns).to.equal('|a|b|c|');
        var divider = rows[1];
        expect(divider).to.equal('|----|----|----|');
        var firstRow = rows[2];
        var firstRowCells = _.split(firstRow, '|');
        firstRowCells = _.filter(firstRowCells, removeEmptyPredicate);
        expect(firstRowCells.length).to.equal(3);
        expect(firstRowCells[0]).to.equal('asdfa');
        // mind the spacing between strs
        expect(firstRowCells[1]).to.equal('[ [ 239487, asdff ], [ 239487, asdff ] ]');
        expect(firstRowCells[2]).to.equal('{"c":"asdf","g":"[ 239487, asdff ]"}');

        var secondRowCells = _.split(rows[3], '|');
        secondRowCells = _.filter(secondRowCells, removeEmptyPredicate);
        expect(secondRowCells[0]).to.equal('sdf');
        expect(secondRowCells[1]).to.equal('gsdf');
        expect(secondRowCells[2]).to.equal('{null}');

    });

    it('should convert alias', function() {
      var columns = [
        { key: 'a', label: 'column title' },
        'b',
          'c'
      ];

      var items = [
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

      var result = app(items, columns);
      var rows = _.split(result, '\n');
      rows = _.filter(rows, removeEmptyPredicate);
      expect(rows.length).to.equal(4); // should not include {d,e,f}
      var columns = _.head(rows);
      expect(columns).to.equal('|column title|b|c|');
      var divider = rows[1];
      expect(divider).to.equal('|----|----|----|');
      var firstRow = rows[2];
      var firstRowCells = _.split(firstRow, '|');
      firstRowCells = _.filter(firstRowCells, removeEmptyPredicate);
      expect(firstRowCells.length).to.equal(3);
      expect(firstRowCells[0]).to.equal('asdfa');
      // mind the spacing between strs
      expect(firstRowCells[1]).to.equal('[ [ 239487, asdff ], [ 239487, asdff ] ]');
      expect(firstRowCells[2]).to.equal('{"c":"asdf","g":"[ 239487, asdff ]"}');

      var secondRowCells = _.split(rows[3], '|');
      secondRowCells = _.filter(secondRowCells, removeEmptyPredicate);
      expect(secondRowCells[0]).to.equal('sdf');
      expect(secondRowCells[1]).to.equal('gsdf');
      expect(secondRowCells[2]).to.equal('{null}');

  });

});
