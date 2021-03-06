'use strict';

//promise对象，异步编程的一种解决方案

/*
var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (异步操作成功 ){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
*/
(function () {
	function timeout(ms) {
		console.log('obj');
		return new Promise(function (resolve, reject) {

			setTimeout(resolve, ms, 'done'); //只能是resolve会reject,两种状态
			// setTimeout(reject, 1010, 'error');
		});
	}

	timeout(100).then(function (value) {
		console.log(value);
	}, function (err) {
		console.log(err);
	});

	var promise1 = new Promise(function (resolve, reject) {
		console.log('create promise');
		resolve("success");
	});

	setTimeout(function () {
		promise1.then(function (res) {
			console.log(res);
		});
	}, 2000);
})();

//promise.all
/*
（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，
此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，
此时第一个被reject的实例的返回值，会传递给p的回调函数。
*/
(function () {
	var p1 = new Promise(function (res, rej) {
		res("p1 success");
	}),
	    p2 = new Promise(function (res, rej) {
		res("p2 success");
		// rej("p2 fail")
	}),
	    p3 = new Promise(function (res, rej) {
		res("p3 success");
		// rej("p3 fail")
	});


	Promise.all([p1, p2, p3]).then(function (res) {
		console.log(res);
	}).catch(function (err) {
		console.log("Promise.all =>", err);
	});

	/*
 如果作为参数的 Promise 实例，自己定义了catch方法，
 那么它一旦被rejected，并不会触发Promise.all()的catch方法。
 */
	console.log("-------------------------");
	var pa = new Promise(function (resolve, reject) {
		resolve('hello');
	}).then(function (result) {
		return result;
	}).catch(function (e) {
		return e;
	});

	var pb = new Promise(function (resolve, reject) {
		throw new Error('报错了');
	}).then(function (result) {
		return result;
	}).catch(function (e) {
		return e;
	});

	var pc = new Promise(function (resolve, reject) {
		reject("失败");
	}).then(function (result) {
		return result;
	}).catch(function (e) {
		return e;
	});

	console.log(pa); //pa是带着成功状态的promise 
	console.log(pb); //
	console.log(pc); //

	Promise.all([pa, pb, pc]).then(function (result) {
		return console.log(result);
	}).catch(function (e) {
		return console.log(e);
	});
})();

(function () {

	//如果参数是Promise实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
	Promise.resolve("Promise的resolve方法").then(function (res) {
		console.log(res);
	});

	var thenable = {
		then: function then(resolve, reject) {
			resolve(42);
		}
	};

	var p1 = Promise.resolve(thenable);
	p1.then(function (value) {
		console.log(value); // 42
	});

	setTimeout(function () {
		console.log('three');
	}, 0);

	Promise.resolve().then(function () {
		console.log('two');
	});

	console.log('one');
})();
