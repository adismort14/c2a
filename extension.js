const vscode = require('vscode');
const jsPDF = require('jspdf');
const { exec } = require('child_process');

let format = 'image';

exports.activate = function (context) {
    //register the command
    vscode.commands.registerCommand('extension.takeScreenshot', function () {
        //create a picker for the user to select format
        let picker = vscode.window.createQuickPick();
        picker.items = [
            { label: 'Text', description: 'Select this option to include the output and code in text format.' },
            { label: 'Image', description: 'Select this option to include the output and code in image format.' }
        ];
        //listen for user's selection
        picker.onDidChangeValue(value => {
            format = value;
        });
        //show the picker
        picker.show();
        //check user's selection
        if (format === 'text') {
            // Code to include output and code in text format goes here
        } else if (format === 'image') {
            // Code to include output and code in image format goes here
            // Use Lightshot to take a screenshot
            exec('lightshot.exe -out', (err, stdout, stderr) => {
                if (err) {
                    console.log(`Error: ${err}`);
                    return;
                }
                // Get the path of the saved screenshot from the output
                let screenshotPath = stdout.trim();
                //create pdf
                let pdf = new jsPDF();
                pdf.addImage(screenshotPath, 'PNG', 0, 0);
                pdf.save('screenshot.pdf');
            });
        }
    });
};
