var a = {};
a.Router = function() {  
	function Router() {  }  
	Router.prototype.setup = function(routemap, defaultFunc) {    
		var that = this,
			rule, func;    
		this.routemap = [];    
		this.defaultFunc = defaultFunc;    
		for (var rule in routemap) {      
			if (!routemap.hasOwnProperty(rule)) continue;      
			that.routemap.push({        
				rule: new RegExp(rule, 'i'),
				        func: routemap[rule]      
			});          
		}  
	};  
	Router.prototype.start = function() {
		var hash = location.hash,
			route, matchResult;    
		for (var routeIndex in this.routemap) {      
			route = this.routemap[routeIndex];      
			matchResult = hash.match(route.rule);      
			if (matchResult) {        
				route.func.apply(window, matchResult.slice(1));        
				return;      
			}    
		}    
		this.defaultFunc();  
	};  
	return Router;
}();
var router = new a.Router();
router.setup({  
	'#/list/(.*)/(.*)': function(cate, id) {      
		console.log('list', cate, id);    
	},
	'#/show/(.*)': function(id) {
		console.log('show', id);    
	},
	'#/list/': function(id) {
		console.log('show', id);    
	}
}, function() {  
	console.log('default router');
});
router.start();
