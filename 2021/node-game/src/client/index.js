import { connect, play } from "./networking";
import { $ } from "./utils/utils";
import { downloadAssets } from "./asset";
import { startRendering, stopRendering } from "./render";
import { startCapturingInput, stopCapturingInput } from "./input";
import "./css/bootstrap-reboot.css";
import "./css/main.css";

Promise.all([connect(gameOver), downloadAssets()])
  .then(() => {
    // 隐藏连接服务器显示输入框及按键
    $(".connect").classList.add("hidden");
    $(".play").classList.remove("hidden");
    // 并且默认 聚焦输入框
    $("#home input").focus();

    // 游戏开始按钮监听点击事件
    $("#play-button").onclick = () => {
      let val = $("#home input").value;
      if (val.replace(/\s*/g, "") === "") {
        alert("名称不能为空");
        return;
      }
      // 游戏开始，隐藏开始界面
      $("#home").classList.add("hidden");

      $('.ranking').classList.remove('hidden')
      play(val);

      startRendering();
      startCapturingInput();
    };
  })
  .catch((e) => {
    console.log("client-index-err", e);
  });

function gameOver() {
  stopRendering();
  stopCapturingInput();
  // 将开始界面显示出来
  $("#home").classList.remove("hidden");
  alert("你GG了，重新进入游戏吧。");
}
