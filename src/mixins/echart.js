import wepy from 'wepy';
import WxCanvas from '@/plugins/ec-canvas/wx-canvas';
import * as echarts from '@/plugins/ec-canvas/echarts';

export default class EChartsMixin extends wepy.mixin {

  data = {
    sWidth: null,
    sHeight: null
  }

  methods = {
    touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        this.chart._zr.handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        });
        this.chart._zr.handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    },

    touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        this.chart._zr.handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    },

    touchEnd(e) {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        this.lx = touch.x > Math.ceil(this.sWidth / 2) ? touch.x / 1.5  : touch.x
        this.ly = touch.y
        this.chart._zr.handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        });
        this.chart._zr.handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    }
  };

  init(callback) {
    const version = wx.version.version.split('.').map(n => parseInt(n, 10));
    const isValid =
      version[0] > 1 ||
      (version[0] === 1 && version[1] >= 9) ||
      (version[0] === 1 && version[1] === 9 && version[2] >= 91);
    if (!isValid) {
      console.error(
        '微信基础库版本过低，需大于等于 1.9.91。' +
          '参见：https://github.com/ecomfe/echarts-for-weixin' +
          '#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82'
      );
      return;
    }
    const ctx = wx.createCanvasContext(this.canvasId, this);
    const canvas = new WxCanvas(ctx);

    echarts.setCanvasCreator(() => {
      return canvas;
    });
    var query = wx.createSelectorQuery();
    query
      .select('.ec-canvas')
      .boundingClientRect(res => {
        if (typeof callback === 'function') {
          this.chart = callback(canvas, res.width, res.height, this);
        } else if (this.ec && this.ec.onInit) {
          this.chart = this.ec.onInit(canvas, res.width, res.height, this);
        }
      })
      .exec();
  }

  onLoad() {
    const res = wx.getSystemInfoSync()
    const width = res.screenWidth
    const height = res.screenHeight
    this.sWidth = width
    this.sHeight = height

    if (!this.ec) {
      console.warn(
        '组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' +
          'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>'
      );
      return;
    }
    if (!this.ec.lazyLoad) {
      this.init();
    }
  }
}