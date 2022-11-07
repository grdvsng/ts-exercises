import * as file from "../file";
import * as path from "path";
import { clearInterval } from "timers";

const TEST_DIR = path.join(__dirname, "fixtures");
const TEST_FILE_PATH = path.join(TEST_DIR, "test.file");

describe("test file", () => {
  it("create|exists|remove test", async () => {
    await expect(file.create(TEST_FILE_PATH)).resolves.toBeUndefined();
    await expect(file.exists(TEST_FILE_PATH)).resolves.toBeTruthy();
    await expect(file.remove(TEST_FILE_PATH)).resolves.toBeUndefined();
    await expect(file.exists(TEST_FILE_PATH)).resolves.toBeFalsy();
  });

  it("create|write|read|exists|remove test", async () => {
    await expect(file.create(TEST_FILE_PATH)).resolves.toBeUndefined();
    await expect(
      file.write(TEST_FILE_PATH, (write, resole, _) => {
        let lines = 5;
        let interval = setInterval(() => {
          if (lines === 0) {
            clearInterval(interval);
            resole(lines);
          } else {
            write(`${lines}`);

            lines--;
          }
        }, 100);
      })
    ).resolves.toBe(0);
    await expect( file.read(TEST_FILE_PATH)).resolves.toBe("54321");
    await expect(
        file.write(TEST_FILE_PATH, (_write, _, reject) => {
            reject( new Error('test'))
        })
      ).rejects.toThrowError('test');
    await expect(file.exists(TEST_FILE_PATH)).resolves.toBeTruthy();
    await expect(file.remove(TEST_FILE_PATH)).resolves.toBeUndefined();
    await expect(file.exists(TEST_FILE_PATH)).resolves.toBeFalsy();
  });
});
