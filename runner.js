// --- ローカル専用データ読み込み ---
function loadLocalFile(url) {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error("Failed to load " + url);
    return res.arrayBuffer();
  });
}

// runner.data をローカルから読む
function loadGameData(Module) {
  loadLocalFile("runner.data").then(buf => {
    var bytes = new Uint8Array(buf);
    Module.FS_createDataFile("/", "runner.data", bytes, true, true);
    Module.removeRunDependency("datafile_runner.data");
    console.log("runner.data loaded locally");
  });
}

var Module = {
  preRun: [],
  postRun: [],
  canvas: document.getElementById("canvas"),
  setStatus: function (text) {
    document.getElementById("status").innerText = text;
  }
};

Module.addRunDependency("datafile_runner.data");
loadGameData(Module);
