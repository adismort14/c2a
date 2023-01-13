const fs = require("fs");
const path = require("path");

let format = 'image';

exports.activate = function (context) {
    vscode.commands.registerCommand('extension.takeScreenshot', function () {
        let picker = vscode.window.createQuickPick();
        picker.items = [
            { label: 'Text', description: 'Select this option to include the output and code in text format.' },
            { label: 'Image', description: 'Select this option to include the output and code in image format.' }
        ];
        picker.onDidChangeValue(value => {
            format = value;
        });
        picker.show();
        if (format === 'text') {
            // Code to include output and code in text format goes here
        } else if (format === 'image') {
            exec('lightshot.exe -out', (err, stdout, stderr) => {
                if (err) {
                    console.log(`Error: ${err}`);
                    return;
                }
                let screenshotPath = stdout.trim();
                let pdf = new jsPDF();
                let imageData = fs.readFileSync(screenshots);
                pdf.addImage(imageData, 'PNG', 0, 0);
                pdf.save('screenshot.pdf');
            });
        }
    });
};
