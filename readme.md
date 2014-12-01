# csv-join

join two cavs based on a "foreign key" relationship

[![NPM](https://nodei.co/npm/csv-join.png?global=true)](https://nodei.co/npm/csv-join/)

note: `source.csv` gets buffered into memory in the current implementation. a purely streaming version would be cool. if you have ideas for this open an issue!

## usage

```js
csv-join <source> <source-column> <target> [<target-column>]
```

`source`and `target` can be either paths to local files or http/https links

the `target-column` defaults to the `source-column`

## example

given the following:

`source.csv`:

```
a,b,c
1,2,3
```

`target.csv`:

```
id,name
1,bob
2,bill
3,carl
```

then running `csv-join source.csv 'a' target.csv 'id'` would result in:

```
id,name,a,b,c
1,bob,1,2,3
2,bill,,,
3,carl,,,
```
