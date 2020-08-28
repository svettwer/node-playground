const {rollup} = require("rollup");
const {Script, createContext} = require("vm");

(async function () {
    const bundle = await rollup({
        input: "./user-scripts/user-script.js"
    });
    const { output } = await bundle.generate({
        format: "commonjs",
        sourcemap: "inline",
        file: "bundle-rollup.js"
    });
    const [rollupOutput] = output;

    const script = new Script(
        rollupOutput.code,{
         filename: "user-script.js"
        }
    );

    let context = {console}
    let newContext = createContext(context);
    script.runInContext(newContext);
    console.log("\n###############\nEXECUTED CODE:\n###############");
    console.log(rollupOutput.code)
}());
