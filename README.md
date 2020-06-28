# map3d Visualization Platform Kernel


[![npm Status](https://badgen.net/npm/v/map3d/?icon=npm)](https://www.npmjs.com/package/map3d)
[![npm Status](https://badgen.net/npm/license/map3d)](https://www.npmjs.com/package/map3d)
[![install size](https://badgen.net/packagephobia/install/map3d)](https://www.npmjs.com/package/map3d)
[![publish size](https://badgen.net/packagephobia/publish/map3d)](https://www.npmjs.com/package/map3d)
[![total downloads](https://badgen.net/npm/dt/map3d)](https://www.npmjs.com/package/map3d)


map3d Is based on three.js A set of mature map library, which can convert geojson into 3D vector map, can easily realize heat map, flying line, scatter point, solid column, map drilling and a variety of animation material effects on the map, you can understand the following:)

## 1.Install
```javascript
npm install --save map3d
```

## 2. Usage
```javascript
import map3d from 'map3d'

var opt={
    el:document.getElementById('map'),
    debugger:true,
    geoData:geoData//geojson
}
var map=new Map3D(opt)

```

## 3.Packaging & Publishing

```python
npm run build
npm publish
```

### 4.Change log ###

[Releases](https://github.com/zhu18/map3d/releases)