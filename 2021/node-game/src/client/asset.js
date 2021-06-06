// 需要加载的资源
const ASSET_NAMES = [
  'ball.svg',
  'aim.svg',
  'bullet.svg',
  'speed.svg'
];
// 将下载号的图片文件保存起来供 canvas 使用
const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName) {
  return new Promise((resolve, reject) => {
    const asset = new Image;
    asset.onload = () => {
      console.log('Downloaded：' + assetName);
      assets[assetName] = asset;
      resolve();
    };
    asset.onerror = (err) => reject(err);
    asset.src = `/assets/${assetName}`;
  });
}

export const downloadAssets = () => downloadPromise;

export const getAsset = (assetName) => assets[assetName];