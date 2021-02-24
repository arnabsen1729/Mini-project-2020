// const fs = require('fs');

function xmlToJson2(xml) {
    var obj = {};
    if (xml.nodeType == 3) {
        obj = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == 'undefined') {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof obj[nodeName].push == 'undefined') {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old['#text']);
                }
                obj[nodeName].push(xmlToJson(item)['#text']);
            }
        }
    }
    return obj;
}

function xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) {
        // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj['@attributes'] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == 'undefined') {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof obj[nodeName].push == 'undefined') {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

function parseXml(xml) {
    xml = xml.replace('/\r?\n|\r/g', '');
    var dom = null;
    if (window.DOMParser) {
        try {
            dom = new DOMParser().parseFromString(xml, 'text/xml');
        } catch (e) {
            dom = null;
        }
    } else alert('cannot parse xml string!');
    return dom;
}

function parseRawJSON(data) {
    console.log(data);
    transitions = data['DATA']['state-diagram']['transition'];
    finalData = {};

    finalData['transition'] = [];
    states = new Set();
    transitions.forEach((trans) => {
        finalData['transition'].push({
            present_state: trans['present_state']['#text'],
            next_state: trans['next_state']['#text'],
            input: trans['input']['#text'],
            output: trans['output']['#text'],
        });

        states.add(trans['present_state']['#text']);
        states.add(trans['next_state']['#text']);
    });
    finalData['state-count'] = states.size;
    finalData['states'] = [...states];

    console.log(states);
    return finalData;
}

sampleXML = `<DATA><transitions><states><data>A</data><data>B</data><data>C</data><data>D</data></states><inputs><data>0</data><data>1</data></inputs><outputs><data>0</data><data>1</data></outputs><next_states><data>A</data><data>B</data><data>C</data><data>D</data></next_states></transitions><state-diagram><transition><present_state>00</present_state><input>1</input><output>1</output><next_state>00</next_state></transition><transition><present_state>00</present_state><input>0</input><output>0</output><next_state>01</next_state></transition><transition><present_state>01</present_state><input>1</input><output>0</output><next_state>11</next_state></transition><transition><present_state>01</present_state><input>0</input><output>1</output><next_state>10</next_state></transition><transition><present_state>11</present_state><input>0</input><output>0</output><next_state>11</next_state></transition><transition><present_state>11</present_state><input>1</input><output>1</output><next_state>10</next_state></transition><transition><present_state>10</present_state><input>1</input><output>0</output><next_state>01</next_state></transition><transition><present_state>10</present_state><input>0</input><output>1</output><next_state>00</next_state></transition></state-diagram></DATA>`;
console.log('XML DOC\n', parseXml(sampleXML));
console.log('JSON Data Structure\n');
jsonData = xmlToJson(parseXml(sampleXML));
console.log(parseRawJSON(jsonData));
