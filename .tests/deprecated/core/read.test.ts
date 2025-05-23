import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import os from "os";

import * as fse from "../../index.js";

describe("read", () => {
  let TEST_DIR;
  beforeEach((done) => {
    TEST_DIR = path.join(os.tmpdir(), "fs-extra", "read-json");
    fse.emptyDir(TEST_DIR, done);
  });
  afterEach((done) => fse.remove(TEST_DIR, done));
  describe("+ readJSON", () => {
    it("should read a file and parse the json", (done) => {
      const obj1 = {
        firstName: "JP",
        lastName: "Richardson",
      };
      const file = path.join(TEST_DIR, "file.json");
      fs.writeFileSync(file, JSON.stringify(obj1));
      fse.readJSON(file, (err, obj2) => {
        assert.ifError(err);
        assert.strictEqual(obj1.firstName, obj2.firstName);
        assert.strictEqual(obj1.lastName, obj2.lastName);
        done();
      });
    });
    it("should error if it cant parse the json", (done) => {
      const file = path.join(TEST_DIR, "file2.json");
      fs.writeFileSync(file, "%asdfasdff444");
      fse.readJSON(file, (err, obj) => {
        assert(err);
        assert(!obj);
        done();
      });
    });
  });
});
