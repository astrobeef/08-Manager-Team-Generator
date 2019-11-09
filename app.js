const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const html = [];

class Instructor {
    constructor(name, title, id) {
        this.name = name;
        this.title = title;
        this.id = id;
    }
}

const teamMembers = [
    new Instructor("Tucker", "Instructor", 1),
    new Instructor("TJ", "UofA", 2)
]


readFile("templates/manager.html", "utf8").then(template => {

    teamMembers.forEach(member => {

        if (member instanceof Instructor) {
            console.log("is instructor");
            for (key in member) {
                template = replacePlaceholder(template, key, member[key]);
            }
        }
    })
    html.push(template);

    console.log(template);
    return readFile("./template/intern.html", "utf8")
}).then(template => {
    template = replacePlaceholder(template, "name", "Becky");
    template = replacePlaceholder(template, "id", 200);
    template = replacePlaceholder(template, "school", "UofA");
})

function replacePlaceholder(template, target, value) {
    const regex = new RegExp("{{ " + target + " }}", "gm");
    const newTemplate = template.replace(regex, value);

    return newTemplate;
}

// let template = `
// <h1> Name : {{ name }} </h1>
// <h1> Name : {{ name }} </h1>
// <h2> Id : {{ id }} </h2>
// `

// template = template.replace(/{{ name }}/gm, name);
