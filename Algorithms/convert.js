/*
 *
 * XML To Data Structure
 * =====================
 * Converting the XML doc to the required data structure (object)
 *
 */

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

// returns the entire dataStructure
function parseRawJSON(data) {
    transitions = data['DATA']['state-diagram']['transition'];
    let finalData = {};

    finalData['transition'] = [];
    let states = new Set();
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
    finalData['state_count'] = states.size;
    finalData['states'] = [...states];
    let maxBits = parseInt(Math.log2(finalData['state_count'] - 1)) + 1;
    finalData['gates_count'] = maxBits;
    return finalData;
}

/*
 *
 * Algorithm for solving
 * =====================
 * 1. State Assignment
 * 2. Solving Circuit Excitation Table
 *
 */

// state Assignment
function stateAssign(data) {
    let maxBits = data['gates_count'];
    let maxValue = Math.pow(2, maxBits);
    let states = [];
    for (i = 0; i < maxValue; i += 1) {
        states.push(i.toString(2).padStart(maxBits, '0'));
    }
    let presentStates = data['states'];
    presentStates.sort();
    let stateMap = {};
    presentStates.forEach((present, index) => {
        stateMap[present] = states[index];
    });
    console.log(stateMap);

    return stateMap;
}

function updateStates(data, stateMap) {
    let newData = { ...data };
    newData['transition'] = data['transition'].map((trans) => {
        return {
            ...trans,
            present_state: stateMap[trans.present_state],
            next_state: stateMap[trans.next_state],
        };
    });

    console.log(newData);
    return newData;
}
//

function getDecimalValue(input, present_state) {
    return parseInt(input + present_state, 2);
}

function getDFFValues(data) {
    let DFFValues = [];
    for (let gateIndex = 0; gateIndex < data['gates_count']; gateIndex += 1) {
        let gateValues = [];
        data.transition.forEach((trans) => {
            if (trans.next_state.charAt(gateIndex) === '1') {
                console.log(trans);
                console.log(getDecimalValue(trans.input, trans.present_state));
                gateValues.push(
                    getDecimalValue(trans.input, trans.present_state)
                );
            }
        });
        DFFValues.push(gateValues);
    }

    console.log(DFFValues);
}

sampleXML = `<DATA><transitions><states><data>A</data><data>B</data><data>C</data><data>D</data></states><inputs><data>0</data><data>1</data></inputs><outputs><data>0</data><data>1</data></outputs><next_states><data>A</data><data>B</data><data>C</data><data>D</data></next_states></transitions><state-diagram><transition><present_state>A</present_state><input>1</input><output>1</output><next_state>A</next_state></transition><transition><present_state>A</present_state><input>0</input><output>0</output><next_state>B</next_state></transition><transition><present_state>B</present_state><input>1</input><output>0</output><next_state>D</next_state></transition><transition><present_state>B</present_state><input>0</input><output>1</output><next_state>C</next_state></transition><transition><present_state>D</present_state><input>0</input><output>0</output><next_state>D</next_state></transition><transition><present_state>D</present_state><input>1</input><output>1</output><next_state>C</next_state></transition><transition><present_state>C</present_state><input>1</input><output>0</output><next_state>B</next_state></transition><transition><present_state>C</present_state><input>0</input><output>1</output><next_state>A</next_state></transition></state-diagram></DATA>`;
jsonData = xmlToJson(parseXml(sampleXML));
let finalData = parseRawJSON(jsonData);
console.log(finalData);
let stateMap = stateAssign(finalData);
finalData = updateStates(finalData, stateMap);
finalData['gate'] = 'D';
getDFFValues(finalData);
