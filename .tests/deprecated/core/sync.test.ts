import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import os from "os";

import * as fse from "../../index.js";

describe("mkdirp / sync", () => {
  let TEST_DIR;
  let file;
  beforeEach((done) => {
    TEST_DIR = path.join(os.tmpdir(), "fs-extra", "mkdirp-sync");
    fse.emptyDir(TEST_DIR, (err) => {
      assert.ifError(err);
      const x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
      const y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
      const z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
      file = path.join(TEST_DIR, x, y, z);
      done();
    });
  });
  afterEach((done) => fse.remove(TEST_DIR, done));
  it("should", (done) => {
    try {
      fse.mkdirpSync(file, 0o755);
    } catch (err) {
      assert.fail(err);
    }
    fse.pathExists(file, (err, ex) => {
      assert.ifError(err);
      assert.ok(ex, "file created");
      fs.stat(file, (err, stat) => {
        assert.ifError(err);
        // http://stackoverflow.com/questions/592448/c-how-to-set-file-permissions-cross-platform
        if (os.platform().startsWith("win")) {
          assert.strictEqual(stat.mode & 0o777, 0o666);
        } else {
          assert.strictEqual(stat.mode & 0o777, 0o755);
        }
        assert.ok(stat.isDirectory(), "target not a directory");
        done();
      });
    });
  });
});
