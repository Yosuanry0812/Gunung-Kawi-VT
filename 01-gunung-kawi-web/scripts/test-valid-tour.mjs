import { spawnSync } from "node:child_process";
if (!process.env.npm_execpath)
  throw new Error("Run through npm run test:tour-url.");
const baseline = { ...process.env };
delete baseline.NEXT_PUBLIC_VIRTUAL_TOUR_URL;
delete baseline.TEST_VALID_TOUR;
const enabled = {
  ...baseline,
  NEXT_PUBLIC_VIRTUAL_TOUR_URL: "https://tour.test/index.htm",
  TEST_VALID_TOUR: "1",
};
function run(script, env) {
  const result = spawnSync(
    process.execPath,
    [process.env.npm_execpath, "run", script],
    { stdio: "inherit", env },
  );
  if (result.status !== 0)
    throw new Error(`${script} failed with exit code ${result.status}`);
}
try {
  run("build", enabled);
  run("test:e2e", enabled);
} finally {
  console.log("Restoring production build with no tour URL.");
  run("build", baseline);
}
