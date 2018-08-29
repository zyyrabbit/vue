/*

   模仿写一个简单vue库函数

*/
/*Dep类就是一个可观察对象，可以有不同指令订阅它（它是多播的）*/
class Dep{
	constructor(){
		this.subs = [];
	}

	notify(){
        const subs = this.subs.slice();
        subs.forEach(cb => {
        	cb.update();
        })
	}

	depend(){
		//这里还需要数组去重
		this.subs.add(Dep.target);
	}
}

Dep.target = null;

/*Observer类主要用于给Vue的数据defineProperty增加getter/setter方法，
 并且在getter/setter中收集依赖或者通知更新*/
class Observer{
	constructor(){
		this._deps = new Dep();
	}

	defineReactive(obj,key,val){
		const dep =  new Dep();
		const property = Object.getOwnPropertyDescriptor(obj, key);
		const getter = property && property.getter;
		const setter = property && property.setter;
		Object.defineProperty(obj,key,{
		  configurable:true,
	      enumerable:true,
	      get(){
	      	  const value = getter ? getter.call(obj) : val;
	      	  if(Dep.target){
	      	  	 dep.depend();
	      	  }
	          return value;
	      },
	      set(newVal){
	          const value = getter ? getter.call(obj) : val;
	          if(value === newVal){
	          	return
	          }
	          setter ? setter.call(obj,newVal) : val = newVal;
	          dep.notify();
	      }
		})
	}
}
/*Watcher类来用于观察数据（或者表达式）变化然后执行回调函数（其中也有收集依赖的过程），
主要用于$watch API和指令上*/
class Watcher{
	constructor(vm,expOrExp,cb,opt){

		const property = Object.getOwnPropertyDescriptor(vm,expOrExp);
		this.getter = property && property.getter;
		
		this.vm = vm;
		this.cb = cb;
		this.value = this.get();
		
	}

	get(){

		Dep.target = this;
		const value = this.getter.call(vm);
		return value;
	}

	notify(){
		this.run();
	}

	run(){
		const value = this.get();
		if(value !== this.value){
			const oldValue = this.value;
			this.value = value;
			this.cb.call(this.vm,value,oldValue);
		}
	}
}
//数据类型并没有考虑data类型
export class Vue{
	constructor(options){
		this.$options = options;
		this._initData();
		
	}
	_initData(){
		let data = this.$options.data;
		this._data = data;
		const keys = Object.keys(data);
		//代理data数据
		keys.forEach(key => {
			this.$proxy(this,'_data',key);
		})
		this.$observe(this);
	}
	//代理函数
	$proxy(target,sourceKey,key){
	    Object.defineProperty(target,key,{
	      configurable:true,
	      enumerable:true,
	      get(){
	          return this[sourceKey][key];
	      },
	      set(newVal){
	          this[sourceKey][key] = newVal;
	      }
	    })
	}

	$watcher(vm,expOrExp,cb,opt){
		return new Watcher(vm,expOrExp,cb,opt);
	}

	$observe(obj){
		const _observe = new Observer();
		const keys = Object.keys(obj);
		keys.forEach(key => {
			_observe.defineReactive(obj,key,obj[key]);
		})
	}
}