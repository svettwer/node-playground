const {Script, createContext} = require("vm");
const fs = require("fs");

function processScript(basePath, script){
    const scriptLines = script.split("\n")

    let processedScript = "";

    scriptLines.forEach((line, index) => {
        if(line.startsWith("import")){
            const importPath = line.split("from")[1]
                .trim()
                .replace(/"/g,"")
                .replace(/.\//,"")
                .replace(";",".js");
            const importContent = fs.readFileSync(`${basePath}${importPath}`, "utf8")
            const processImportContent = importContent.replace(/\n/g,";").replace("export","");
            processedScript += `${processImportContent}`
        }else{
            processedScript += `${line}`
        }
        if(index+1 !== scriptLines.length){
            processedScript += `\n`
        }
    })

    return processedScript
}

(async function () {

    const userScriptBasePath = "../user-scripts/"
    const userScriptName = "user-script.js"
    const userScript = fs.readFileSync(`${userScriptBasePath}${userScriptName}`, "utf8")

    const processedUserScript = processScript(userScriptBasePath, userScript)

    const script = new Script(
        processedUserScript,{
         filename: "../user-scripts/user-script.js",
        }
    );

    let context = {console}
    let newContext = createContext(context);
    script.runInContext(newContext);
    console.log("\n###############\nEXECUTED CODE:\n###############");
    console.log(processedUserScript)
}());
