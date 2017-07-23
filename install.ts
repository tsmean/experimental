import * as process from 'process';
import { spawn } from 'child_process';

const directoriesToSetUp = [
  'backend',
  'frontend'
];

const startingDirectory = process.cwd();

directoriesToSetUp.forEach(dirName => {
  changeToDirectory(startingDirectory);
  changeToDirectory(dirName);
  runInstallScript();
});


function changeToDirectory (dir) {
  try {
    process.chdir(dir);
  } catch (err) {
    console.log(`Could not change to directory ${dir}: ${err}`);
    process.exit();
  }
}

function runInstallScript () {
  const child = spawn('npm', ['run', 'install']);

  child.stdout.setEncoding('utf8').on('data', (chunk) => {
    console.log(chunk);
  });

  child.stderr.setEncoding('utf8').on('data', (chunk) => {
    console.error(chunk);
    process.exit();
  });

  child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });

}
