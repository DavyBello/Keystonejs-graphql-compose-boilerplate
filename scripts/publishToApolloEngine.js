require('dotenv').config();
const { exec } = require('child_process');

const command = `npx apollo service:push --endpoint=http://localhost:${process.env.PORT || 3000}/graphql`;

console.log(command);
exec(command, (err, stdout, stderr) => {
  // node couldn't execute the command
  if (err) console.log(err);

  // the *entire* stdout and stderr (buffered)
  console.log(stdout);
  if (stderr) console.log(stderr);
});
