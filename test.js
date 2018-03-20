import Vue from './js/main';
let id = 1;
new Vue({
  el: '#app',
  data: function () {
    return {
      classColor: 'text-black',
      styleColor: {
        fontSize: '14px',
        backgroundColor: '#CCC',
      },
      text: '文字设置',
      inputVal: '',
      testJson: {
        value: '这是测试对象',
        color: 'text-black',
      }
    }
  },
  methods: {
    click1() {
      this.classColor = 'text-gray';
      this.testJson.color = 'text-gray';
    },
    click2(){
      this.classColor = 'text-red';
      this.testJson.color = 'text-red';

    },
    click3() {
      this.styleColor = !this.styleColor.padding ? { padding: '20px' } : {
        fontSize: '14px',
        backgroundColor: '#CCC',
      }
    },
    click4() {
      this.text = `${this.text} ${++id}`;
    },
  },
  computed: {
    getClassColor() {
      return this.classColor;
    },
    getStyleColor() {
      return Object.assign({}, this.styleColor, { fontSize: '18px' });
    },
  }
});