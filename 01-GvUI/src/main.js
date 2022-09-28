import Vue from 'vue/dist/vue.js'
import VueRouter from "vue-router";
import React from "react";
import ReactDOM from "react-dom"

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '这是react'
    }
  }

  render() {
    return (
        <div>
          <div>{this.state.msg}</div>
          <div>{this.props.name}</div>
        </div>

    )
  }
}

ReactDOM.render(<Text name='123' />, document.getElementById('root'))


Vue.use(VueRouter)

const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Foo
    },
    {
      path: '/content',
      component: Bar
    }
  ]
})
new Vue({
  el: '#app',
  data: {
    msg: '你好'
  },
  router
})


import $ from 'jquery'

$(function () {
  $('li:odd').css('backgroundColor', 'red')
  $('li:even').css('backgroundColor', 'blue')

})


// import './style/index.scss'
// import './style/index.less'
// // import 'bootstrap/dist/css/bootstrap.css'
// import "jquery"
// import moment from "moment";
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')
// console.log(moment().subtract(6, 'days').calendar())
//
// import axios from 'axios'
//
//
// class Person {
//     constructor(x) {
//         this.age = 19
//     }
//
//     // static name = '张三'
// }
//
// var a = new Person(20)
// console.log(a)
//
// function* fn(a) {
//     var b = yield a
//     var c = yield b
//     return c
// }
//
// let f = fn()
// console.log(f.next())
//
// console.log($, window.$, 123)
//
// console.log(isDev)
// axios.post('/api/login').then(res => {
//     console.log('123')
// })
// $(function () {
//     import('./other')
// })
//
// $('.box').css('border', '1px solid red')
