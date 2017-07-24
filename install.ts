import * as process from 'process';
import {spawnSync, SpawnSyncOptionsWithStringEncoding, SpawnSyncReturns} from 'child_process';

// declaring utf8 makes sure a string is returned (as opposed to a buffer) from spawnSync
const spawnSyncOptions: SpawnSyncOptionsWithStringEncoding = {
  encoding: 'utf8'
};

const directoriesToSetUp = [
  'backend',
  'frontend'
];

/**
 * Some few adaptions are necessary for making installation work on windows
 */
const isWin = /^win/.test(process.platform);
const spawnSyncCommand = (cmdName): string => {
  return isWin ? `${cmdName}.cmd` : cmdName;
};

const startingDirectory = process.cwd();

directoriesToSetUp.forEach(dirName => {
  changeToDirectory(startingDirectory);
  changeToDirectory(dirName);
  runInstallScript();
});


function changeToDirectory (dir) {
  try {
    console.log(`Changing to directory ${dir}`);
    process.chdir(dir);
  } catch (err) {
    console.log(`Could not change to directory ${dir}: ${err}`);
    process.exit();
  }
}

function runInstallScript () {
  const child = spawnSync(spawnSyncCommand('npm'), ['install'], spawnSyncOptions);
  handleCommandResult(child, {exitOnError: false});
}

/**
 * Helper functions
 */
function handleCommandResult(result: SpawnSyncReturns<string>, options: HandleCommandResultOptions) {
  if (result.error) {
    console.error('ERROR IN PROCESS:', result.error);
    if (options.exitOnError) {
      process.exit()
    }
  } else if (result.stderr !== undefined && result.stderr !== "") {
    console.error('STDERR NOT EMPTY:', result.stderr);
    if (options.exitOnError) {
      process.exit()
    }
  } else {
    console.log(result.stdout);
  }
}

interface HandleCommandResultOptions {
  exitOnError: boolean
}
