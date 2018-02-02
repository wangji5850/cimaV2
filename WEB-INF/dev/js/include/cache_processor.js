$.extend(cache_processor, {
	
	
	/**
	 * @param _id 下拉框的dom的id, string
	 */
	getSelectedId: function(_id){
		var _container = $("#"+_id);
		var _curSelect = _container.find("span.cur-select");
		return _curSelect.attr("selectedId");
	},
	
	/**
	 * @param _p 省份下拉框的dom的id, string
	 * @param _c 城市下拉框的dom的id, string
	 */
	intiAddressSelect: function(_p, _c){
		var _pContainer = $("#"+_p);
		var _cContainer = $("#"+_c);
		
		// province
		var _pCurSelect = _pContainer.find("span.cur-select");
		_pCurSelect.attr("selectedId",null);
		_pCurSelect.text("请选择省份");
		var _pSelect = _pContainer.find("div.select");
		_pSelect.html("");
		$.each(cacheAddressMap, function(index, item) {
			_pSelect.append('<p onclick="G.cache_processor.selectProvince(\'' + _p + '\', \'' + _c + '\',' + item.id + ');">' + item.name + '</p>')
        });
		
		// city
		var _cCurSelect = _cContainer.find("span.cur-select");
		_cCurSelect.attr("selectedId",null);
		_cCurSelect.text("请选择城市");
		var _cSelect = _cContainer.find("div.select");
		_cSelect.html("");
	},
	
	/**
	 * @param _p 省份下拉框的dom的id, string
	 * @param _c 城市下拉框的dom的id, string
	 * @param provinceId 被选择省份的id, int
	 */
	selectProvince: function(_p, _c, provinceId){
		var _pContainer = $("#"+_p);
		var _cContainer = $("#"+_c);
		var provinceGroup = provinceId==null ? null : cacheAddressMap[provinceId];
		
		// province
		var _pCurSelect = _pContainer.find("span.cur-select");
		_pCurSelect.attr("selectedId",provinceId);
		_pCurSelect.text(provinceGroup==null ? "请选择省份" : provinceGroup.name);
		var _pSelect = _pContainer.find("div.select");
		_pSelect.hide();
		
		// city
		var _cCurSelect = _cContainer.find("span.cur-select");
		_cCurSelect.attr("selectedId",null);
		_cCurSelect.text("请选择城市");
		var _cSelect = _cContainer.find("div.select");
		_cSelect.html("");
		if(provinceGroup!=null){
			$.each(provinceGroup.cityList, function(index, item) {
				_cSelect.append('<p onclick="G.cache_processor.selectCity(\'' + _c + '\', ' + item.id + ',\'' + item.name + '\');">' + item.name + '</p>')
	        });
		}
	},
	
	/**
	 * @param _c 城市下拉框的dom的id, string
	 * @param cityId 被选择城市的id, int
	 * @param cityName 被选择城市的name, string
	 */
	selectCity: function(_c, cityId, cityName){
		var _cContainer = $("#"+_c);
		
		// city
		var _cCurSelect = _cContainer.find("span.cur-select");
		_cCurSelect.attr("selectedId",cityId);
		_cCurSelect.text(cityId==null ? "请选择城市" : cityName);
		var _cSelect = _cContainer.find("div.select");
		_cSelect.hide();
	},
	
	
	/**
	 * 
	 */
	intiIndustryCacheData: function(){
		if(cacheIndustryList==undefined||cacheIndustryList==null||cacheIndustryList.length==0){
			$.get(G.opt.post_url + '/cache/industryList?random='+Math.random(),{},function(d){
				if(d.flag==0){
					cacheIndustryList = d.data;
				}
			});
		}
	},
	
	
	
	/**
	 * @param _i 行业下拉框的dom的id, string
	 */
	intiIndustrySelect: function(_i){
		var _container = $("#"+_i);
		
		// industry
		var _curSelect = _container.find("span.cur-select");
		_curSelect.attr("selectedId",null);
		_curSelect.text("请选择行业");
		var _select = _container.find("div.select");
		_select.html("");
		if(cacheIndustryList==undefined||cacheIndustryList==null||cacheIndustryList.length==0){
			$.get(G.opt.post_url + '/cache/industryList?random='+Math.random(),{},function(d){
				if(d.flag==0){
					cacheIndustryList = d.data;
					$.each(cacheIndustryList, function(index, item) {
						_select.append('<p onclick="G.cache_processor.selectIndustry(\'' + _i + '\', ' + item.id + ',\'' + item.name + '\');">' + item.name + '</p>')
			        });
				}
			});
		}else{
			$.each(cacheIndustryList, function(index, item) {
				_select.append('<p onclick="G.cache_processor.selectIndustry(\'' + _i + '\', ' + item.id + ',\'' + item.name + '\');">' + item.name + '</p>')
	        });
		}
	},
	
	/**
	 * @param _i 行业下拉框的dom的id, string
	 * @param industryId 被选择行业的id, int
	 * @param industryName 被选择行业的name, string
	 */
	selectIndustry: function(_i, industryId, industryName){
		var _container = $("#"+_i);
		
		// industry
		var _curSelect = _container.find("span.cur-select");
		_curSelect.attr("selectedId",industryId);
		_curSelect.text(industryId==null ? "请选择行业" : industryName);
		var _select = _container.find("div.select");
		_select.hide();
	},
	
	
});
$.extend(G, {
	cache_processor: cache_processor
});